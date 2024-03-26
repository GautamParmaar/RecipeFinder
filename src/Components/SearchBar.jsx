import React, { useState } from "react";

// function searchResult(searchInput, restaurantData) {
//   return restaurantData.filter((restaurant) =>
//     restaurant.info.name.toLowerCase().includes(searchInput.toLowerCase())
//   );
// }

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  // const [searchInputForCity, setSearchInputForCity] = useState("");
  function handleSearch() {
    // const data = searchResult(searchInput, restaurantData);
    // setFilteredRestaurants(data);
    setSearchInput("chala");
  }
  return (
    <div className="mx-auto mt-10 flex justify-center items-center mb-5">
      <input
        data-testid="search"
        placeholder="Search by Job title or Compony"
        className="p-3 w-1/2 rounded-lg text-lg caret-blue-800 bg-slate-300 outline-none border-blue"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {/* <input
        data-testid="search"
        placeholder="City or State"
        className="mt-10 -ml-3 p-3 rounded-lg  rounded-l-none text-lg border-l-2 border-black caret-blue-800 bg-slate-300 outline-none border-blue"
        type="text"
        value={searchInputForCity}
        onChange={(e) => setSearchInputForCity(e.target.value)}
      /> */}
      <input
        id="searchbar"
        type="submit"
        value={"Search"}
        className=" searchbar bg-blue-700 rounded-lg p-2 -ml-20 text-lg text-white font-thin active:opacity-70 hover:bg-blue-600"
        onClick={handleSearch}
      />
    </div>
  );
};
