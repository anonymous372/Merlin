import { BsX } from "react-icons/bs";
const SearchBar = ({ query, setQuery }) => {
  const handleQueryChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
  };
  const clearQuery = () => {
    setQuery("");
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
        value={query}
      ></input>
      <BsX className="h-8 w-8" onClick={clearQuery}></BsX>
    </div>
  );
};

export default SearchBar;
