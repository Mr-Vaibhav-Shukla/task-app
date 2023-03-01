const app = require('../app')
const request = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const _id = new mongoose.Types.ObjectId();
const userOne = {
    _id,
    name: "vaibhav Shukla",
    email: "vibhu@gmail.com",
    password: "vibhu@123",
    tokens: [{
        token: jwt.sign({ _id: _id.toString() }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany({})
    await new User(userOne).save()
})

test('signup new user', async () => {
   const response = await request(app).post('/users').send({
        name: "vaibhav",
        email: "vaibhav@gmail.com",
        password: "vaibhav@123"
    }).expect(200)


    const user = await User.findById(response.body.u1._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        u1: {
            name: 'vaibhav',
            email: 'vaibhav@gmail.com'
        },
        token: user.tokens[0].token
    })
})

test('login test', async() => {
    const response = await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('delete account', async() => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})


test('updation', async() => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Vibhu'
        })
        .expect(200)
    const user = await User.findById(userOne._id)
    expect(user.name).toEqual('Vibhu')
})

// test('upload avatar', async () => {
//     await request(app)
//         .post('/users/me/avatar')
//         .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
//         .attach('avatar', 'tests/fixtures/philli.jpg')
//         .expect(200)
//     console.log(response)
// })