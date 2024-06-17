import { useState, useEffect } from "react";
// import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import "./card_styles.css";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BASE_API_URL } from "../../constant";

// For Explore Screen
function ExploreBirdCard({ data, idx, watched, picHandler }) {
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(watched);
  const [colors, setColors] = useState([]);
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
  const handleColorClick = (color) => {
    if (!colors.find((col) => col == color)) {
      setColors([...colors, color]);
    } else {
      setColors([
        ...colors.slice(
          0,
          colors.findIndex((x) => x == color)
        ),
        ...colors.slice(colors.findIndex((x) => x == color) + 1),
      ]);
    }
    console.log(colors);
  };

  const handleUpdateColors = () => {
    if (loading) return;
    const url = BASE_API_URL + "api/birds/colors";
    // const token = localStorage.getItem("token");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    setLoading(true);
    axios
      .put(url, { birdID: data._id, colors: colors })
      .then((result) => {
        if (result.status == 200) {
          console.log(`Updated ${data.comName}'s colors`);
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
    <>
      {/* Toast for Adding bird */}
      {loading && (
        <h4 className="message_toast px-[20px] py-[4px] text-center bg-green-100 text-green-700 text-xl w-4/5 md:w-2/5 fixed top-[15%] left-[10%] md:left-[30%] translate-y-[-50%] rounded z-10">
          Adding bird to your watchlist
        </h4>
      )}
      <div className="flex my-6 flex-wrap md:flex-nowrap">
        {/* Index */}
        <div className="px-[12px] bg-gray-50 basis-full sm:basis-1/12 md:basis-1/12 lg:basis-1/12 xl:basis-1/12">
          <div className="text-center mt-[16px] mb-2 text-lg text-gray-600 font-semibold">
            {idx + 1}
          </div>
        </div>
        {/* Bird Image */}
        <div className="px-[12px] bg-blue-50 basis-full sm:basis-10/12 md:basis-5/12 lg:basis-5/12 xl:basis-4/12">
          <LazyLoadImage
            className="rounded"
            src={data.img}
            effect="blur"
            onClick={() => {
              picHandler.setShowPic(true);
              picHandler.setPicData(data);
            }}
          />
        </div>
        {/* Bird Name */}
        <div className="px-[12px] bg-red-50 basis-full sm:basis-full md:basis-3/12 lg:basis-3/12 xl:basis-4/12">
          <div className="text-xl text-center font-semibold">
            {data.comName}
          </div>
          <div className="text-md text-zinc-500 text-center">
            {data.sciName}{" "}
          </div>
        </div>
        {/* Button */}
        <div className="px-[12px] bg-green-50 basis-full sm:basis-full md:basis-3/12 lg:basis-3/12 xl:basis-3/12">
          <div className="my-[16px] text-center">
            <button
              className={`outline-none hover:bg-red-700 hover:text-white border-2 border-green-700 rounded-full px-4 py-[6px] text-md ${
                added ? "bg-green-700 text-white" : "bg-white text-black "
              }`}
              onClick={handleClick}
              title={added ? "Watched Bird" : "Add to watchlist"}
            >
              {added ? "Watched" : "Add"}
            </button>
          </div>
        </div>
      </div>
      {/* Color bar to update colors of a bird */}
      {/* <div className="flex justify-between">
        <div className="flex gap-4">
          {color_list.map((color) => {
            return (
              <div
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
                className={`${
                  data.colors?.find((x) => x == color)
                    ? "border-4 border-green-500"
                    : colors.find((x) => x == color)
                    ? "border-4 border-blue-500"
                    : "border-2 border-gray-500"
                } w-10 h-10 rounded-full`}
              ></div>
            );
          })}
        </div>
        <div
          onClick={handleUpdateColors}
          className="bg-green-500 px-4 py-1 font-bold text-white rounded"
        >
          {loading ? "Loading..." : "Update"}
        </div>
      </div> */}
      <hr style={{ height: "2px" }}></hr>
    </>
  );
}

export default ExploreBirdCard;
