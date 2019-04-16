import React from "react";
import "./TodoItem.css";

const FinishedTask = props => {
  const style = props.isPriority ? "prior" : "nonprior";

  return (
    <div className="finished">
      <p className={style}>
        {props.text} <span>(zrobić do: {props.date})</span>
        <button
          className="btn btn-outline-danger"
          name="finishedTasks"
          onClick={props.deleteTask}
          id={props.id}
        >
          X
        </button>
        <br />
        <span>Potwierdzenie wykonania: {props.finishedTime} </span>
      </p>
    </div>
  );
};

export default FinishedTask;
