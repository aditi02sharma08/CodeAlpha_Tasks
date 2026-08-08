const express = require("express");
const router = express.Router();

const {
    createTask,
    assignTask,
    getAllTasks
} = require("../controllers/taskController");

// Create Task
router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:taskId/assign", assignTask);

module.exports = router;