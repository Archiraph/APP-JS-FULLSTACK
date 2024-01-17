import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user.slice";
import postReducer from "../feature/post.slice";
import thunk from "redux-thunk";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
  middleware: [thunk],
});
