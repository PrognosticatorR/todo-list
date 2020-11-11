import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import keyGenerator from "../../utils/keyGenerator";
import SubTask from "./subTask";
import AddSubTask from "./AddSubTask";
import { addSubTask, deleteSubTask, toggleSubTaskStatus } from "../../actions/subTasks";

function SubTasks({ editTodo, show, taskId, subtasks }) {
   const [subtasksList, setSubtasksList] = useState(subtasks);

   const addSubTodo = description => {
      addSubTask(taskId, description).then(data => {
         console.log(data);
         setSubtasksList([...subtasksList, data]);
      });
   };
   const removeSubTodo = subtaskId => {
      const newList = subtasksList.filter(data => data.id !== subtaskId);
      deleteSubTask(subtaskId).then(() => setSubtasksList([...newList]));
   };

   const toggelSubTodo = (subtaskId, status) => {
      const newList = subtasksList.filter(data => data.id !== subtaskId);
      toggleSubTaskStatus(subtaskId, status).then(data =>
         setSubtasksList([data, ...newList])
      );
   };

   if (show)
      return (
         <Paper>
            <AddSubTask taskId={taskId} addSubTodo={addSubTodo} />
            {subtasksList.length > 0 && (
               <List>
                  {subtasksList.map((todo, i) => (
                     <React.Fragment key={keyGenerator.getKey()}>
                        <SubTask
                           {...todo}
                           key={keyGenerator.getKey()}
                           removeTodo={removeSubTodo}
                           toggleTodo={() => toggelSubTodo(todo.id, todo.status)}
                           editTodo={editTodo}
                        />
                        {i < subtasksList.length - 1 && <Divider />}
                     </React.Fragment>
                  ))}
               </List>
            )}
         </Paper>
      );
   return null;
}
export default SubTasks;
