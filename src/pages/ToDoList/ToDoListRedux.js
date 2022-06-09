import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskApi,
  deleteTaskApi,
  doneTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "../../redux/actions/ToDoListAction";

export default function ToDoListRedux() {
  const dispatch = useDispatch();
  //Lấy taskList từ reducer về
  const { taskList } = useSelector((state) => state.ToDoListReducer);
  const [state, setState] = useState({
    // taskList: [],//taskList dc lấy từ reducer thay cho setstate
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  //hàm hiển thị sau khi get API
  const renderTaskToDo = () => {
    return (
      taskList
        //nếu task chưa hoàn thành
        .filter((item) => !item.status)
        .map((item, index) => {
          return (
            <tr key={index}>
              <td key={index}>{item.taskName}</td>
              <td>
                <span
                  style={{ cursor: "pointer" }}
                  className="badge badge-success mr-2"
                  onClick={() => {
                    doneTask(item.taskName);
                  }}
                >
                  Incompleted
                </span>
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={() => {
                    delTask(item.taskName);
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
  const renderTaskToDoDone = () => {
    return (
      taskList
        //nếu task da hoàn thành
        .filter((item) => item.status)
        .map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.taskName}</td>
              <td>
                <span
                  style={{ cursor: "pointer" }}
                  className="badge badge-warning mr-2"
                  onClick={() => {
                    rejectTask(item.taskName);
                  }}
                >
                  Completed
                </span>
                <button
                  className="btn btn-danger mr-2"
                  type="button"
                  onClick={() => {
                    delTask(item.taskName);
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
  const handleChange = (e) => {
    let { value, name } = e.target;
    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...state.errors };
    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid !";
    } else {
      newErrors[name] = "";
    }

    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };

  //Thay thế cho componentDidMount, didUpdate, willUnmount
  useEffect(() => {
    dispatch(getTaskListApi());
  }, []);

  //Thêm task mới
  const addTask = (e) => {
    //dừng sự kiện submit form
    e.preventDefault();
    console.log(state.values.taskName);
    dispatch(addTaskApi(state.values.taskName));
  };
  //Xoá task
  const delTask = (taskName) => {
    console.log(taskName);
    dispatch(deleteTaskApi(taskName));
  };
  //Done Task
  //PUT vừa truyền qua đối tượng, vừa truyền qua url
  const doneTask = (taskName) => {
    dispatch(doneTaskApi(taskName));
  };
  //Reject Task
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };

  return (
    <div className="container text-center">
      <h3 className="display-4">To do App</h3>
      <form action="" onSubmit={addTask}>
        <table>
          <tbody>{renderTaskToDo()}</tbody>

          <tbody>{renderTaskToDoDone()}</tbody>
        </table>
        <div className="form-group">
          <label htmlFor="task">Nhập task</label>
          <input
            name="taskName"
            onChange={handleChange}
            type="text"
            className="form-control"
          />
        </div>
        <div>
          <button
            onClick={addTask}
            type="button"
            className="btn btn-success mr-2"
          >
            Add Task
          </button>
          <button className="btn btn-danger mr-2">Delete Task</button>
          <button className="btn btn-primary mr-2">Edit Task</button>
        </div>
      </form>
    </div>
  );
}
