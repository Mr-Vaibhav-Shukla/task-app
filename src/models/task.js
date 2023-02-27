const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    discription: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

const tasks = mongoose.model('tasks',taskSchema)
module.exports =  mongoose.model("tasks")
