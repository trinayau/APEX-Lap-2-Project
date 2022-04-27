const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const habitSchema = new mongoose.Schema({
  habitName: {
    type: String,
    required: true,
    maxlength: [50, 'Game title can only be up to 50 characters']
  },
  habitReps: {
    type: Number,
    min: [0, 'Amount of repetitions must be higher than -1'],
    required: true
  },
  habitMaxReps: {
    type: Number,
    required: true,
    min: [1, 'Amount of max repetitions must be higher than 0']
  },
  habitComplete: {
    type: Boolean,
    default: false
  },
  habitStreak: {
    type: Number,
    min: [0, 'Amount of streak must be higher than -1'],
    default: 0
  }
});

const gameSchema = new mongoose.Schema({
  gameId: {
    type: Number,
    required: true,
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
  habits: {
    type: [habitSchema],
    required: false,
    default: []
  }
});

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
  },
  games: {
    type: [gameSchema],
    default: [],
    required: false
  }
});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);  
    next();
})

userSchema.plugin(uniqueValidator);

const User = mongoose.model('user', userSchema);
const Game = mongoose.model('game', gameSchema);
const Habit = mongoose.model('habit', habitSchema);

module.exports = { User, Game, Habit };
