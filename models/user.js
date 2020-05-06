const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)