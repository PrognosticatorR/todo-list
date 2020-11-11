const { NotAuthorizedError, NotFoundError } = require("@auscheon/common");
const StatusType = require("../utils/enums");

const Task = require("../models/Task");
const SubTask = require("../models/SubTask");

exports.create = async (req, res) => {
   const { taskId, description } = req.body;
   const task = await Task.findById(taskId);
   if (!task) {
      throw new NotFoundError();
   }
   if (task.userId !== req.currentUser.id) {
      throw new NotAuthorizedError();
   }
   const newsubTask = new SubTask({ description, status: StatusType.inprogress });
   await newsubTask.save();
   task.subTasks.push(newsubTask);
   await task.save();
   res.status(201).send(newsubTask);
};

exports.getAll = async (req, res) => {
   const { taskId } = req.params;
   const task = await Task.findById(taskId).populate("subTasks");
   if (!task) {
      throw new NotFoundError();
   }
   res.status(200).send(task.subTasks);
};

exports.deletesubtask = async (req, res) => {
   const { subtaskId } = req.params;
   try {
      const subTask = await SubTask.findByIdAndRemove(subtaskId);
      if (!subTask || subTask.length === 0) {
         throw new NotFoundError();
      }
      res.status(200).send(subTask);
   } catch (error) {
      res.status(500).send("Something went wrong!");
   }
};

exports.update = async (req, res) => {
   const { subtaskId } = req.params;
   const { description } = req.body;
   try {
      const subTask = await SubTask.findById(subtaskId);
      if (!subTask || subTask.length === 0) {
         throw new NotFoundError();
      }
      subTask.set({ description });
      await subTask.save();
      res.status(200).send(subTask);
   } catch (error) {
      res.status(500).send("Something went wrong!");
   }
};
exports.toggaleStatus = async (req, res) => {
   const { status } = req.body;
   const subTask = await SubTask.findById(req.params.subtaskId);
   if (!subTask) {
      throw new NotFoundError();
   }
   status === "inprogress"
      ? subTask.set({ status: StatusType.completed })
      : subTask.set({ status: StatusType.inprogress });

   await subTask.save();
   res.status(200).send(subTask);
};
