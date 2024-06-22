import { BsFilterSquare, BsX } from "react-icons/bs";
import SearchBar from "../Search/SearchBar";
import ColorBar from "../ColorBar/ColorBar";
import { useEffect, useRef } from "react";
import sparrow from "../../images/sparrow.png";
import crow from "../../images/crow.png";
import geese from "../../images/geese.png";
import { bird_size_list_text } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import {
  CLEAR_ALL_FILTERS,
  SET_SEARCH_QUERY,
  SET_SIZE_FILTER,
} from "../../store/actionType";

const FilterPanel = ({ isOpen, setIsOpen }) => {
  const selected_bird_size = useSelector((state) => state.bird_size);
  const is_filters_applied = useSelector((state) => state.is_filters_applied);
  const dispatch = useDispatch();
  // ======================================================
  //  Ninja Technique to close modals when clicked outside
  // ======================================================

  const filterPanelRef = useRef();
  // Add event listener when panel is open
  // to catch any clicks on the basis of ref
  // we get weather its out of panel or not.
  // if out we close panel otherwise do nothing
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Closing modal on press of 'Esc'
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (filterPanelRef.current && !filterPanelRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleSizeSelect = (clicked_size) => {
    if (clicked_size == selected_bird_size) clicked_size = -1;
    console.log("Clicked Size", clicked_size);
    dispatch(actions[SET_SIZE_FILTER](clicked_size));

    // clear search query on size select
    dispatch(actions[SET_SEARCH_QUERY](""));
  };

  const handleClearFilters = () => {
    if (!is_filters_applied) return;
    dispatch(actions[CLEAR_ALL_FILTERS]());
  };

  return (
    <>
      {!isOpen ? (
        <div
          onClick={() => setIsOpen(true)}
          className={`${
            is_filters_applied && "text-blue-800 "
          } z-20 fixed top-[80px] cursor-pointer right-4 rounded drop-shadow-lg bg-gray-100 hover:text-blue-800 active:scale-95`}
        >
          <div className="relative">
            <BsFilterSquare className="h-8 w-8" />
            {is_filters_applied && (
              <div className="absolute top-[calc(-4px)] right-[calc(-4px)] bg-blue-500 h-[10px] w-[10px] rounded-full">
                {" "}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            ref={filterPanelRef}
            className="z-20 rounded-lg fixed top-[56px] right-0 w-full h-full box-border sm:max-w-md max-h-[calc(100%-120px)] backdrop-filter backdrop-blur-[6px] bg-opacity-30 bg-opacity-50 md:bg-opacity-30 bg-gray-400 border"
          >
            {/* Header of Filter Panel */}
            <div className="px-2 py-2 w-full flex justify-between items-center pb-2 border-b-[1px] border-gray-400">
              <div className="font-medium text-[20px]">Filter Options</div>
              <div>
                <BsX
                  className="h-8 w-8 hover:text-blue-800 active:scale-90"
                  onClick={() => setIsOpen(false)}
                ></BsX>
              </div>
            </div>
            {/* Clear Filters Button */}
            <div
              className={`${
                is_filters_applied
                  ? "cursor-pointer opacity-100"
                  : "cursor-default opacity-0"
              } text-center transition duration-500 transition active:scale-95 px-2 border-b-[2px] rounded-b-md bg-red-800 bg-opacity-70 text-white font-semibold`}
              onClick={handleClearFilters}
            >
              Clear All Filters
            </div>
            <div className="mt-2">
              {/* Search Bar */}
              <div className="pl-6 pr-2 mb-10 pb-8 border-b-[3px] border-gray-400 md:border-gray-400">
                <div className="font-bold text-[18px] mb-1">Search</div>
                <SearchBar query={""} setQuery={() => {}} />
              </div>
              {/* =================================== */}
              {/* Color Bar */}
              <div className="pl-6 pr-2 mb-12">
                <div className="font-semibold text-[18px] mb-1">
                  Search By Colors
                </div>
                <ColorBar colors={[]} setColors={() => {}} />
              </div>
              {/* Size Bar */}
              <div className="pl-6 pr-2 mb-2">
                {/* Heading */}
                <div className="font-semibold text-[18px] mb-1">
                  Search By Size:
                  {selected_bird_size >= 0 && (
                    <span className="ml-4 bg-opacity-70 bg-blue-800 text-white text-sm border-1 px-1 pb-[2px] border-gray-100 md:border-gray-500 font-semibold px-[3px] rounded">
                      {bird_size_list_text[selected_bird_size]}
                    </span>
                  )}
                </div>
                {/* Images */}
                <div className="px-4">
                  <div className="mt-2 flex justify-between items-center">
                    <img src={sparrow} alt="sparrow" className="h-6 "></img>
                    <img src={crow} className="h-12 "></img>
                    <img src={geese} className="h-16 translate-x-1/2"></img>
                  </div>
                  {/* Size Selectors */}
                  <div className="mt-2 flex justify-between items-center">
                    {bird_size_list_text.map((bird_size_info, idx) => (
                      <>
                        <div
                          key={bird_size_info}
                          className={`cursor-pointer group relative h-6 w-6 rounded-full border-3 border-slate-400 md:border-slate-400 ${
                            idx == selected_bird_size
                              ? "bg-blue-400"
                              : "bg-white bg-opacity-50"
                          }`}
                          onClick={() => handleSizeSelect(idx)}
                        >
                          <span
                            className="hidden group-hover:block top-[calc(100%+8px)] px-[4px] rounded text-white bg-gray-600 bg-opacity-50 absolute top-[calc(100%+4px)] -translate-x-1/2 text-sm whitespace-nowrap"
                            // className={`${
                            //   idx == selected_bird_size
                            //     ? "top-[calc(100%+6px)] border-1 border-gray-900 font-bold px-[3px] rounded"
                            //     : "hidden group-hover:block top-[calc(100%+8px)] px-[4px] rounded text-white bg-gray-600 bg-opacity-50"
                            // } absolute top-[calc(100%+4px)] -translate-x-1/2 text-sm whitespace-nowrap`}
                          >
                            {bird_size_info}
                          </span>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterPanel;
