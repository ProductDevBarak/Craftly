import axios from "axios";
import { backendURL } from "./server";

export const createChat = async (prompt, navigate) => {
  try {
    const response = await axios.post(`${backendURL}/code/create`, { prompt });
    return response.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || error;
  }
};

export const updateChat = async (code, prompt, id, navigate) => {
  try {
    const response = await axios.post(`${backendURL}/code/update/${id}`, {
      code,
      prompt,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || error;
  }
};

export const getCode = async (id) => {
  try {
    const response = await axios.get(`${backendURL}/code/get/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data || error;
  }
};
