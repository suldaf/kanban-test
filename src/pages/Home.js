import React, { useEffect } from "react";
import Header from "../components/Header";
import GroupTodos from "../components/GroupTodos";
import { useDispatch, useSelector } from "react-redux";
import { getListTodos } from "../stores";

function Home(props) {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  useEffect(() => {
    dispatch(getListTodos()).unwrap();
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
    </div>
  );
}

export default Home;
