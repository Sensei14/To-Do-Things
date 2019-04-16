import React from "react";
import "./TodoItem.css";

const TodoItem = props => {
  const style = props.isPriority ? "prior" : "nonprior";

  return (
    <div className="todo">
      <div className={style}>
        <p>{props.text} </p>

        <button
          className="btn btn-outline-success"
          onClick={props.end}
          id={props.id}
        >
          Zakończ zadanie
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={props.delete}
          id={props.id}
          name="tasks"
        >
          X
        </button>
        <br />
        <span>Zrobić do: {props.date}</span>
      </div>
    </div>
  );
};

export default TodoItem;
