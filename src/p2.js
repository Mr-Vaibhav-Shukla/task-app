// const express = require('express')
// require("./db/mongoose")
// const User = require("./models/user")
// const Task = require('./models/task')

// // Task.findByIdAndDelete('63f60dfa502ad9acb42b0e5b')
// // .then((task)=>{
// //        console.log(task)
// //        return Task.find({completed: false})
// // })
// // .then((t)=>{
// //     console.log(t)
// // })
// // .catch((error)=>
// // console.log(error))

// const deleteTaskAndCount = async (id) => {
//     const d = await Task.findByIdAndDelete(id)
//     const c = await Task.countDocuments({completed: false})
//     return c
// }

// deleteTaskAndCount('63f7040993ff2882fb9f927e')
// .then((r) => console.log(r))
// .catch((e) => console.log(e))

const bcrypt = require('bcrypt')

const fun = async () => {
    const p = "vaibhav123"
    const hp = await bcrypt.hash(p,8)
    const cp = await bcrypt.hash(p,8)

    console.log(p)
    console.log(hp)
    console.log(cp)
}
fun()