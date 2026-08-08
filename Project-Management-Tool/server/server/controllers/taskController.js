const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
    try {
        const { title, description, project } = req.body;

        const task = new Task({
            title,
            description,
            project
        });

        await task.save();

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Assign Task
const assignTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { userId } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

    task.assignedTo = userId;

await task.save();

res.status(200).json({
    message: "Task assigned successfully",
    task
});

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Get All Tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email");

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createTask,
    assignTask,
    getAllTasks
};