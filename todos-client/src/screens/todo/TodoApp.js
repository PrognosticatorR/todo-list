import React, { useEffect } from "react";
import TodoList from "../../components/todo/TodoList";
import TodoForm from "../../components/todo/TodoForm";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Layout from "../../components/Layout";
import useTodoState from "../../hooks/useTodoState";
import { getAlltasks } from "../../actions/todos";

function TodoApp() {
   useEffect(() => {
      getAlltasks();
   }, []);

   const initialTodos = [{ id: 1, task: "Walk The Goldfish", completed: true }];

   const { todos, addTodo, removeTodo, toggleTodo, editTodo } = useTodoState(
      initialTodos
   );

   return (
      <Layout>
         <Paper
            style={{
               padding: 0,
               margin: 0,
               height: "100vh",
               backgroundColor: "#fafafa",
            }}
            elevation={0}>
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
      </Layout>
   );
}
export default TodoApp;
