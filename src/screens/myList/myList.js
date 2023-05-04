import { useEffect, useState } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import BirdCard from "../../components/BirdCard2/BirdCard2";
import Pagination from "../../components/Pagination/Pagination";
import "./styles.css";
import axios from "axios";
import { BASE_API_URL } from "../../constant";
const getUserData = () => {
  return localStorage.getItem("userData");
};
function MyList() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [birdsPerPage, setBirdsPerPage] = useState(10);
  const [userData] = useState(() => getUserData());

  useEffect(() => {
    const url = BASE_API_URL + "api/myList";
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
        className="text-center pt-3 mb-4"
        style={{ color: "#3A5BA0", fontWeight: 700 }}
      >
        My Watchlist
      </h2>
      <Container>
        {!loaded ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Spinner animation="border" />
          </div>
        ) : data.length === 0 ? (
          <h4 className="mt-5 text-center" style={{ fontWeight: 400 }}>
            {userData != null
              ? "You don't have any birds in your watchlist"
              : "Sign In to see your watchlist"}
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
