import React, { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

import BirdCard from "../../components/BirdCard/BirdCard";
import Pagination from "../../components/Pagination/Pagination";
import "./styles.css";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
const BIRDS_PER_PAGE = 10;

function Explore() {
  const [data, setData] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [birdsPerPage] = useState(BIRDS_PER_PAGE);
  // #
  const [filterData, setFilterData] = useState([]);
  const baseUrl = "https://merlin-backend.herokuapp.com/";
  // #

  // Get Data from Server and update the state
  useEffect(() => {
    const url1 = baseUrl + "api/birds";
    const url2 = baseUrl + "api/myList";
    const token = localStorage.getItem("token") || "";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchBirds = async () => {
      try {
        setLoading(true);

        const result1 = await axios.get(url1);
        setData(result1.data);
        setFilterData(result1.data);

        const result2 = await axios.get(url2, config);
        setWatched(result2.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };
    fetchBirds();
  }, []);

  const indexOfLastBird = currentPage * birdsPerPage;
  const indexOfFirstBird = indexOfLastBird - birdsPerPage;
  const birds = filterData.slice(indexOfFirstBird, indexOfLastBird);

  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // window.scroll({ top: 0, left: 0, behavior: "auto" });
    window.scroll(0, 0);
  };

  // Handle Change in Search Bar
  const handleChange = (e) => {
    const qry = e.target.value.toLowerCase();
    setCurrentPage(1);
    setFilterData(
      data.filter((val) => val.comName.toLowerCase().includes(qry))
    );
  };

  // Finds wheather a bird is watched or not
  const isWatched = (name) => {
    let flag = false;
    // if (watched.length === 0) return false;
    watched.forEach((val) => {
      if (val.comName == name) flag = true;
    });
    return flag;
  };
  return (
    <Container id="explore">
      <h2
        className="text-center pt-3 mb-4"
        style={{ color: "#3A5BA0", fontWeight: 700 }}
      >
        Birds of Delhi
      </h2>
      <div className="d-flex justify-content-end">
        <Col lg={4} md={6} xs={12}>
          <Form className="d-flex">
            <Form.Control
              onChange={(e) => handleChange(e)}
              type="search"
              placeholder="Search Eg. Sparrow"
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Col>
      </div>
      <div>
        {loading ? (
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
          <>
            <h4
              className="text-center mt-3"
              style={{
                fontWeight: 400,
              }}
            >
              {"Sorry, could not load data :<"}
            </h4>
          </>
        ) : (
          <div>
            <div className="navBtnCont d-flex justify-content-between pt-2 pb-3">
              <button
                className="navPageBtns"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <BsChevronLeft /> Previous
              </button>
              <button
                className="navPageBtns"
                disabled={currentPage === Math.ceil(data.length / birdsPerPage)}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next <BsChevronRight />
              </button>
            </div>
            {birds.map((val, idx) => {
              return (
                <BirdCard
                  key={idx}
                  idx={indexOfFirstBird + idx}
                  data={val}
                  watched={isWatched(val.comName)}
                />
              );
            })}
          </div>
        )}
        <Row>
          <Pagination
            // #
            // totalBirds={data.length}
            totalBirds={filterData.length}
            // #
            birdsPerPage={birdsPerPage}
            paginate={paginate}
          ></Pagination>
        </Row>
      </div>
    </Container>
  );
}

export default Explore;
