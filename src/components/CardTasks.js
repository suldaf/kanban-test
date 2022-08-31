import React from "react";
import checkList from "../checklist.svg";
function CardTasks(props) {
  return (
    <div className="mt-2 border px-2 py-3 bg-bg_card rounded border-bg_card_border">
      <h1>Detail</h1>
      <div className="border-b border-dashed"></div>
      <div className="flex justify-between items-center mt-2">
        <div className="h-3 relative w-[80%] md:w-[70%] rounded-full overflow-hidden ">
          <div className="w-full h-full bg-gray-200 absolute"></div>
          {props.progressBar < 100 ? (
            <div
              id="bar"
              className={`transition-all ease-out duration-1000 h-full relative bg-primary w-[${props.progressBar}%]`}
            ></div>
          ) : (
            <div
              id="bar"
              className={`transition-all ease-out duration-1000 h-full relative bg-done w-[100%]`}
            ></div>
          )}
        </div>

        {props.progressBar < 100 ? (
          <p className="text-center font-thin text-gray-500 ">
            {props.progressBar}%
          </p>
        ) : (
          <img src={checkList} alt="checklist" />
        )}
        <button className="font-extrabold text-center pb-2 hover:bg-gray-200 hover:duration-500 rounded px-1 text-dot">
          . . .
        </button>
      </div>
    </div>
  );
}

export default CardTasks;
