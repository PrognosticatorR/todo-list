import React from "react";
import TodoApp from "./screens/todo/TodoApp";
import SignIn from "./screens/auth/Signin";
import SignUp from "./screens/auth/SignUp";
import SignOut from "./screens/auth/SignOut";
import PrivateRoute from "./components/PrivateRoutes";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
   return (
      <React.Fragment>
         <Router>
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signout' component={SignOut} />
            <PrivateRoute exact path='/' component={TodoApp} />
         </Router>
      </React.Fragment>
   );
}

export default App;
