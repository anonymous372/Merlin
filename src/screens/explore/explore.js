import React, { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

import ExploreBirdCard from "../../components/ExploreBirdCard/ExploreBirdCard";
import SearchBar from "../../components/Search/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import "./styles.css";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Picture from "../../components/Picture/Picture";
import { BASE_API_URL, color_list } from "../../constant";
import { cloneDeep, orderBy } from "lodash";
import ColorBar from "../../components/ColorBar/ColorBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import { useSelector } from "react-redux";
const BIRDS_PER_PAGE = 10;

function Explore() {
  const [data, setData] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const [showPic, setShowPic] = useState(false);
  const [picData, setPicData] = useState({});
  // const [colors, setColors] = useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");

  // Redux state
  const searchQuery = useSelector((state) => state.search_query);
  const colors = useSelector((state) => state.colors);
  const birdSize = useSelector((state) => state.bird_size);

  // Get Data from Server and update the state
  useEffect(() => {
    const url1 = BASE_API_URL + "api/birds";
    const url2 = BASE_API_URL + "api/myList";
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
        if (result2.data) setWatched(result2.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };
    fetchBirds();
  }, []);

  // Filter list on changes in search bar query
  useEffect(() => {
    setCurrentPage(1);
    setFilterData(
      data.filter((val) =>
        val.comName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const indexOfLastBird = currentPage * BIRDS_PER_PAGE;
  const indexOfFirstBird = indexOfLastBird - BIRDS_PER_PAGE;
  const birds = filterData.slice(indexOfFirstBird, indexOfLastBird);

  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scroll(0, 0);
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

  // Filter list on change of colors
  useEffect(() => {
    if (searchQuery) return;
    let tempData = cloneDeep(data);
    if (colors.length != 0) {
      for (let col of colors) {
        for (let brd of tempData) {
          if (!("count" in brd)) brd.count = 0;
          if (brd.colors.find((cl) => cl == col)) {
            brd.count += 1;
          }
        }
      }
      tempData = orderBy(tempData, ["count"], ["desc"]);
      tempData = tempData.filter((val) => val.count != 0);
    }
    if (birdSize >= 0) {
      tempData = tempData.filter((val) => val.birdSize == birdSize);
    }
    setCurrentPage(1);
    setFilterData(tempData);
  }, [colors, birdSize]);

  return (
    <Container id="explore">
      <FilterPanel
        isOpen={isFilterMenuOpen}
        setIsOpen={setIsFilterMenuOpen}
      ></FilterPanel>
      {/* Heading */}
      <h2
        className="text-center pt-3 mb-4 text-3xl"
        style={{ color: "#3A5BA0", fontWeight: 700 }}
      >
        Birds of Delhi
      </h2>
      {/* Search Bar */}
      <div className="d-flex justify-content-end">
        <Col xl={4} lg={6} md={6} xs={12}>
          {/* Search Bar */}
          <SearchBar />

          {/* Color Bar */}
        </Col>
      </div>
      <div>
        {/* Spinner Animation */}
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
          // No Data
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
            {/* Navigator Buttons */}
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
                disabled={
                  currentPage === Math.ceil(data.length / BIRDS_PER_PAGE)
                }
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next <BsChevronRight />
              </button>
            </div>
            {/* Birds List*/}
            {birds.map((val, idx) => {
              return (
                <ExploreBirdCard
                  key={idx}
                  idx={indexOfFirstBird + idx}
                  data={val}
                  watched={() => isWatched(val.comName)}
                  picHandler={{
                    setShowPic: setShowPic,
                    setPicData: setPicData,
                  }}
                />
              );
            })}
          </div>
        )}
        {/* Page Navigation */}
        <Row>
          <Pagination
            // #
            // totalBirds={data.length}
            totalBirds={filterData.length}
            // #
            birdsPerPage={BIRDS_PER_PAGE}
            paginate={paginate}
          ></Pagination>
        </Row>
      </div>
      <Picture data={picData} showPic={showPic} setShowPic={setShowPic} />
    </Container>
  );
}

export default Explore;
