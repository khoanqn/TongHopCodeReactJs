import axios from "axios";
import React, { Component } from "react";

export default class TodolistRCC extends Component {
  state = {
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  };

  //hàm hiển thị sau khi get API
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
                <span
                  style={{ cursor: "pointer" }}
                  className="badge badge-success mr-2"
                  onClick={() => {
                    this.doneTask(item.taskName);
                  }}
                >
                  Incompleted
                </span>
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={() => {
                    this.delTask(item.taskName);
                  }}
                >
                  Delete Task
                </button>
                <button type="button" className="btn btn-primary mr-2">
                  Edit Task
                </button>
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
                <div style={{cursor:'pointer'}} className="badge badge-warning mr-2" onClick={()=>{this.rejectTask(item.taskName)}}>Completed</div>
                <button
                  className="btn btn-danger mr-2"
                  type="button"
                  onClick={() => {
                    this.delTask(item.taskName);
                  }}
                >
                  Delete Task
                </button>
                <button type="button" className="btn btn-primary mr-2">
                  Edit Task
                </button>               
              </td>
            </tr>
          );
        })
    );
  };

  //Hàm tự thực thi sau khi render component
  componentDidMount() {
    this.getTaskList();
  }

  handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);
    let newValues = { ...this.state.values };   
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...this.state.errors };
    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid !";
    } else {
      newErrors[name] = "";
    }

    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };
  //hàm lấy danh sách task
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
    });
    promise.catch((error) => {
      console.log("error", error.response.data);
    });
  };
  //Thêm task mới
  addTask = (e) => {
    //dừng sự kiện submit form
    e.preventDefault();
    console.log(this.state.values.taskName);
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      //đối với POST phải cung cấp data cho nó
      data: { taskName: this.state.values.taskName },
    });
    //thành công
    promise.then((result) => {
      console.log("Thêm thành công", result.data);
      //sau khi thêm thành công, lấy lại danh sách de update task mới
      this.getTaskList();
    });
    //thất bại
    promise.catch((error) => {
      alert(error.response.data);
      console.log(error.response.data);
    });
  };
  //Xoá task
  delTask = (taskName) => {
    console.log(taskName);
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((result) => {
      alert(result.data);
      console.log("result", result);
      //load lại danh sách
      this.getTaskList();
    });
    promise.catch((error) => {
      console.log("error", error.response.data);
    });
  };
  //Done Task
  //PUT vừa truyền qua đối tượng, vừa truyền qua url
  doneTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
  //Reject Task
  rejectTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert('result.data');
      this.getTaskList();
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
  render() {
    return (
      <div className="container text-center">
        <form
          onSubmit={() => {
            this.addTask();
          }}
        >
          <h3 className="display-4">To do App</h3>
          <button
            type="button"
            onClick={this.addTask}
            className="btn btn-info mb-3"
          >
            Get Task List
          </button>
          {/* {this.getTaskList()} */}
          <div>
            <table className="table">
              <tbody>
                {this.renderTaskToDo()}

                {this.renderTaskToDoDone()}
              </tbody>
            </table>
          </div>
          <div className="form-group">
            <label htmlFor="taskName">Nhập task</label>
            <input
              name="taskName"
              placeholder="Enter new task..."
              type="text"
              className="form-control"
              onChange={this.handleChange}
            />
            <p className="text text-danger">{this.state.errors.taskName}</p>
            <button
              type="button"
              onClick={this.addTask}
              className="btn btn-success mr-2"
            >
              Add Task
            </button>
          </div>
          <div>
            <button type="button" className="btn btn-danger mr-2">
              Delete Task
            </button>
            <button type="button" className="btn btn-primary mr-2">
              Edit Task
            </button>
          </div>
        </form>
      </div>
    );
  }
}
