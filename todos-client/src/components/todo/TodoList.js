import React from "react";
import Todo from "./Todo";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import keyGenerator from "../../utils/keyGenerator";

function TodoList({ todos, removeTodo, toggleTodo, editTodo }) {
   if (todos.length)
      return (
         <Paper>
            <List>
               {todos.map((todo, i) => (
                  <React.Fragment key={keyGenerator.getKey()}>
                     <Todo
                        {...todo}
                        key={todo.id}
                        removeTodo={removeTodo}
                        toggleTodo={() => toggleTodo(todo.id, todo.status)}
                        editTodo={editTodo}
                     />
                     {i < todos.length - 1 && <Divider />}
                  </React.Fragment>
               ))}
            </List>
         </Paper>
      );
   return null;
}
export default TodoList;
