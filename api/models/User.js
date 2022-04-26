const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
    maxLength: [20, 'Username can only be up to 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'password required'],
    minlength: [5, 'Password must be at least 5 characters'],
  }
});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);  
    next();
})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email: email});
  if (user){
    const auth = await bcrypt.compare(password, user.password)
    if (auth){
      return user;
    }
    throw Error('Invalid password')
  }
  throw Error('Incorrect email')
}

const User = mongoose.model('user', userSchema);

userSchema.plugin(uniqueValidator);

module.exports = User;