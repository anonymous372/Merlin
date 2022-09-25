import axios from "axios";

const url = "http://localhost:4000/api/";
export const getAllBirds = () => {
  const tempUrl = url + "birds";
  axios
    .get(tempUrl)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
