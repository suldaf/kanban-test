import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { postTodo } from "../stores";

export default function ModalHeader(props) {
  const ref = useRef(null);

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !props.modalHidden &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        props.setModalHidden(!props.modalHidden);
        document.querySelector("#title").value = "";
        document.querySelector("#description").value = "";
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, props, dispatch]);
  return (
    <div
      className={
        props.modalHidden
          ? ""
          : "fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-16 z-50"
      }
      hidden={props.modalHidden}
    >
      <div
        className="w-[40%] h-[19rem] bg-white rounded-lg shadow-lg drop-shadow-md px-8 py-3 flex flex-col"
        ref={ref}
      >
        <div className="flex justify-between items-center">
          <p className="font-bold">Create Todo</p>
          <button
            className="hover:bg-gray-200 hover:duration-200 rounded"
            onClick={() => {
              props.setModalHidden(!props.modalHidden);
              document.querySelector("#title").value = "";
              document.querySelector("#description").value = "";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 fill-black"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col mt-7">
          <label className="text-black text-xs font-bold mb-2">Todo Name</label>
          <input
            type="text"
            className="mb-2 border-2 rounded-lg px-3 py-2 "
            placeholder="Type your Todo name"
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          />
          <label className="text-black text-xs font-bold mb-2">
            Description
          </label>
          <input
            type="text"
            className="mb-2 border-2 rounded-lg px-3 py-2 "
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            id="description"
          />
        </div>

        <div className="flex justify-end items-center h-full">
          <button
            className="border-2 rounded shadow-sm drop-shadow-sm p-1 px-3 bg-white mr-5 font-bold"
            onClick={() => {
              props.setModalHidden(!props.modalHidden);
              document.querySelector("#title").value = "";
              document.querySelector("#description").value = "";
            }}
          >
            Cancel
          </button>
          <button
            className="border rounded shadow-sm drop-shadow-sm p-1 px-3 text-white border-primary bg-primary font-medium"
            onClick={() => {
              if (title && description) {
                dispatch(postTodo({ data: { title, description } }));
                document.querySelector("#title").value = "";
                document.querySelector("#description").value = "";
                props.setModalHidden(!props.modalHidden);
              }
            }}
          >
            Save Todo
          </button>
        </div>
      </div>
    </div>
  );
}
