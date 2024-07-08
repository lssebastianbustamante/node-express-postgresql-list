const { Router } = require("express");
const { getAllTasks, getTaskById, createTask,  deleteTaskById, updateTaskById} = require("../controllers/task.controller");

const router = Router();

router.get("/tasks", getAllTasks);

router.get("/tasks/:id", getTaskById);

router.post("/tasks", createTask);

router.delete("/tasks/:id", deleteTaskById);

router.put("/tasks/:id", updateTaskById);

module.exports = router;
