import { configureStore, createSlice } from "@reduxjs/toolkit";

import {
  SET_SEARCH_QUERY,
  SET_COLORS_FILTER,
  SET_SIZE_FILTER,
} from "./actionType";

const initialState = {
  search_query: "",
  colors: [],
  size: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    [SET_SEARCH_QUERY]: (state, action) => {
      state.search_query = action.payload;
    },
    [SET_COLORS_FILTER]: (state, action) => {
      state.colors = action.payload;
    },
    [SET_SIZE_FILTER]: (state, action) => {
      state.size = action.payload;
    },
  },
});

const store = configureStore({
  reducer: filterSlice.reducer,
});

export const actions = filterSlice.actions;
export default store;
