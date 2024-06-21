import { configureStore, createSlice } from "@reduxjs/toolkit";

import {
  SET_SEARCH_QUERY,
  SET_COLORS_FILTER,
  SET_SIZE_FILTER,
  CLEAR_ALL_FILTERS,
} from "./actionType";

const initialState = {
  search_query: "",
  colors: [],
  bird_size: -1,
  is_filters_applied: false,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    [SET_SEARCH_QUERY]: (state, action) => {
      state.search_query = action.payload;
      state.is_filters_applied = checkAnyFiltersApplied(state);
    },
    [SET_COLORS_FILTER]: (state, action) => {
      state.colors = action.payload;
      state.is_filters_applied = checkAnyFiltersApplied(state);
    },
    [SET_SIZE_FILTER]: (state, action) => {
      state.bird_size = action.payload;
      state.is_filters_applied = checkAnyFiltersApplied(state);
    },
    [CLEAR_ALL_FILTERS]: (state) => {
      state.search_query = "";
      state.colors = [];
      state.bird_size = -1;
      state.is_filters_applied = false;
    },
  },
});

const store = configureStore({
  reducer: filterSlice.reducer,
});

// Helper Function
const checkAnyFiltersApplied = (state) => {
  if (state.search_query) return true;
  if (state.colors.length) return true;
  if (state.bird_size >= 0) return true;
  return false;
};

export const actions = filterSlice.actions;
export default store;
