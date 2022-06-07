import { Container, Row, Col, Image } from "react-bootstrap";
import "./styles.css";
import axios from "axios";

function BirdCard({ data, idx }) {
  const handleRemove = (birdId) => {
    const url = "http://localhost:4000/api/birds";
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        id: birdId,
      },
    };
    axios
      .delete(url, config)
      .then((result) => {
        window.open("/myList", "_self");
      })
      .catch((err) => console.log("Error in deleting bird: ", err));
  };
  const defImg =
    "https://www.allaboutbirds.org/guide/assets/photo/305880301-480px.jpg";
  return (
    <Row className="my-4">
      <Col xl={1} lg={1} md={1} sm={1}>
        <h5 className="mt-3 text-secondary text-center">{idx + 1}</h5>
      </Col>
      <Col xl={4} lg={5} md={6} sm={8}>
        <Image fluid rounded src={data.img || defImg} />
      </Col>
      <Col xl={4} lg={3} md={3} sm={2}>
        <div className="info">
          <h5 className="my-0">{data.comName}</h5>
          <div className="sciName">{data.sciName}</div>
        </div>
      </Col>
      <Col xl={3} lg={3} md={2} sm={12}>
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
