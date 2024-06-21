export const BASE_API_URL = "https://merlin-backend-v1.onrender.com/";
// export const BASE_API_URL = "http://localhost:5000/";

export const color_list = [
  "#1e1e1e", // black
  "#6e6e6e", // grey
  "#fafafa", // white
  "#daa06d", // light brown
  "#a81c07", // red
  "#fbeb5d", // yellow
  "#b6ec90", // green
  "#b5e2ff", // light blue
  "#ffb347", // orange
];

export const bird_size_list_text = [
  "sparrow-sized",
  "between sparrow and crow",
  "crow-sized",
  "between crow and geese",
  "geese-sized",
];

// const UNDEFINED_SIZE = -1;
const SPARROW_SIZED = 0;
const BETWEEN_SPARROW_AND_CROW = 1;
const CROW_SIZED = 2;
const BETWEEN_CROW_AND_GEESE = 3;
const GEESE_SIZED = 4;

export const bird_size_list_id = [
  SPARROW_SIZED,
  BETWEEN_SPARROW_AND_CROW,
  CROW_SIZED,
  BETWEEN_CROW_AND_GEESE,
  GEESE_SIZED,
];
