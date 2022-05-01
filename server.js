const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, jwt } = require('./middleware/authMiddleware');
const bodyParser = require("body-parser");



const app = express();

const gameRoutes = require('./routes/gameRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const { Game, Habit, User } = require('./models/Schema');

app.set('view engine', 'ejs');

//Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.text());




app.get('*', checkUser);
app.use('/games', gameRoutes);

app.get('/', (req, res) => res.render('index', { title: 'Home'}));

app.get('/habitPage', requireAuth, (req, res) => {
    const token = req.headers.cookie.split('=')[1];
    const decodedToken = jwt.decode(token);
    User.findOne({username: decodedToken.id})
        .then((result) => {
            res.render('habitPage', { title: 'Habits', user: result})
        })
        .catch((err) => {
            console.log(err)
        })
    
});


app.post('/habits', (req, res) => {
    const habit = new Habit(req.body);
    habit.save()
        .then((result) => 
        res.redirect('/habitPage'))
        .catch((err)=>{
            console.log(err)
        })
}) 

app.get('/gamePage', requireAuth, (req,res) => {
    const token = req.headers.cookie.split('=')[1];
    const decodedToken = jwt.decode(token);
    User.findOne({username: decodedToken.id})
        .then((result) => {
            res.render('games', { title: 'Habits', games: result.games})
        })
        .catch((err) => {
            console.log(err)
        })
  
})

app.get('/onlyhabits', requireAuth, (req,res) => {
    const token = req.headers.cookie.split('=')[1];
    const decodedToken = jwt.decode(token);
    Habit.find({username: decodedToken.id})
        .then((result) => {
            res.render('onlyHabits', { title: 'Habits'})
        })
        .catch((err) => {
            console.log(err)
        })
  
})

app.use(authRoutes);


app.use('/search', searchRoutes);

app.use((req, res) => {
    res.status(404).render('404', {
        title: "404"
    })
})

module.exports = app;
