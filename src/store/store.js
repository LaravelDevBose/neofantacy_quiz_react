import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user/userSlice";
import quizReducer from "../feature/quiz/quizSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
  },
});
