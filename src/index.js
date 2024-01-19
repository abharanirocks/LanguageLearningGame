require('dotenv').config();
require('./models/User')
require('./models/quiz')

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const requireAuth = require('./middlewares/requireAuth');
const authRoutes= require('./routes/authRoutes');
const userRoutes= require('./routes/userRoutes');
const quizRoutes = require('./routes/quizRoutes');
const leaderBoardRoutes = require('./routes/leaderBoardRoutes');
const checkAndCreateQuestions = require('./dbSeed');
const mongoose = require('./db');

checkAndCreateQuestions();




const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(authRoutes);
app.use(quizRoutes);
app.use(userRoutes);
app.use(leaderBoardRoutes);


app.get('/',requireAuth, (req,res)=>{
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3001,()=>{
    console.log('Listening on port 3001')
}) 