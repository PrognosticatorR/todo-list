import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
   const [errors, setErrors] = useState(null);

   const doRequest = async () => {
      try {
         setErrors(null);
         const response = await axios[method](url, body);
         if (onSuccess) {
            onSuccess(response.data);
         }
         return response.data;
      } catch (err) {
         setErrors(err.response.data);
      }
   };
   return { doRequest, errors: errors };
};

export default useRequest;
