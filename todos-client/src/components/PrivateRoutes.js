import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../actions/auth";

const PrivateRoute = ({ user, component: Component, ...rest }) => {
   const [loadingProps, setLoadingProps] = useState(true);
   const [currentuser, setCurrentuser] = useState(null);
   useEffect(() => {
      getCurrentUser().then(data => {
         setCurrentuser(data);
         setLoadingProps(false);
      });
   }, []);
   return !loadingProps ? (
      <Route
         {...rest}
         render={props =>
            currentuser ? <Component {...props} /> : <Redirect to='/signin' />
         }
      />
   ) : (
      <div>Loading</div>
   );
};
export default PrivateRoute;
