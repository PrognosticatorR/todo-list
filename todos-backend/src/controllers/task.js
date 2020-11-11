const { NotAuthorizedError, NotFoundError } = require("@auscheon/common");
const StatusType = require("../utils/enums");

const Task = require("../models/Task");

exports.createtask = async (req, res) => {
   const { description } = req.body;
   const task = new Task({
      description,
      userId: req.currentUser.id,
      status: StatusType.inprogress,
   });
   await task.save();
   res.status(201).send(task);
};

exports.updatetask = async (req, res) => {
   const { description } = req.body;
   const task = await Task.findById(req.params.id);
   if (!task) {
      throw new NotFoundError();
   }
   if (task.userId !== req.currentUser.id) {
      throw new NotAuthorizedError();
   }
   task.set({ description });
   await task.save();
   res.status(200).send(task);
};

exports.markCompleted = async (req, res) => {
   const { status } = req.body;
   const task = await Task.findById(req.params.id);
   if (!task) {
      throw new NotFoundError();
   }
   if (task.userId !== req.currentUser.id) {
      throw new NotAuthorizedError();
   }
   let newStatus = status === "inprogress" ? StatusType.completed : StatusType.inprogress;

   task.set({ status: newStatus });
   task.subTasks.map(sub => (sub.status = newStatus));
   await task.save();
   res.status(200).send(task);
};

exports.deletetask = async (req, res) => {
   const { id } = req.params;

   const task = await Task.findById(id);
   if (!task) {
      throw new NotFoundError();
   }
   if (task.userId !== req.currentUser.id) {
      throw new NotAuthorizedError();
   }
   await Task.findOneAndRemove({ _id: req.params.id });
   res.status(200).send(task);
};

exports.gettasks = async (req, res) => {
   const tasks = await Task.find({ userId: req.currentUser.id }).populate(
      "subTasks",
      "description status _id"
   );
   if (!tasks) {
      throw new NotFoundError();
   }
   res.status(200).send(tasks);
};
