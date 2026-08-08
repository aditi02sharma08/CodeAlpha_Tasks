const Project = require("../models/Project");
const User = require("../models/User");

// Create Project
const createProject = async (req, res) => {
    try {
        const { name, description, members } = req.body;

        const project = new Project({
            name,
            description,
            members
        });

        await project.save();

        res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Add Member to Project
const addMember = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { email } = req.body;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (project.members.includes(user._id)) {
            return res.status(400).json({
                message: "Member already added"
            });
        }

        project.members.push(user._id);

        await project.save();

        res.status(200).json({
            message: "Member added successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Get Project Board
const getBoard = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            board: project.board
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Get All Projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    createProject,
    addMember,
    getBoard,
    getAllProjects
};