const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");


/**
 * @swagger
 * /api/tasks/add:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete project"
 *               description:
 *                 type: string
 *                 example: "Finish authentication setup"
 *               status:
 *                 type: string
 *                 example: "pending"
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: Unauthorized - No token provided
 *       500:
 *         description: Server error
 */
router.post("/add", authMiddleware, createTask);

/**
 * @swagger
 * /api/tasks/list:
 *   get:
 *     summary: Get all tasks of logged in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized - No token provided
 *       500:
 *         description: Server error
 */
router.get("/list", authMiddleware, getTasks);

/**
 * @swagger
 * /api/tasks/update/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.put("/update/:id", authMiddleware, updateTask);

/**
 * @swagger
 * /api/tasks/delete/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.delete("/delete/:id", authMiddleware, deleteTask);

module.exports = router;
