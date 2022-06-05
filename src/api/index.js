import axios from "axios";

const url = "http://localhost:4000/api/";
export const getAllBirds = () => {
  const tempUrl = url + "birds";
  axios
    .get(tempUrl)
    .then((result) => {
      //   console.log("api getAllBirds", result.data);
      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
// export const getAllBirds = () => {}
// export const getAllBirds = () => {}
