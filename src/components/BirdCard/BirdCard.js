import { useEffect } from "react";

import { Container, Row, Col, Image } from "react-bootstrap";
import "./styles.css";
import axios from "axios";

function BirdCard({ data, idx }) {
  const handleClick = () => {
    const baseUrl = "https://merlin-backend.herokuapp.com/";
    const url = baseUrl + "api/birds";
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(url, { birdID: data._id }, config)
      .then((result) => {
        if (result.status == 200) {
          console.log(data.comName, "Added into your list");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const defImg =
    "https://www.allaboutbirds.org/guide/assets/photo/305880301-480px.jpg";
  return (
    <Container className="birdcard">
      <Row className="my-4">
        <Col xl={1} lg={1} md={1} sm={1} className="idx-index">
          <h5 className="mt-3 text-secondary text-center">{idx + 1}</h5>
        </Col>
        <Col xl={4} lg={5} md={6} sm={10}>
          <Image rounded fluid src={data.img || defImg}></Image>
        </Col>
        <Col xl={4} lg={3} md={3} sm={12}>
          <div className="info">
            <h5 className="text-center">{data.comName}</h5>
            <div className="sciName text-center">{data.sciName}</div>
          </div>
        </Col>
        <Col xl={3} lg={3} md={2} sm={12} className="my-3 text-center">
          <button className="btn btn-success" onClick={handleClick}>
            Add to Watchlist
          </button>
        </Col>
      </Row>
      <hr style={{ height: "2px" }}></hr>
    </Container>
  );
}

export default BirdCard;
