const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

const gameRoutes = require('./routes/gameRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const { Game, Habit } = require('./models/Schema');

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('*', checkUser);
app.use('/games', gameRoutes);

app.get('/', (req, res) => res.render('index', { title: 'Home'}));

app.get('/habitPage', requireAuth, (req, res) => {
    Habit.find()
        .then((result) => {
            res.render('habitPage', { title: 'Habits', habits: result})
        })
        .catch((err) => {
            console.log(err)
        })
    
});



app.use(authRoutes);

app.use((req, res) => {
    res.status(404).render('404', {
        title: "404"
    })
})
//app.use('/search', searchRoutes);

module.exports = app;
