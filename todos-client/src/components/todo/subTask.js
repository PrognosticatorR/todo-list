import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import EditTodoForm from "./EditTodoForm";

function SubTask({ id, description, status, toggleTodo, editTodo, removeTodo }) {
   const [isEditing, toggle] = useState(false);
   console.log(id, description, status);
   return (
      <>
         <ListItem
            style={{
               height: "40px",
               width: "90%",
               marginLeft: "3rem",
            }}>
            {isEditing ? (
               <EditTodoForm
                  editTodo={editTodo}
                  id={id}
                  task={description}
                  toggleEditForm={toggle}
               />
            ) : (
               <>
                  <Checkbox
                     tabIndex={-1}
                     checked={status === "completed"}
                     onClick={() => toggleTodo(id)}
                  />
                  <ListItemText
                     style={{
                        textDecoration: status === "completed" ? "line-through" : "none",
                     }}>
                     {description}
                  </ListItemText>
                  <ListItemSecondaryAction>
                     <IconButton aria-label='Delete' onClick={() => removeTodo(id)}>
                        <DeleteIcon />
                     </IconButton>
                  </ListItemSecondaryAction>
               </>
            )}
         </ListItem>
      </>
   );
}

export default SubTask;
