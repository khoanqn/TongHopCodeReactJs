import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TodolistRFC() {
  const [arrTask, setArrTask] = useState([]);
  useEffect(() => {
    //tương đương React Class DisMount
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise.then((result) => {
      //setArrTask: truyền cho nó 1 mảng mới thay cho mảng rỗng sau khi call API thành công
      setArrTask(result.data);
      console.log(result.data);
    });
    promise.catch((error) => {
      console.log(error.response?.data);
    });
    console.log("123");
  }, []);
  const getTaskList = () => {
      setArrTask()
  };
  return (
    <div className="container text-center">
      <h3 className="display-4">To do App</h3>
      <button
        onClick={() => {
          getTaskList();
        }}
        className="btn btn-info mb-3"
      >
        Get Task List
      </button>
      <div>
        <table className="table">
          <tbody>
            {arrTask.map((task, index) => {
              return (
                <tr key={index}>
                  <td>{task.taskName}</td>
                  <td>
                    {task.status ? (
                      <span className="badge badge-success">completed</span>
                    ) : (
                      <span className="badge badge-danger">incompleted</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-danger mr-2">Delete Task</button>
                    <button className="btn btn-primary mr-2">Edit Task</button>
                  </td>
                </tr>
              );
            })}
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
