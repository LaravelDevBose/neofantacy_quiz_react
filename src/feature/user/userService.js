import axios from "axios";
import { API_URL, getToken, setToken } from "../../Helper/helper";

// register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "/auth/register", userData);
  console.log("RER", response.data);
  return response.data;

  //   return response.data;
};

// getMe
const getMe = async (token) => {
  const response = await axios.get(API_URL + "/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response.data.data;
};

// login user
const login = async (userData) => {
  const { username, otp } = userData;

  const bodyFormData = new FormData();
  bodyFormData.append("user_name", username);
  bodyFormData.append("otp_number", otp);
  const response = await axios({
    url: `${API_URL}/login`,
    method: "post",
    data: bodyFormData,
  });

  return response.data;
};

// logout user

const userService = {
  register,
  login,
  getMe,
};

export default userService;
