import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      className='bg-gray-200 border-2 w-1/5  absolute top-20 right-4 z-10 rounded-sm border-1 border-gray-700'
    >
      <div onClick={(e) => e.stopPropagation()} className="">
        <div className="font-bold text-center">{props.title}</div>

        <div className="">{props.content()}</div>
        <div className="">{props.actions()}</div>
      </div>
    </div>,

    document.querySelector("#modal")
  );
};

export default Modal;
