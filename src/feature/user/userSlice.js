import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { setToken, getToken, removeToken, API_URL } from "../../Helper/helper";
import axios from "axios";

const initialState = {
  user: {},
  lead: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
};

// register user
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return authService.register(userData);
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

// login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// login getMe
export const getMe = createAsyncThunk("auth/getMe", async (user, thunkAPI) => {
  try {
    return authService.getMe(getToken());
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (data, thunkAPI) => {
    try {
      const { name, email, provider, provider_id } = data;
      const bodyFormData = new FormData();
      bodyFormData.append("name", name);
      bodyFormData.append("provider", provider);
      bodyFormData.append("provider_id", provider_id);
      bodyFormData.append("email", email);

      const res = await axios({
        method: "post",
        url: `${API_URL}/social-login`,
        data: bodyFormData,
      });

      if (res.status === 200) {
        return res.data.data;
      } else {
        return null;
      }
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

// logout user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (user, thunkAPI) => {
    try {
      // return authService.logoutUser(getToken());
      setToken("");
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

// get leading users
export const getLeadingUsers = createAsyncThunk(
  "users/lead",
  async (data, thunkAPI) => {
    try {
      const response = await axios({
        method: "get",
        url: `${API_URL}/top-users`,
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

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
    setUser: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload.status === 200) {
          setToken(action.payload.data.token);
          state.user = action.payload.data.user;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        setToken("");
        state.user = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        removeToken();
        state.message = action.message;
      })
      .addCase(getLeadingUsers.fulfilled, (state, action) => {
        state.lead = action.payload.data;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.user;
        setToken(action.payload.access_token);
      });
  },
});

export const { reset, setUser } = userSlice.actions;
export default userSlice.reducer;
