import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchTask } from "../stores";

function MenuDialog(props) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const todosId = todos.data.map((e) => e.id);
  return (
    <div
      className="w-80 px-4 py-2 rounded border shadow-lg drop-shadow-md border-t-0 absolute z-50 bg-white md:right-0 xl:left-0 -right-2"
      hidden={props.hidden}
      id={props.id}
    >
      <button
        className={
          props.groupIndex === todos.data.length - 1
            ? ""
            : "flex justify-start items-center hover:text-primary hover:duration-200 my-3 w-full"
        }
        hidden={props.groupIndex === todos.data.length - 1}
        onClick={() =>
          dispatch(
            patchTask({
              todoId: props.todoId,
              taskId: props.id,
              data: { target_todo_id: todosId[props.groupIndex + 1] },
            })
          ).unwrap()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#333333"
          className="w-5 h-5 mr-4 fill-current"
        >
          <path
            fillRule="evenodd"
            d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
        Move Right
      </button>
      <button
        className={
          props.groupIndex === 0
            ? ""
            : "flex justify-start items-center hover:text-primary hover:duration-200 my-3 w-full"
        }
        hidden={props.groupIndex === 0}
        onClick={() =>
          dispatch(
            patchTask({
              todoId: props.todoId,
              taskId: props.id,
              data: { target_todo_id: todosId[props.groupIndex - 1] },
            })
          ).unwrap()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#333333"
          className="w-5 h-5 mr-4 fill-current"
        >
          <path
            fillRule="evenodd"
            d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z"
            clipRule="evenodd"
          />
        </svg>
        Move Left
      </button>
      <button
        className="flex justify-start items-center hover:text-primary hover:stroke-primary hover:duration-200 my-3 w-full"
        onClick={() => {
          props.setModalHidden(!props.modalHidden);
          props.setTypeModal("editTask");
          props.setHidden(!props.hidden);
          props.setTaskId(props.id);
        }}
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-4 fill-current stroke-current"
        >
          <path d="M9.24289 17.4999V17.4999H9.24H5C4.86739 17.4999 4.74021 17.4473 4.64645 17.3535C4.55268 17.2597 4.5 17.1325 4.5 16.9999L4.50001 12.7599L4.49999 12.757C4.49961 12.6912 4.51222 12.626 4.53711 12.5651C4.56186 12.5045 4.59826 12.4494 4.64426 12.4028C4.6445 12.4025 4.64475 12.4023 4.64499 12.402L11.5833 5.47375L11.5842 5.47287L14.4042 2.64287L14.405 2.64204C14.4515 2.59518 14.5068 2.55798 14.5677 2.53259C14.6286 2.50721 14.694 2.49414 14.76 2.49414C14.826 2.49414 14.8914 2.50721 14.9523 2.53259C15.0131 2.55793 15.0683 2.59503 15.1147 2.64176C15.1148 2.64185 15.1149 2.64195 15.115 2.64204L19.3544 6.93141L19.3544 6.93143L19.3579 6.93494C19.4048 6.98142 19.442 7.03672 19.4673 7.09765C19.4927 7.15858 19.5058 7.22393 19.5058 7.28994C19.5058 7.35595 19.4927 7.4213 19.4673 7.48223C19.4421 7.54275 19.4053 7.59771 19.3588 7.644C19.3585 7.64431 19.3582 7.64463 19.3579 7.64494L16.5202 10.4226L16.5202 10.4226L16.5162 10.4266L9.59789 17.3549C9.59767 17.3552 9.59744 17.3554 9.59722 17.3556C9.55064 17.4016 9.49547 17.4381 9.43484 17.4628C9.37393 17.4877 9.30869 17.5003 9.24289 17.4999ZM15.1136 4.05639L14.76 3.70283L14.4064 4.05639L12.9864 5.47639L12.6329 5.82994L12.9864 6.18349L15.8164 9.01349L16.17 9.36705L16.5236 9.01349L17.9436 7.59349L18.2971 7.23994L17.9436 6.88639L15.1136 4.05639ZM5.64645 12.8164L5.5 12.9628V13.1699V15.9999V16.4999H6H8.83H9.03711L9.18355 16.3535L15.1136 10.4235L15.4671 10.0699L15.1136 9.71639L12.2836 6.88639L11.93 6.53283L11.5764 6.88639L5.64645 12.8164ZM3 20.4999H21C21.1326 20.4999 21.2598 20.5526 21.3536 20.6464C21.4473 20.7402 21.5 20.8673 21.5 20.9999C21.5 21.1325 21.4473 21.2597 21.3536 21.3535C21.2598 21.4473 21.1326 21.4999 21 21.4999H3C2.86739 21.4999 2.74021 21.4473 2.64645 21.3535C2.55268 21.2597 2.5 21.1325 2.5 20.9999C2.5 20.8673 2.55268 20.7402 2.64645 20.6464C2.74021 20.5526 2.86739 20.4999 3 20.4999Z" />
        </svg>
        Edit
      </button>
      <button
        className="flex justify-start items-center hover:text-failed hover:duration-200 my-3 w-full"
        onClick={() => {
          props.setModalHidden(!props.modalHidden);
          props.setTypeModal("deleteTask");
          props.setHidden(!props.hidden);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 mr-4 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Delete
      </button>
    </div>
  );
}

export default MenuDialog;
