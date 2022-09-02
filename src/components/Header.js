import React, { useState } from "react";
import ModalHeader from "./ModalHeader";

function Header(props) {
  const [modalHidden, setModalHidden] = useState(true);
  return (
    <div className="border-b-2 p-3 flex justify-start items-center">
      <h1 className="font-bold mr-3">Product Roadmap</h1>
      <button
        className="border rounded-lg text-white font-bold p-1 px-5 bg-primary border-primary "
        onClick={() => {
          setModalHidden(!modalHidden);
        }}
      >
        + Add New Group
      </button>
      <ModalHeader modalHidden={modalHidden} setModalHidden={setModalHidden} />
    </div>
  );
}

export default Header;
