const mongoose = require('mongoose');

mongoose.model('tasks', {
    discription: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports =  mongoose.model("tasks")
