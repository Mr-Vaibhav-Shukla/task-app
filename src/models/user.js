const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                return new Error("Not a valid email")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age cannot be negative")
            }
        }

    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        validate(value) {
            if (validator.contains(value.toLowerCase(), "password")) {
                throw new Error('Password should not contain password!')
            }
        }
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    console.log("Hellooooooooo")
    const user = await User.findOne({email})

    if(!user){
        throw new Error("Email not found")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("Invalid Password")
    }
    console.log(user)
    return user
}

//Hashing the password before saving
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User', userSchema);

module.exports =  mongoose.model('User')
