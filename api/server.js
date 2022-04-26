const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');

const app = express();

const habitRoutes = require('./routes/habitsRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes')

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/habits', habitRoutes)

app.get('*', checkUser);

app.get('/', (req, res) => res.render('index'));

app.get('/testRoute', requireAuth, (req, res) => res.render('testPage'));

app.use(authRoutes);

app.use('/habits', habitRoutes);

app.use('/users', authRoutes);

//app.use('/search', searchRoutes);

module.exports = app;
