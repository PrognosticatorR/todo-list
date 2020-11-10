import axios from "axios";

const Axios = axios.create({ withCredentials: true });

export const getAlltasks = async () => {
   let res = await Axios.get("/tasks");
   console.log(res);
};

export const addTask = async value => {
   let res = await Axios.post("/tasks/create", { description: value });
   console.log(res.data);
};
