import React from 'react';
import './Modal.css';

const Modal = (props) => {
  if(props.user === ""){

  }
  return (
    <div className="modal-back">
      <div className="modal">
      {props.winner? `${props.winner} has won!` : ""}
      <br />
        Would you like to play as
        <button className="btn" onClick={() => props.onClick("X")}>X</button>
        or
        <button className="btn" onClick={() => props.onClick("O")}>O</button>
      </div>
    </div>
  );
}

export default Modal
