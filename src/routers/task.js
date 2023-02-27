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

router.get('/tasks',auth, async (req,res)=> {
    try {
        const match = {}
        const sort = {}
        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }

        if(req.query,sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1:1
        }
        // const tasks = await Task.find({owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        })
        console.log(req.query.limit)
        res.send(req.user.tasks) 
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id',auth, async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id,owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)    
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id',auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['discription', 'completed']
    const isValidUpdate = updates.every((u) => allowedUpdates.includes(u))
    if(!isValidUpdate)
    {
        return res.status(400).send("Invalid Update")
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})


router.delete('/tasks/:id',auth, async (req,res) => {
    try {
        const t1 = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!t1){
            return res.status(404).send()
        }
        res.send(t1)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router