import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_TASK_API } from "../../redux/constants/ToDoListConstant";

export default function ToDoListRedux() {
  const dispatch = useDispatch();
  //Lấy taskList từ reducer về
  const { taskList } = useSelector((state) => state.ToDoListReducer);
  console.log("task list", taskList);
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
    getTaskList();
  }, []);
  //hàm lấy danh sách task
  const getTaskList = () => {
    //bản chất axios là 1 promise
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((result) => {
      //Nếu kq trả về thành công => setState
      //Thay vì setState thì dispatch nó lên redux
      //   setState({
      //     ...state,
      //     taskList: result.data,
      //   });
      dispatch({
        type: GET_TASK_API,
        taskList: result.data,
      });
    });
    promise.catch((error) => {
      console.log("error", error.response.data);
    });
  };
  //Thêm task mới
  const addTask = (e) => {
    //dừng sự kiện submit form
    e.preventDefault();
    console.log(state.values.taskName);
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      //đối với POST phải cung cấp data cho nó
      data: { taskName: state.values.taskName },
    });
    //thành công
    promise.then((result) => {
      console.log("Thêm thành công", result.data);
      //sau khi thêm thành công, lấy lại danh sách de update task mới
      getTaskList();
    });
    //thất bại
    promise.catch((error) => {
      alert(error.response.data);
      console.log(error.response.data);
    });
  };
  //Xoá task
  const delTask = (taskName) => {
    console.log(taskName);
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((result) => {
      alert(result.data);
      console.log("result", result);
      //load lại danh sách
      getTaskList();
    });
    promise.catch((error) => {
      console.log("error", error.response.data);
    });
  };
  //Done Task
  //PUT vừa truyền qua đối tượng, vừa truyền qua url
  const doneTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      getTaskList();
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
  //Reject Task
  const rejectTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      getTaskList();
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
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
