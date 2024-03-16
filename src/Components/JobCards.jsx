import React from "react";
const JobCards = () => {
  return (
    //urgent hiring tag if given!
    //if new lable new
    <div className="cardPage p-48">
      <div className=" w-80 h-52 bg-transparent border rounded-lg text-black p-3 ">
        <h2 className="JobName font-bold text-wrap leading-3 mt-2">
          Preetam Pyare, aaye haye mere pyaare
        </h2>
        <p className="comp font-thin text-sm text-gray-500 mt-1">
          Arre pritam pyaare
        </p>
        <h5 className="loc text-sm text-gray-500 mb-4 -mt-1">
          goli maare, dizhkyaaun
        </h5>
        <div className="flex justify-center text-sm font-bold">
          <h5 className="Pay">Bata na batan an</h5>
          <h5 className="Time">Bata na batan an</h5>
          <h5 className="Shift">Bata na batan an</h5>
        </div>

        <h4 className="descPoint font-thin text-sm text-gray-500 mt-4">
          {" "}
          {"ye bhai bahut kuch kare hai and blah baha"}{" "}
        </h4>
      </div>
    </div>
  );
};

export default JobCards;
