import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BASE_API_URL } from "../../constant";
// For Explore Screen

function BirdCard({ data, idx, watched, picHandler }) {
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(watched);

  useEffect(() => {
    setAdded(watched);
  }, [watched]);

  // Add Bird to Watchlist
  const handleClick = () => {
    if (added) return;
    const url = BASE_API_URL + "api/birds";
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setLoading(true);
    axios
      .post(url, { birdID: data._id }, config)
      .then((result) => {
        if (result.status == 200) {
          console.log(data.comName, "Added into your list");
          setAdded(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const defImg =
    "https://www.allaboutbirds.org/guide/assets/photo/305880301-480px.jpg";
  return (
    <Container className="birdcard">
      {loading && (
        <h4 className="message_add">Adding bird to your watchlist</h4>
      )}
      <Row className="my-4">
        {/* Index */}
        <Col xl={1} lg={1} md={1} sm={1} className="idx-index">
          <h5 className="mt-3 text-secondary text-center">{idx + 1}</h5>
        </Col>
        {/* Image */}
        <Col xl={4} lg={5} md={6} sm={10}>
          {/* <Image rounded fluid src={data.img || defImg}></Image> */}
          <LazyLoadImage
            src={data.img}
            effect="blur"
            onClick={() => {
              picHandler.setShowPic(true);
              picHandler.setPicData(data);
            }}
          />
        </Col>
        {/* Info */}
        <Col xl={4} lg={3} md={3} sm={12}>
          <div className="info">
            <h5 className="text-center">{data.comName}</h5>
            <div className="sciName text-center">{data.sciName}</div>
          </div>
        </Col>
        {/* Button */}
        <Col xl={3} lg={3} md={2} sm={12} className="my-3 text-center">
          <button
            className={added ? "add_btn added" : "add_btn"}
            onClick={handleClick}
          >
            {/* {btnText} */}
            {added ? "Bird Watched" : "Add to Watchlist"}
          </button>
        </Col>
      </Row>
      <hr style={{ height: "2px" }}></hr>
    </Container>
  );
}

export default BirdCard;
