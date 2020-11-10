const mongoose = require("mongoose");
const StatusType = require("../utils/enums");

const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema(
   {
      description: {
         type: String,
         required: true,
      },
      userId: {
         type: String,
         required: true,
      },
      status: {
         type: String,
         required: true,
         enum: Object.values(StatusType),
         default: StatusType.inprogress,
      },
      subTasks: [{ type: ObjectId, ref: "SubTask" }],
   },
   {
      toJSON: {
         transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
         },
      },
   }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
