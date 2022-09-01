import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  getTask,
  patchTodos,
  postTask,
  resetTask,
} from "../stores";

function ModalConfirmation(props) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [progress, setProgress] = useState(0);
  const taskById = useSelector((state) => state.todos.taskById);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !props.modalHidden &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        props.setModalHidden(!props.modalHidden);
        props.setTypeModal("");
        props.setTaskId("");
        setTask("");
        setProgress(0);
        dispatch(resetTask());
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, props, dispatch]);
  useEffect(() => {
    if (props.taskId) {
      dispatch(getTask({ taskId: props.taskId, todoId: props.todoId }))
        .unwrap()
        .then((data) => {
          setTask(data.name);
          setProgress(Number(data.progress_percentage));
        });
    }
  }, [dispatch, props.taskId, props.todoId]);

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
        className={
          props.typeModal === "deleteTask"
            ? "w-[40%] h-[12rem] bg-white rounded-lg shadow-lg drop-shadow-md px-8 py-3 flex flex-col"
            : "w-[40%] h-[19rem] bg-white rounded-lg shadow-lg drop-shadow-md px-8 py-3 flex flex-col"
        }
        ref={ref}
      >
        <div className="flex justify-between items-center">
          {props.typeModal === "newTask" ? (
            <p className="font-bold">Create Task</p>
          ) : props.typeModal === "editTask" ? (
            <p className="font-bold">Edit Task</p>
          ) : (
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 stroke-failed"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <p className="font-bold ml-4">Delete Task</p>
            </div>
          )}
          <button
            className="hover:bg-gray-200 hover:duration-200 rounded"
            onClick={() => {
              props.setModalHidden(!props.modalHidden);
              props.setTypeModal("");
              props.setTaskId("");
              setTask("");
              setProgress(0);
              dispatch(resetTask());
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
        {props.typeModal === "deleteTask" ? (
          <div className="mt-7">
            <p>
              Are you sure want to delete this task? your action can’t be
              reverted.
            </p>
          </div>
        ) : (
          <div className="flex flex-col mt-7">
            <label className="text-black text-xs font-bold mb-2">
              Task Name
            </label>
            <div className="mb-2 border-2 rounded-lg px-3 py-2 ">
              <input
                type="text"
                className="w-full"
                placeholder="Type your Task"
                onChange={(e) => setTask(e.target.value)}
                value={taskById.name || task}
              />
            </div>
            <label className="text-black text-xs font-bold mb-2">
              Progress
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder={Number(taskById.progress_percentage) || progress}
                className="mb-2 border-2 rounded-lg px-3 py-2  w-36 after:content-['%'] after:text-gray-300 "
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    e.target.value = progress;
                  }
                  if (Number(e.target.value) >= 100) {
                    e.target.value = 100;
                  }
                  setProgress(e.target.value);
                }}
                onBlur={() => {
                  if (!progress) {
                    setProgress(0);
                  }
                }}
              />
              <span className="after:content-['%'] after:text-gray-300 absolute top-[10px] left-11 "></span>
            </div>
          </div>
        )}

        <div className="flex justify-end items-center h-full">
          <button
            className="border-2 rounded shadow-sm drop-shadow-sm p-1 px-3 bg-white mr-5 font-bold"
            onClick={() => {
              props.setModalHidden(!props.modalHidden);
              props.setTypeModal("");
              props.setTaskId("");
              setTask("");
              setProgress(0);
              dispatch(resetTask());
            }}
          >
            Cancel
          </button>
          <button
            className={
              props.typeModal === "deleteTask"
                ? "border rounded shadow-sm drop-shadow-sm p-1 px-3 text-white border-failed bg-failed font-medium"
                : "border rounded shadow-sm drop-shadow-sm p-1 px-3 text-white border-primary bg-primary font-medium"
            }
            onClick={() => {
              if (task) {
                switch (props.typeModal) {
                  case "editTask":
                    dispatch(
                      patchTodos({
                        todoId: props.todoId,
                        data: {
                          name: task,
                          progress_percentage: progress,
                          target_todo_id: props.todoId,
                        },
                        taskId: props.taskId,
                      })
                    );
                    dispatch(resetTask());
                    setTask("");
                    setProgress(0);
                    props.setTaskId("");
                    props.setModalHidden(!props.modalHidden);
                    break;
                  case "newTask":
                    dispatch(
                      postTask({
                        todoId: props.todoId,
                        data: {
                          name: task,
                          progress_percentage: progress,
                        },
                      })
                    );
                    dispatch(resetTask());
                    setTask("");
                    setProgress(0);
                    props.setTaskId("");
                    props.setModalHidden(!props.modalHidden);
                    break;
                  case "deleteTask":
                    dispatch(
                      deleteTask({
                        todoId: props.todoId,
                        taskId: props.taskId,
                      })
                    );
                    dispatch(resetTask());
                    setTask("");
                    setProgress(0);
                    props.setTaskId("");
                    props.setModalHidden(!props.modalHidden);
                    break;

                  default:
                    props.setModalHidden(!props.modalHidden);
                    props.setTaskId("");
                    setTask("");
                    setProgress(0);
                    break;
                }
              }
            }}
          >
            {props.typeModal === "deleteTask" ? "Delete" : "Save Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmation;
