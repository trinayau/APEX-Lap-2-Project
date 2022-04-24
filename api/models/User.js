const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    habits: []
}, {timestamps: true})

module.exports.User = mongoose.model('User', userSchema)