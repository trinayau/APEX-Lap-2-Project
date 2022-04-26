const express = require('express');
const cors = require('cors');
const path = require('path');
// const bcrypt = require('bcrypt');
const app = express();

const habitRoutes = require('./routes/habitsRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes')

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'))

<<<<<<< HEAD
app.get('/', (req, res) => res.send('APEX'));
=======
>>>>>>> bce4a278793cbdb97a5e83115b7a77d6658cd687

app.use('/habits', habitRoutes);

app.use('/users', authRoutes);

//app.use('/search', searchRoutes);

module.exports = app;
