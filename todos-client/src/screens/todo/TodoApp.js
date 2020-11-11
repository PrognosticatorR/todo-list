import React, { useEffect, useState } from "react";
import TodoList from "../../components/todo/TodoList";
import TodoForm from "../../components/todo/TodoForm";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Layout from "../../components/Layout";
import { getAlltasks } from "../../actions/todos";
import CssBaseline from "@material-ui/core/CssBaseline";
import { addTask, deleteTask, updateTask, toggleStatus } from "../../actions/todos";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
   paper: {
      padding: 0,
      margin: 0,
      height: "100vh",
      backgroundColor: "#fafafa",
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   header: {
      color: theme.palette.primary.main,
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

function TodoApp() {
   const classes = useStyles();
   const [todolist, setTodolist] = useState([]);
   const [success, setSuccess] = useState(false);
   useEffect(() => {
      getAlltasks().then(data => setTodolist(data));
   }, [success]);
   // const { toggleTodo } = useTodoState(initialTodos);

   const addTodo = val => {
      addTask(val).then(() => setSuccess(!success));
   };
   const removeTodo = id => {
      deleteTask(id).then(() => setSuccess(!success));
   };
   const editTodo = (id, description) => {
      updateTask(id, description).then(() => setSuccess(!success));
   };
   const toggleTodo = (id, status) => {
      toggleStatus(id, status).then(() => setSuccess(!success));
   };

   return (
      <Layout>
         <CssBaseline />
         <Paper className={classes.paper} elevation={1}>
            <Grid container justify='center' style={{ marginTop: "1rem" }}>
               <Grid item xs={11} md={8} lg={5}>
                  <Typography
                     className={classes.header}
                     align='center'
                     variant='h2'
                     component='p'>
                     Todo List
                  </Typography>
                  <TodoForm addTodo={addTodo} />
                  <TodoList
                     todos={todolist}
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
