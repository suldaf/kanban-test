import React, { useEffect } from "react";
import Header from "../components/Header";
import GroupTodos from "../components/GroupTodos";
import { useDispatch, useSelector } from "react-redux";
import { getListTodos } from "../stores";
import MenuDialog from "../components/MenuDialog";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NTksImV4cCI6MTY2MjI3NTUxNH0.f8xvWeJsLr9_GCeyKs2R45vIp-kawGYyFMCCA-E7cPI";
function Home(props) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  useEffect(() => {
    async function getTodos() {
      await dispatch(getListTodos(token)).unwrap();
    }
    getTodos();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="flex flex-col px-2 pt-3 gap-3 md:px-5 md:pt-3 md:flex md:flex-row md:flex-wrap md:gap-3">
        {todos.data.length !== 0 ? (
          todos.data.map((e, i) => <GroupTodos key={i} data={e} index={i} />)
        ) : (
          <div>No Data</div>
        )}
        {/* <GroupTodos /> */}
      </div>
      <div className="flex justify-center items-center mt-4"></div>
    </div>
  );
}

export default Home;
