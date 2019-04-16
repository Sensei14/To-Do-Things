import React, { Component } from "react";
import "./App.css";
import Todo from "./Components/Todo";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todo />
      </div>
    );
  }
}

export default App;
