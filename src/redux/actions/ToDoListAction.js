import axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConstant";

//rxaction

//Action có 2 loại
//Action thực thi ngay làm thay doi Reducer
//Action phải thực hiện xử lý rồi mới gọi action 1 thực thi (async action)
export const getTaskListApi = () => {
  //thiền xử lý dữ liệu => xử lý function
  return async (dispatch) => {
    //bản chất axios là 1 promise
    try {
      let { data, status } = await axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });
      if (status === 200) {
        dispatch({
          type: GET_TASK_API,
          taskList: data,
        });
      }
    } catch (error) {
      console.log("error", error.response.data);
    }

    // promise.then((result) => {
    //   //Nếu kq trả về thành công => setState
    //   //Thay vì setState thì dispatch nó lên redux
    //   //   setState({
    //   //     ...state,
    //   //     taskList: result.data,
    //   //   });
    //   dispatch({
    //     type: GET_TASK_API,
    //     taskList: result.data,
    //   });
    //   console.log("dispatch thành công");
    // });
    // promise.catch((error) => {
    //   console.log("error", error.response.data);
    // });
  };
};

export const addTaskApi = (taskName) => {
  return async (dispatch) => {
    try {
      let { status, data } = await axios({
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "POST",
        //đối với POST phải cung cấp data cho nó
        data: { taskName: taskName },
      });
      //Lệnh if đợi await chạy xong mới chạy
      //nếu ko if chạy trước thì sẽ ko lấy dc API
      if (status === 200) {
        dispatch(getTaskListApi());
      }
    } catch (error) {
      console.log("error", error.response.data);
    }

    // //thành công
    // promise.then((result) => {
    //   //sau khi thêm thành công, lấy lại danh sách de update task mới
    //   // getTaskList();
    //   dispatch(getTaskListApi());
    // });
    // //thất bại
    // promise.catch((error) => {
    //   alert(error.response.data);
    //   console.log(error.response.data);
    // });
  };
};

export const deleteTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((result) => {
      alert(result.data);
      console.log("result", result);
      //load lại danh sách
      dispatch(getTaskListApi());
    });
    promise.catch((error) => {
      console.log("error", error.response.data);
    });
  };
};
export const doneTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
};
export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
};

// let getApi = async () => {
//   let promise = await callApiAxios(); //Nếu kq trả về promise
//   res = await promise;

//   console.log(res.data);
// };
