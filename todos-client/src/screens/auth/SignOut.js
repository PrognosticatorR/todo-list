import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";

const SignOut = () => {
   const history = useHistory();
   const { doRequest } = useRequest({
      url: "/users/signout",
      method: "post",
      body: {},
      onSuccess: () => history.push("/signin"),
   });

   useEffect(() => {
      doRequest();
   }, []);

   return (
      <Layout>
         <div>Signing you out...</div>
      </Layout>
   );
};

export default SignOut;
