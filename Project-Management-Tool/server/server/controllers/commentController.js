const Comment = require("../models/Comment");

// Add Comment
const addComment = async (req, res) => {
    try {
        const { message, task, user } = req.body;

        const comment = new Comment({
            message,
            task,
            user
        });

        await comment.save();

        res.status(201).json({
            message: "Comment added successfully",
            comment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// Get All Comments
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();

        res.status(200).json(comments);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addComment,
    getAllComments
};