import React, { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

import BirdCard from "../../components/BirdCard/BirdCard";
import Pagination from "../../components/Pagination/Pagination";
import "./styles.css";

function Explore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [birdsPerPage] = useState(10);
  // #
  const [filterData, setFilterData] = useState([]);
  // #

  // Get Data from Server and update the state
  useEffect(() => {
    const baseUrl = "https://merlin-backend.herokuapp.com/";
    const url = baseUrl + "api/birds";
    const fetchBirds = async () => {
      setLoading(true);
      const result = await axios.get(url);
      setData(result.data);
      // #
      setFilterData(result.data);
      // #
      setLoading(false);
    };
    fetchBirds();
  }, []);

  const indexOfLastBird = currentPage * birdsPerPage;
  const indexOfFirstBird = indexOfLastBird - birdsPerPage;
  // const birds = data.slice(indexOfFirstBird, indexOfLastBird);
  // #
  const birds = filterData.slice(indexOfFirstBird, indexOfLastBird);
  // #
  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scroll(0, 0);
  };

  const handleChange = (e) => {
    const qry = e.target.value.toLowerCase();
    if (qry === "") setCurrentPage(1);
    console.log(qry);
    setFilterData(
      data.filter((val) => val.comName.toLowerCase().includes(qry))
    );
  };

  return (
    <Container id="explore">
      <h2
        className="text-secondary text-center mb-4"
        style={{ textDecoration: "underline" }}
      >
        Birds found in Delhi
      </h2>
      <div className="d-flex justify-content-end">
        <Col lg={4} md={6} xs={12}>
          <Form className="d-flex">
            <Form.Control
              onChange={(e) => handleChange(e)}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Col>
      </div>
      <div>
        {loading ? (
          <Spinner
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
            animation="border"
          />
        ) : (
          birds.map((val, idx) => {
            return (
              <BirdCard key={idx} idx={indexOfFirstBird + idx} data={val} />
            );
          })
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
