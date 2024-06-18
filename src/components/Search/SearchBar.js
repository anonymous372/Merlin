import { BsX } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { SET_COLORS_FILTER, SET_SEARCH_QUERY } from "../../store/actionType";
import { actions } from "../../store";

const SearchBar = () => {
  const dispatch = useDispatch();
  const search_query = useSelector((state) => state.search_query);

  const handleQueryChange = (e) => {
    // If search query entered clear color filters
    dispatch(actions[SET_COLORS_FILTER]([]));

    const value = e.target.value;
    dispatch(actions[SET_SEARCH_QUERY](value));
  };

  const clearQuery = () => {
    dispatch(actions[SET_SEARCH_QUERY](""));
  };

  return (
    <div
      className={`search_container flex justify-between items-center border border-2 rounded`}
    >
      <input
        type="text"
        className={`rounded px-3 py-1 w-100 outline-none`}
        onFocus={(e) => e.target.parentElement.classList.add("border-blue-500")}
        onBlur={(e) =>
          e.target.parentElement.classList.remove("border-blue-500")
        }
        onChange={handleQueryChange}
        placeholder={"Search Eg. Sparrow"}
        value={search_query}
      ></input>
      <BsX className="h-8 w-8" onClick={clearQuery}></BsX>
    </div>
  );
};

export default SearchBar;
