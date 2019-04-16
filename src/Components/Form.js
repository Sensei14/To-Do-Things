import React from "react";
import "./Form.css";

const Form = props => {
  return (
    <div>
      <form className="form" onSubmit={props.submit}>
        <input
          type="text"
          placeholder="Dodaj Zadanie"
          onChange={props.handleChange}
          value={props.taskText}
          name="text"
        />
        <input
          type="checkbox"
          onChange={props.handleChange}
          checked={props.prior}
          name="isPriority"
        />
        <label>Priorytet</label>
        <br />
        <label>Do kiedy zrobić: </label>
        <input
          type="date"
          onChange={props.handleChange}
          value={props.date}
          min={props.getDate()}
          name="date"
        />
        <br />
        <span style={{ color: "red" }}>
          {props.validMessage && props.validMessage}
        </span>
        <br />
        <button className="btn btn-dark btn-block">DODAJ</button>
      </form>

      <hr style={{ width: "100%", border: ".1mm solid #bab" }} />
    </div>
  );
};

export default Form;
