const express = require('express')
const User = require("../models/user")

const router = new express.Router()

router.post('/users', async (req, res) => {

    const u1 = new User(req.body)
    
    try {
        await u1.save()
        res.status(201).send(u1)
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/users',async (req,res)=> {
    try {
        const users = await User.find({})
        res.send(users) 
    } catch (error) {
        res.status(500).send(error)
    }
    
})

router.get('/users/:id', async (req,res)=>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)    
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/:id',async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age','email','password']
    const isValidUpdate = updates.every((u) => allowedUpdates.includes(u))
    if(!isValidUpdate)
    {
        return res.status(400).send("Invalid Update")
    }
    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req,res) => {
    try {
        const u1 = await User.findByIdAndDelete(req.params.id)
        if(!u1){
            return res.status(404).send()
        }
        res.send(u1)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/login',async(req,res) => {
    try {
        console.log("hhh")
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
