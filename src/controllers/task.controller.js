const { Task } = require("../models");
const logActivity = require("../utils/logActivity");



exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ status: "failure", message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      userId: req.user.id,
    });

    await logActivity(req.user.id, "Task Created", req.ip);

    res.status(201).json({
      status: "success",
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({status: "failure", message: error.message });
  }
};



exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json({ status: "success", tasks });

  } catch (error) {
    res.status(500).json({status: "failure", message: error.message });
  }
};



exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({
        status: "failure",
        message: "Task not found or unauthorized",
      });
    }

    await task.update(req.body);

    await logActivity(req.user.id, "Task Updated", req.ip);

    res.json({
        status: "success",
      message: "Task updated successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({ status: "failure", message: error.message });
  }
};



exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({
        status: "failure",
        message: "Task not found or unauthorized",
      });
    }

    await task.destroy();

    await logActivity(req.user.id, "Task Deleted", req.ip);

    res.json({
        status: "success",
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ status: "failure", message: error.message });
  }
};
