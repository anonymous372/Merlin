import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";

import "./styles.css";
import axios from "axios";

function MyList() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const url = "http://localhost:4000/api/myList";
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(url, config)
      .then((result) => {
        setData(result.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setLoaded(true);
      });
  }, []);
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
  return (
    <div id="mylist">
      <Container style={{ boxShadow: "0 0px 4px black", width: "70vw" }}>
        <h2 className="text-secondary">My Bird Watchlist</h2>
        <Container>
          {!loaded ? (
            <Spinner
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
              animation="border"
            />
          ) : data.length == 0 ? (
            <h4 className="text-center text-secondary">
              You don't have any birds in your watchlist
            </h4>
          ) : (
            data.map((data, idx) => {
              return (
                <>
                  <Row className="my-4">
                    <Col xl={1} lg={1} md={1} sm={1}>
                      <h5 className="mt-3 text-secondary text-center">
                        {idx + 1}
                      </h5>
                    </Col>
                    <Col xl={4} lg={5} md={6} sm={8}>
                      <Image fluid rounded src={data.img} />
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
                  <hr style={{ height: "2px" }}></hr>
                </>
              );
            })
          )}
        </Container>
      </Container>
    </div>
  );
}

export default MyList;
