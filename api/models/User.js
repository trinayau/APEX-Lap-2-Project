const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
<<<<<<< HEAD

const habitSchema = new mongoose.Schema({
  habitId: {
    type: Number,
    required: true
  },
  habitName: {
    type: String,
    required: true,
    maxlength: [50, 'Game title can only be up to 50 characters']
  },
  habitType: {
    type:String,
    required: true
  },
  habitComplete: {
    type: Boolean,
    required: true
  }
})

const gameSchema = new mongoose.Schema({
  gameID: {
    type: Number,
    required: false,
  },
  gameName: {
    type: String,
    required: true,
    lowercase: true,
    maxlength: [50, 'Game title can only be up to 50 characters']
  },
  gameImg: {
    type: String,
    required: false,
  },
  habits: [habitSchema]
})
=======
>>>>>>> bce4a278793cbdb97a5e83115b7a77d6658cd687

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
<<<<<<< HEAD
  },
  games: [gameSchema]
=======
  }
>>>>>>> bce4a278793cbdb97a5e83115b7a77d6658cd687
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