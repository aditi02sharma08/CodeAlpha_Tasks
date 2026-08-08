const express = require("express");
const router = express.Router();
const {
    createProject,
    addMember,
    getBoard,
    getAllProjects
} = require("../controllers/projectController");

// Create Project
router.get("/", getAllProjects);
router.post("/", createProject);
router.put("/:projectId/add-member", addMember);
router.get("/:projectId/board", getBoard);

module.exports = router;