import Axios from "axios";

export const getCurrentUser = async () => {
   let res = await Axios.get("/users/currentuser");
   return res.data.currentUser;
};
