const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");


router.post("/add", authMiddleware, createTask);
router.get("/list", authMiddleware, getTasks);
router.put("/update/:id", authMiddleware, updateTask);
router.delete("/delete/:id", authMiddleware, deleteTask);

module.exports = router;
