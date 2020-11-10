import React from "react";
import TodoApp from "./screens/todo/TodoApp";
import SignIn from "./screens/auth/Signin";
import SignUp from "./screens/auth/SignUp";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
   return (
      <Router>
         <React.Fragment>
            <Route exact path='/' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/todos' component={TodoApp} />
         </React.Fragment>
      </Router>
   );
}

export default App;
