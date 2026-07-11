import axios from "../config/axios";

export const signup = async (userData) => {
  const response = await axios.post("/signup", userData);
  return response.data;
};

export const signin = async (userData) => {
  const response = await axios.post("/signin", userData);
  return response.data;
};