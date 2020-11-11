import React from "react";
import useInputState from "../../hooks/useInputState";
import TextField from "@material-ui/core/TextField";

function AddSubTask({ task, toggleEditForm, addSubTodo }) {
   const [value, handleChange, reset] = useInputState(task);
   return (
      <form
         onSubmit={e => {
            e.preventDefault();
            addSubTodo(value);
            reset();
         }}
         style={{ marginLeft: "3rem", width: "85%" }}>
         <TextField
            margin='dense'
            value={value}
            onChange={handleChange}
            label='Add Sub Task'
            fullWidth
         />
      </form>
   );
}
export default AddSubTask;
