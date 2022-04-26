const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware');

const app = express();

const habitRoutes = require('./routes/habitsRoutes');
const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', requireAuth, (req, res) => res.render('index'))

app.get('/testRoute/', requireAuth, (req, res) => res.render('testPage'))

app.use('/habits', habitRoutes)

app.use('/users', authRoutes)

module.exports = app;
