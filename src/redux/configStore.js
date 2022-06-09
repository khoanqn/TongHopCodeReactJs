//cấu hình store
import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from 'redux-thunk'
const rootReducer = combineReducers({
  //chứa reducer con khai báo tại 
  ToDoListReducer
});

//khởi tạo store
const store = createStore(rootReducer,applyMiddleware(reduxThunk));

//có thể doi tên
export default store;
