const express = require('express')
const Task = require("../models/task")
const auth = require("../middleware/auth")
const router = new express.Router()

router.post('/tasks',auth, async (req, res) => {
    const t1 = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await t1.save()
        res.status(201).send(t1)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req,res)=> {
    try {
        const tasks = await Task.find({})
        res.send(tasks) 
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)    
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id',async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['discription', 'completed']
    const isValidUpdate = updates.every((u) => allowedUpdates.includes(u))
    if(!isValidUpdate)
    {
        return res.status(400).send("Invalid Update")
    }
    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        if(!task){
            return res.status(404).send("hhh")
        }
        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})


router.delete('/tasks/:id', async (req,res) => {
    try {
        const t1 = await Task.findByIdAndDelete(req.params.id)
        if(!t1){
            return res.status(404).send()
        }
        res.send(t1)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router