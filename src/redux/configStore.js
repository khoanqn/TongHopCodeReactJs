//cấu hình store
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  //chứa reducer con khai báo tại đây
});

//khởi tạo store
const store = createStore(rootReducer);

//có thể doi tên
export default store;
