import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, getToken } from "../../Helper/helper";

const initialState = {
  quiz: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
};

export const getQuizes = createAsyncThunk(
  "get/quizes",
  async (id, thunkAPI) => {
    try {
      const response = await axios({
        url: `${API_URL}/get/play/${id}/quiz`,
        method: "get",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizes.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.quiz = action.payload.data;
        state.isError = false;
        state.message = "";
      } else {
        state.message = action.payload.message;
        state.isError = true;
        state.quiz = null;
      }
    });
  },
});

export default quizSlice.reducer;
