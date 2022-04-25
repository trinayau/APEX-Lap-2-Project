const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
    maxLength: [20, 'Username can only be up to 20 characters'],
  },
  password: {
    type: String,
    required: [true, 'password required'],
    minlength: [6, 'Password must be at least 6 characters'],
  }
});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);  
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;