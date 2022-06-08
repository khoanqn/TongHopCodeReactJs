//cấu hình store
import { combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";

const rootReducer = combineReducers({
  //chứa reducer con khai báo tại 
  ToDoListReducer
});

//khởi tạo store
const store = createStore(rootReducer);

//có thể doi tên
export default store;
