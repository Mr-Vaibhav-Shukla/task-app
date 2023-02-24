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

// const bcrypt = require('bcrypt')

// const fun = async () => {
//     const p = "vaibhav123"
//     const hp = await bcrypt.hash(p,8)
//     const cp = await bcrypt.hash(p,8)

//     console.log(p)
//     console.log(hp)
//     console.log(cp)
// }
// fun()

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('The first promise with 100 has resolved');
        resolve(100);
    }, 3 * 1000);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('The second promise with 200 has rejected');
        reject(200);
    }, 2 * 1000);
});
Promise.race([p1, p2])
    .then(value => console.log(`Resolved: ${value}`))
    .catch(reason => console.log(`Rejected: ${reason}`));


// const jwt = require('jsonwebtoken')

// console.log(jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y3NTVlZGIxNmYyM2Q0MTJlYmU3ZjAiLCJpYXQiOjE2NzcxNTM3NzN9.mt6MbT85dRwpVz5uOJFLxEVwBUQCLWzw3Eo8kGu4ulo','thisissecreattoken'))