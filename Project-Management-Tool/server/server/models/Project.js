const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },
    board: {
    type: [String],
    default: ["To Do", "In Progress", "Done"]
},

    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Project", projectSchema);