import axios from "axios";

const API_URL = "https://192.168.212.126:4000/auth";

export const signup = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/signup`, {
    username,
    password,
  });
  return response.data;
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const guestLogin = async () => {
  const response = await axios.post(`${API_URL}/login/guest`);
  return response.data;
};
