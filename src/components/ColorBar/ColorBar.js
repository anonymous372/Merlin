import { BsX } from "react-icons/bs";
import { color_list } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import { SET_COLORS_FILTER, SET_SEARCH_QUERY } from "../../store/actionType";
import { actions } from "../../store";

const ColorBar = () => {
  const colors = useSelector((state) => state.colors);
  const dispatch = useDispatch();

  const handleColorClick = (color) => {
    // If color filters are chosen clear search query
    dispatch(actions[SET_SEARCH_QUERY](""));

    if (!colors.find((col) => col == color)) {
      dispatch(actions[SET_COLORS_FILTER]([...colors, color]));
    } else {
      dispatch(
        actions[SET_COLORS_FILTER]([
          ...colors.slice(
            0,
            colors.findIndex((x) => x == color)
          ),
          ...colors.slice(colors.findIndex((x) => x == color) + 1),
        ])
      );
    }
  };

  const clearColorsFilter = () => {
    dispatch(actions[SET_COLORS_FILTER]([]));
  };

  return (
    <>
      <div className="rounded-md  border-2 border-gray-300 py-1 flex md:justify-start justify-center items-center">
        <div className="w-100 flex md:gap-2 gap-0 justify-around">
          {color_list.map((color) => {
            return (
              <div
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
                className={`${
                  colors.find((x) => x == color)
                    ? "border-4 border-blue-500"
                    : "border-2 border-gray-500"
                } w-6 h-6 rounded-full`}
              ></div>
            );
          })}
        </div>
        <BsX className="h-8 w-8" onClick={clearColorsFilter}></BsX>
      </div>
    </>
  );
};

export default ColorBar;
