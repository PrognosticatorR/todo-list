import axios from "axios";

const Axios = axios.create({ withCredentials: true });

export const getAlltasks = async () => {
   let res = await Axios.get("/tasks");
   return res.data;
};

export const addTask = async description => {
   let res = await Axios.post("/tasks/create", { description });
   return res.data;
};

export const updateTask = async (id, description) => {
   let res = await Axios.put(`/tasks/${id}`, { description });
   return res.data;
};

export const toggleStatus = async (id, status) => {
   let res = await Axios.patch(`/tasks/toggle/${id}`, { status });
   return res.data;
};

export const deleteTask = async id => {
   let res = await Axios.delete(`/tasks/${id}`);
   return res.data;
};
