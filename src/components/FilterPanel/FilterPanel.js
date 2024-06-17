import { BsFilterSquare, BsX } from "react-icons/bs";

const FilterPanel = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {!isOpen ? (
        <div
          onClick={() => setIsOpen(true)}
          className="absolute top-[80px] cursor-pointer right-4 rounded drop-shadow-lg bg-gray-100 hover:text-blue-800 active:scale-95"
        >
          <BsFilterSquare className="h-8 w-8 " />
        </div>
      ) : (
        <>
          <div className="rounded-lg absolute top-[80px] right-0 w-full h-full box-border max-w-sm max-h-[calc(100%-120px)] cursor-pointer backdrop-filter backdrop-blur-[6px] bg-opacity-10 bg-gray-300 border">
            {/* Header of Filter Panel */}
            <div className="px-2 py-2 w-full flex justify-between items-center pb-2 border-b-[1px] border-gray-400">
              <div className="font-medium text-lg">Filter Options</div>
              <div>
                <BsX
                  className="h-8 w-8 hover:text-blue-800 active:scale-90"
                  onClick={() => setIsOpen(false)}
                ></BsX>
              </div>
            </div>
            <div>Search</div>
            <div>Color</div>
            <div>Size</div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterPanel;
