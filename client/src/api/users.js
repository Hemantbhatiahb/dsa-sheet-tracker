import { axiosInstance } from ".";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", userData);
    console.log("response: ", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/get-current-user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

