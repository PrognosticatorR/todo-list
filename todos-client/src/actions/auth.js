import Axios from "axios";

export const getCurrentUser = async () => {
   let data = await Axios.get("/users/currentuser");
   if (data.data) {
      return data.data.currentUser;
   }
};
