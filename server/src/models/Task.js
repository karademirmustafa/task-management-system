const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId

const TaskSchema = new mongoose.Schema({

    userId: { type: ObjectId, ref: "User" },
    title: String,
    description: String,
    status: {type:String,enum: ['waiting','pending', 'completed'],default:"pending",},
    dueDate: Date,
    history:[{key:String,value:String,updatedAt:Date}],
    assignedTo:{type:ObjectId,ref:"User"},
    isDeletedAt:Date


}, { timestamps: true, versionKey: false, collection: "tasks" })


const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;