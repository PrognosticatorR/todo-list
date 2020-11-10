import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import useInputState from "../../hooks/useInputState";
import { addTask } from "../../actions/todos";
import { getCurrentUser } from "../../actions/auth";

function TodoForm({ addTodo }) {
   const [value, handleChange, reset] = useInputState("");
   useEffect(() => {
      getCurrentUser();
   }, []);
   return (
      <Paper style={{ margin: "1rem 0", padding: "0 1rem" }}>
         <form
            onSubmit={e => {
               e.preventDefault();
               addTask(value);
               reset();
            }}>
            <TextField
               value={value}
               onChange={handleChange}
               margin='normal'
               label='Add New Todo'
               fullWidth
            />
         </form>
      </Paper>
   );
}
export default TodoForm;
