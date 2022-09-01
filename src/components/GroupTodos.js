import React, { useState } from "react";
import CardTasks from "./CardTasks";
import ModalConfirmation from "./ModalConfirmation";

function GroupTodos(props) {
  const bgGroup = [
    "bg-group-0-bg border-group-0-border",
    "bg-group-1-bg border-group-1-border",
    "bg-group-2-bg border-group-2-border",
    "bg-group-3-bg border-group-3-border",
  ];
  const title = [
    "border-group-0-border text-group-0-text",
    "border-group-1-border text-group-1-text",
    "border-group-2-border text-group-2-text",
    "border-group-3-border text-group-3-text",
  ];
  const [modalHidden, setModalHidden] = useState(true);
  const [typeModal, setTypeModal] = useState("");
  const [taskId, setTaskId] = useState(0);
  return (
    <div
      className={`md:min-w-[335px] md:max-w-[350px] p-4 border rounded ${
        bgGroup[props.index % 4]
      } `}
    >
      <h1
        className={`border rounded w-[7rem] text-center p-1 font-normal text-sm ${
          title[props.index % 4]
        }`}
      >
        {props.data.title}
      </h1>
      <p className="font-bold my-3 text-xs">{props.data.description}</p>
      {props.data.listTask.length !== 0 ? (
        props.data.listTask.map((e, i) => (
          <CardTasks
            key={e.id}
            data={e}
            index={i}
            groupIndex={props.index}
            modalHidden={modalHidden}
            setModalHidden={setModalHidden}
            typeModal={typeModal}
            setTypeModal={setTypeModal}
            setTaskId={setTaskId}
          />
        ))
      ) : (
        <CardTasks noData={true} />
      )}

      <div className="mt-2">
        <button
          className="flex justify-start items-center "
          onClick={() => {
            setModalHidden(!modalHidden);
            setTypeModal("newTask");
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3334 9.16663V9.66663H10.8334H13.3334C13.4218 9.66663 13.5066 9.70175 13.5691 9.76426C13.6316 9.82677 13.6668 9.91155 13.6668 9.99996C13.6668 10.0884 13.6316 10.1732 13.5691 10.2357C13.5066 10.2982 13.4218 10.3333 13.3334 10.3333H10.8334H10.3334V10.8333V13.3333C10.3334 13.4217 10.2983 13.5065 10.2358 13.569C10.1733 13.6315 10.0885 13.6666 10.0001 13.6666C9.91168 13.6666 9.82689 13.6315 9.76438 13.569C9.70187 13.5065 9.66675 13.4217 9.66675 13.3333V10.8333V10.3333H9.16675H6.66675C6.57835 10.3333 6.49356 10.2982 6.43105 10.2357C6.36854 10.1731 6.33342 10.0884 6.33342 9.99996C6.33342 9.91155 6.36854 9.82677 6.43105 9.76426C6.49356 9.70175 6.57835 9.66663 6.66675 9.66663H9.16675H9.66675V9.16663V6.66663C9.66675 6.57822 9.70187 6.49344 9.76438 6.43092C9.8269 6.36841 9.91168 6.33329 10.0001 6.33329C10.0885 6.33329 10.1733 6.36841 10.2358 6.43092C10.2983 6.49344 10.3334 6.57822 10.3334 6.66663V9.16663ZM5.64812 3.48678C6.9363 2.62604 8.4508 2.16663 10.0001 2.16663C11.0288 2.16663 12.0474 2.36924 12.9978 2.7629C13.9482 3.15656 14.8117 3.73356 15.5391 4.46096C16.2665 5.18835 16.8435 6.05189 17.2371 7.00227C17.6308 7.95266 17.8334 8.97127 17.8334 9.99996C17.8334 11.5492 17.374 13.0637 16.5133 14.3519C15.6525 15.6401 14.4291 16.6441 12.9978 17.237C11.5664 17.8299 9.9914 17.985 8.47188 17.6828C6.95236 17.3805 5.55659 16.6345 4.46108 15.539C3.36557 14.4435 2.61952 13.0477 2.31727 11.5282C2.01502 10.0086 2.17014 8.43363 2.76303 7.00227C3.35592 5.57092 4.35993 4.34752 5.64812 3.48678ZM6.0185 15.9588C7.19705 16.7463 8.58265 17.1666 10.0001 17.1666C11.9008 17.1666 13.7237 16.4116 15.0677 15.0676C16.4117 13.7235 17.1668 11.9007 17.1668 9.99996C17.1668 8.58253 16.7464 7.19693 15.9589 6.01837C15.1715 4.83982 14.0522 3.92125 12.7426 3.37882C11.4331 2.83639 9.99214 2.69447 8.60194 2.971C7.21174 3.24753 5.93476 3.93008 4.93249 4.93236C3.93021 5.93464 3.24765 7.21162 2.97112 8.60181C2.6946 9.99201 2.83652 11.433 3.37895 12.7425C3.92138 14.0521 4.83995 15.1713 6.0185 15.9588Z"
              fill="#333333"
              stroke="#333333"
            />
          </svg>

          <p className="ml-3">New Task</p>
        </button>
        <ModalConfirmation
          modalHidden={modalHidden}
          typeModal={typeModal}
          setModalHidden={setModalHidden}
          setTypeModal={setTypeModal}
          todoId={props.data.id}
          taskId={taskId}
          setTaskId={setTaskId}
        />
      </div>
    </div>
  );
}
export default GroupTodos;
