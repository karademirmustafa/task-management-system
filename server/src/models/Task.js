const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId

const TaskSchema = new mongoose.Schema({

    userId: { type: ObjectId, ref: "User" },
    title: String,
    description: String,
    status: {type:String,enum: ['pending', 'completed'],default:"pending",},
    dueDate: Date,
    history:[{newStatus:String,updatedAt:Date}],
    assignedTo:{type:ObjectId,ref:"User"},
    isDeletedAt:Date


}, { timestamps: true, versionKey: false, collection: "tasks" })


const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;