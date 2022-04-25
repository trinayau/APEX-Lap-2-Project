const express = require('express');
const cors = require('cors');
const path = require('path');
// const bcrypt = require('bcrypt');

const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
