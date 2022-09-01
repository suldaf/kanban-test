import React, { useEffect, useState } from "react";
import { useRef } from "react";
import MenuDialog from "./MenuDialog";
import ProgressBar from "./ProgressBar";

function CardTasks(props) {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    function handleClickOutside(event) {
      if (!hidden && ref.current && !ref.current.contains(event.target)) {
        setHidden(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, hidden, setHidden]);

  return (
    <div className="mt-2 border px-2 py-3 bg-bg_card rounded border-bg_card_border">
      {!props.noData ? (
        <div>
          <h1>{props.data.name}</h1>
          <div className="border-b border-dashed"></div>
          <div className="flex justify-between items-center mt-2">
            <ProgressBar progressBar={props.data.progress_percentage} />
            <div className="relative" ref={ref}>
              <button
                className="font-extrabold text-center pb-2 hover:bg-gray-200 hover:duration-500 rounded px-1 text-dot"
                onClick={() => setHidden(!hidden)}
                data-dropdown-toggle={props.data.id}
              >
                . . .
              </button>
              <MenuDialog
                hidden={hidden}
                id={props.data.id}
                todoId={props.data.todo_id}
                groupIndex={props.groupIndex}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}

export default CardTasks;
