const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//to create schema
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
// important!!! arrow doesn't work if 'this' is used!
userSchema.statics.signup = async function(email, password) {

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    // use bcrypt 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

module.exports = mongoose.model('User', userSchema)