import React, { useEffect } from "react";
import TodoList from "../../components/todo/TodoList";
import TodoForm from "../../components/todo/TodoForm";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import useTodoState from "../../hooks/useTodoState";

import useRequest from "../../hooks/useRequest";

function TodoApp() {
   const { doRequest, errors } = useRequest({
      url: "/tasks",
      method: "get",
      onSuccess: () => console.log,
   });
   console.log(errors);
   useEffect(() => {
      doRequest()
         .then(data => console.log(data))
         .catch(err => console.log(err.message));
   }, []);

   const initialTodos = [{ id: 1, task: "Walk The Goldfish", completed: true }];
   const { todos, addTodo, removeTodo, toggleTodo, editTodo } = useTodoState(
      initialTodos
   );

   return (
      <Paper
         style={{
            padding: 0,
            margin: 0,
            height: "100vh",
            backgroundColor: "#fafafa",
         }}
         elevation={0}>
         <AppBar color='primary' position='static' style={{ height: "64px" }}>
            <Toolbar>
               <Typography color='inherit'>TODOS WITH HOOKS</Typography>
            </Toolbar>
         </AppBar>
         <Grid container justify='center' style={{ marginTop: "1rem" }}>
            <Grid item xs={11} md={8} lg={4}>
               <TodoForm addTodo={addTodo} />
               <TodoList
                  todos={todos}
                  removeTodo={removeTodo}
                  toggleTodo={toggleTodo}
                  editTodo={editTodo}
               />
            </Grid>
         </Grid>
      </Paper>
   );
}
export default TodoApp;
