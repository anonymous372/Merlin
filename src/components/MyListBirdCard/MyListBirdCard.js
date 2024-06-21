// import { Container, Row, Col, Image } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { BASE_API_URL } from "../../constant";

// For MY List Screen
function MyListBirdCard({ data, idx, removeBird }) {
  const [loading, setLoading] = useState(false);

  // Delete the bird
  const handleRemove = (birdId) => {
    const url = BASE_API_URL + "api/birds";
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
    <>
      {/* Toast for Adding bird */}
      {loading && (
        <h4 className="message_toast px-[20px] py-[4px] text-center bg-red-100 text-red-700 text-xl w-4/5 md:w-1/2 fixed top-[15%] left-[10%] md:left-[25%] translate-y-[-50%] rounded z-10">
          Removing bird from your watchlist
        </h4>
      )}
      <div className="flex my-6 md:flex-nowrap flex-wrap">
        {/* Index */}
        <div className="px-[12px] basis-full sm:basis-1/12 md:basis-1/12 lg:basis-1/12 xl:basis-1/12">
          <div className="text-center mt-[16px] mb-2 text-lg text-gray-600 font-semibold">
            {idx + 1}
          </div>
        </div>
        {/* Bird Image */}
        <div className="px-[12px] basis-full sm:basis-10/12 md:basis-5/12 lg:basis-5/12 xl:basis-4/12">
          <LazyLoadImage className="rounded" src={data.img} effect="blur" />
        </div>
        {/* Bird Name */}
        <div className="px-[12px] basis-full sm:basis-full md:basis-3/12 lg:basis-3/12 xl:basis-4/12">
          <div className="text-xl text-center font-semibold">
            {data.comName}
          </div>
          <div className="text-md text-zinc-500 text-center">
            {data.sciName}{" "}
          </div>
        </div>
        {/* Button */}
        <div className="px-[12px] basis-full sm:basis-full md:basis-3/12 lg:basis-3/12 xl:basis-3/12">
          <div className="my-[16px] text-center">
            <button
              className={`transition duration-300 border-2 border-red-500 rounded-full text-red-500 hover:text-white hover:bg-red-500 px-4 py-[6px] text-md`}
              onClick={() => {
                handleRemove(data._id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <hr style={{ height: "2px" }}></hr>
    </>
  );
}

export default MyListBirdCard;
