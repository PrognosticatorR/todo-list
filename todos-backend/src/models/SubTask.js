const mongoose = require("mongoose");
const StatusType = require("../utils/enums");

const subtaskSchema = new mongoose.Schema(
   {
      description: {
         type: String,
         required: true,
      },
      status: {
         type: String,
         required: true,
         enum: Object.values(StatusType),
         default: StatusType.inprogress,
      },
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

const SubTask = mongoose.model("SubTask", subtaskSchema);

module.exports = SubTask;
