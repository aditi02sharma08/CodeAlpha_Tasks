const express = require("express");
const router = express.Router();

const {
    addComment,
    getAllComments
} = require("../controllers/commentController");

// Add Comment
router.get("/", getAllComments);
router.post("/", addComment);

module.exports = router;