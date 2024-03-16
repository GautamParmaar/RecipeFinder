import React from "react";
import SearchBar from "./SearchBar";

function LandingPage() {
  return (
    <>
      <div className="mt-40 flex flex-col gap-5 items-center justify-center text-white">
        <h1 className="text-5xl font-bold">
          Your ideal job awaits, start the search
        </h1>
        <p className="text-xl">Get latest job openings that best suits you!</p>
      </div>
      <SearchBar />
      <div className="flex mt-10 gap-10 justify-center ">
        <div className=" flex w-64 h-52 bg-transparent border rounded-lg text-cyan-200 font-2xl font-bold justify-end ">
          <p className="flex  items-end text-2xl ">Hum, Baad Mey</p>
        </div>
        <div className="flex w-64 h-52 bg-transparent border rounded-lg text-cyan-200 font-2xl font-bold justify-end ">
          <p className="flex  items-end text-2xl ">Decorate Karenge!</p>
        </div>
        <div className="flex w-64 h-52 bg-transparent border rounded-lg text-cyan-200 font-2xl font-bold justify-end ">
          <p className="flex  items-end  text-2xl ">Dhannaywad🥱</p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
