import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListTask } from "../stores";

import CardTasks from "./CardTasks";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NTksImV4cCI6MTY2MjI3NTUxNH0.f8xvWeJsLr9_GCeyKs2R45vIp-kawGYyFMCCA-E7cPI";

function GroupTodos(props) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos);
  useEffect(() => {
    if (props.data.id) {
      async function getTasks() {
        const payload = {
          todoId: props.data.id,
          token,
        };
        await dispatch(getListTask(payload)).unwrap();
      }
      getTasks();
    }
  }, [dispatch, props.data.id]);

  return (
    <div className="md:min-w-[335px] p-2 border">
      {JSON.stringify(tasks.tasksByid)}
      <h1 className="">Group task 1</h1>
      <p>Description</p>
      <CardTasks progressBar={20} />
    </div>
  );
}
export default GroupTodos;
