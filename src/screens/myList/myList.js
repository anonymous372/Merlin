import { useEffect, useState } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import BirdCard from "../../components/BirdCard2/BirdCard2";
import Pagination from "../../components/Pagination/Pagination";
import "./styles.css";
import axios from "axios";

function MyList() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [birdsPerPage, setBirdsPerPage] = useState(10);

  useEffect(() => {
    const baseUrl = "https://merlin-backend.herokuapp.com/";
    const url = baseUrl + "api/myList";
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

  const onRemove = (idx) => {
    setData((prevState) => {
      // console.log(prevState);
      let left = prevState.slice(0, idx);
      let right = prevState.slice(idx + 1);
      return [...left, ...right];
    });
  };

  const indexOfLastBird = currentPage * birdsPerPage;
  const indexOfFirstBird = indexOfLastBird - birdsPerPage;
  const birds = data.slice(indexOfFirstBird, indexOfLastBird);

  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scroll(0, 0);
  };

  return (
    <Container id="mylist">
      <h2
        className="text-secondary text-center mb-3"
        style={{ textDecoration: "underline" }}
      >
        My Bird Watchlist
      </h2>
      {/* <Row>
        <Col xs={3}>
          <span className="text-bold">Birds Per Page </span>
        </Col>
        <Col xs={1}>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setBirdsPerPage(10)}
          >
            10
          </button>
        </Col>
        <Col xs={1}>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setBirdsPerPage(20)}
          >
            20
          </button>
        </Col>
      </Row> */}
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
        ) : data.length === 0 ? (
          <h4 className="text-center text-secondary">
            You don't have any birds in your watchlist
          </h4>
        ) : (
          birds.map((data, idx) => {
            return (
              <div key={idx}>
                <BirdCard
                  data={data}
                  idx={idx + indexOfFirstBird}
                  removeBird={onRemove}
                ></BirdCard>
                <hr style={{ height: "2px" }}></hr>
              </div>
            );
          })
        )}
      </Container>
      <Row>
        <Pagination
          totalBirds={data.length}
          birdsPerPage={birdsPerPage}
          paginate={paginate}
        ></Pagination>
      </Row>
    </Container>
  );
}

export default MyList;
