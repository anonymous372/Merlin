import { Container, Row, Col, Image } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import { useState } from "react";

// For MY List Screen
function BirdCard({ data, idx, removeBird }) {
  const [loading, setLoading] = useState(false);

  // Delete the bird
  const handleRemove = (birdId) => {
    const baseUrl = "https://merlin-backend.herokuapp.com/";
    const url = baseUrl + "api/birds";
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        id: birdId,
      },
    };
    setLoading(true);
    axios
      .delete(url, config)
      .then((result) => {
        removeBird(idx);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error in deleting bird: ", err);
        setLoading(false);
      });
  };
  const defImg =
    "https://www.allaboutbirds.org/guide/assets/photo/305880301-480px.jpg";
  return (
    <Row className="my-4">
      {loading && (
        <h4 className="message_rem">Removing bird from your watchlist</h4>
      )}
      <Col xl={1} lg={1} md={1} sm={1}>
        <h5 className="mt-3 text-secondary text-center">{idx + 1}</h5>
      </Col>
      <Col xl={4} lg={5} md={6} sm={10}>
        <Image fluid rounded src={data.img || defImg} />
      </Col>
      <Col xl={4} lg={3} md={3} sm={12}>
        <div className="info">
          <h5 className="text-center">{data.comName}</h5>
          <div className="sciName text-center">{data.sciName}</div>
        </div>
      </Col>
      <Col xl={3} lg={3} md={2} sm={12} className="my-3 text-center">
        <button
          className="btn btn-danger"
          onClick={() => {
            handleRemove(data._id);
          }}
        >
          Remove
        </button>
      </Col>
    </Row>
  );
}

export default BirdCard;
