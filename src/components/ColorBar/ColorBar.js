import { BsX } from "react-icons/bs";
import { color_list } from "../../constant";

const ColorBar = ({ colors, setColors }) => {
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
  };

  const clearColorsFilter = () => {
    setColors([]);
  };

  return (
    <>
      <div className="rounded-md  border-2 border-gray-300 py-1 my-2 flex md:justify-start justify-center items-center">
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
