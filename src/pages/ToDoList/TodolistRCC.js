import axios from "axios";
import React, { Component } from "react";

export default class TodolistRCC extends Component {
  state = {
    taskList: [],
  };
  getTaskList = () => {
    //bản chất axios là 1 promise
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise.then((result) => {
      //Nếu kq trả về thành công => setState
      this.setState({
        taskList: result.data,
      });
      console.log("result", result.data);
    });
    promise.catch((error) => {
      console.log("error", error.response.data);
    });
  };

  renderTaskToDo = () => {
    return (
      this.state.taskList
        //nếu task chưa hoàn thành
        .filter((item) => !item.status)
        .map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.taskName}</td>
              <td>
                <div className="badge badge-success mr-2">Completed</div>
                <button className="btn btn-danger mr-2">Delete Task</button>
                <button className="btn btn-primary mr-2">Edit Task</button>
              </td>
            </tr>
          );
        })
    );
  };
  renderTaskToDoDone = () => {
    return (
      this.state.taskList
        //nếu task da hoàn thành
        .filter((item) => item.status)
        .map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.taskName}</td>
              <td>
                <div className="badge badge-warning mr-2">Incompleted</div>
                <button className="btn btn-danger mr-2">Delete Task</button>
                <button className="btn btn-primary mr-2">Edit Task</button>
              </td>
            </tr>
          );
        })
    );
  };
  render() {
    return (
      <div className="container text-center">
        <h3 className="display-4">To do App</h3>
        {/* <button
          onClick={() => {
            this.getTaskList();
          }}
          className="btn btn-info mb-3"
        >
          Get Task List
        </button> */}
        {this.getTaskList()}
        <div>
          <table className="table">
            <tbody>
              {this.renderTaskToDo()}

              {this.renderTaskToDoDone()}
            </tbody>
          </table>
        </div>
        <div className="form-group">
          <label htmlFor="task">Nhập task</label>
          <input type="text" className="form-control" />
        </div>
        <div>
          <button className="btn btn-success mr-2">Add Task</button>
          <button className="btn btn-danger mr-2">Delete Task</button>
          <button className="btn btn-primary mr-2">Edit Task</button>
        </div>
      </div>
    );
  }
}
