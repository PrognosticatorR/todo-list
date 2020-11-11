import axios from "axios";

const Axios = axios.create({ withCredentials: true, baseURL: "/subtasks" });

export const addSubTask = async (taskId, description) => {
   let res = await Axios.post("/create", { taskId, description });
   return res.data;
};

export const updateSubTask = async (subtaskId, description) => {
   let res = await Axios.put(`/${subtaskId}`, { description });
   return res.data;
};

export const toggleSubTaskStatus = async (subtaskId, status) => {
   let res = await Axios.patch(`/${subtaskId}`, { status });
   return res.data;
};

export const deleteSubTask = async subtaskId => {
   let res = await Axios.delete(`/${subtaskId}`);
   return res.data;
};

export const getSubTaks = async taskId => {
   let res = await Axios.get(`/${taskId}`);
   return res.data;
};
