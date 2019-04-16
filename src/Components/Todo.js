import React, { Component } from "react";
import Form from "./Form";
import TodoItem from "./TodoItem";
import FinishedTask from "./FinishedTask";

class Todo extends Component {
  state = {
    tasks: [
      {
        id: 1,
        text: "Umyć naczynia",
        isPriority: false,
        date: "03-12-2019",
        finishedTime: ""
      },
      {
        id: 2,
        text: "Wynieść śmieci",
        isPriority: false,
        date: "30-12-2019",
        finishedTime: ""
      },
      {
        id: 3,
        text: "Zrobić obiad",
        isPriority: true,
        date: "03-10-2019",
        finishedTime: ""
      }
    ],

    newTask: {
      id: "",
      text: "",
      isPriority: false,
      date: "",
      finishedTime: ""
    },
    validMessage: "",
    finishedTasks: []
  };

  handleChange = e => {
    const { name, value, type, checked } = e.target;
    const length = this.state.tasks.length;
    let newID;
    if (length === 0) {
      newID = 0;
    } else {
      newID = this.state.tasks[length - 1].id + 1;
    }

    if (type === "checkbox") {
      this.setState({
        newTask: {
          [name]: checked,
          id: newID,
          text: this.state.newTask.text,
          date: this.state.newTask.date
        }
      });
    } else if (type === "date") {
      this.setState({
        newTask: {
          id: newID,
          text: this.state.newTask.text,
          isPriority: this.state.newTask.isPriority,
          [name]: value
        }
      });
    } else {
      this.setState({
        newTask: {
          id: newID,
          [name]: value,
          isPriority: this.state.newTask.isPriority,
          date: this.state.newTask.date
        }
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const valid = this.validateForm();

    if (!valid) {
      this.setState({
        validMessage: " W polu zadanie trzeba wpisać więcej niż 5 znaków! "
      });
    } else {
      const task = this.state.newTask;
      const tasks = [...this.state.tasks];
      tasks.push(task);
      this.setState({
        tasks,
        newTask: { id: "", text: "", isPriority: false, date: this.getDate() },
        validMessage: ""
      });
    }
  };

  validateForm = () => {
    const { text, date } = this.state.newTask;
    let isTextCorrect = false;
    let isDataCorrect = false;

    if (text.length > 5) {
      isTextCorrect = true;
    }

    if (date !== "") {
      isDataCorrect = true;
    }

    return isTextCorrect && isDataCorrect;
  };

  componentDidUpdate() {
    if (this.state.validMessage !== "")
      setTimeout(() => {
        this.setState({
          validMessage: ""
        });
      }, 4000);
  }

  deleteTask = e => {
    const name = e.target.name;
    const id = parseInt(e.target.id);
    let tasks = [...this.state.tasks];
    let finishedTasks = [...this.state.finishedTasks];

    if (name === "tasks") {
      tasks = tasks.filter(task => task.id !== id);

      this.setState({
        tasks
      });
    } else if (name === "finishedTasks") {
      finishedTasks = finishedTasks.filter(task => task.id !== id);

      this.setState({
        finishedTasks
      });
    }
  };

  endTask = e => {
    let tasks = [...this.state.tasks];
    const id = parseInt(e.target.id);
    let finishedTask = tasks.filter(task => task.id === id);
    tasks = tasks.filter(task => task.id !== id);

    finishedTask[0].id = this.state.finishedTasks.length + 1;

    let finishedTasks = [...this.state.finishedTasks];
    finishedTasks = finishedTasks.concat(finishedTask);
    finishedTasks[finishedTasks.length - 1].finishedTime = this.getFullDate();

    this.setState({
      tasks,
      finishedTasks
    });
  };

  getDate = () => {
    let date = new Date();
    let minDate;

    let year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month.toString();
    }

    if (day < 10) {
      day = "0" + day.toString();
    }

    minDate = year + "-" + month + "-" + day;

    return minDate;
  };

  getFullDate = () => {
    let date = new Date();
    let fullDate;

    let year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (month < 10) {
      month = "0" + month.toString();
    }

    if (day < 10) {
      day = "0" + day.toString();
    }
    if (hours < 10) {
      hours = "0" + hours.toString();
    }
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    }
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }

    fullDate =
      year +
      "-" +
      month +
      "-" +
      day +
      " | " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    return fullDate;
  };

  componentDidMount() {
    this.setState({
      newTask: {
        date: this.getDate(),
        text: this.state.newTask.text,
        isPriority: this.state.newTask.isPriority,
        id: this.state.newTask.id
      }
    });
  }

  render() {
    const todoItems = this.state.tasks.map(task => (
      <TodoItem
        key={task.id}
        id={task.id}
        text={task.text}
        isPriority={task.isPriority}
        delete={this.deleteTask}
        end={this.endTask}
        date={task.date}
      />
    ));

    const finishedItems = this.state.finishedTasks.map(task => (
      <FinishedTask
        key={task.id}
        text={task.text}
        isPriority={task.isPriority}
        date={task.date}
        finishedTime={task.finishedTime}
        deleteTask={this.deleteTask}
        id={task.id}
      />
    ));

    return (
      <div>
        <Form
          handleChange={this.handleChange}
          submit={this.handleSubmit}
          taskText={this.state.newTask.text}
          prior={this.state.newTask.isPriority}
          validMessage={this.state.validMessage}
          getDate={this.getDate}
          date={this.state.newTask.date}
        />
        <p style={{ fontSize: "24px", color: "#ccc", fontWeight: "bold" }}>
          Lista zaplanowanych zadań:
        </p>
        {todoItems}

        <hr style={{ width: "100%", border: ".1mm solid #bab" }} />

        <p
          style={{
            fontSize: "24px",
            color: "rgb(0 180 0)",
            fontWeight: "bold"
          }}
        >
          Lista zakończonych zadań ({this.state.finishedTasks.length}):
        </p>

        {finishedItems.reverse().slice(0, 5)}
      </div>
    );
  }
}

export default Todo;
