const express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
User = require('./api/models/User');
require('dotenv').config();

mongoose.connect('mongodb://localhost/lolAppDb');

const app = express(),
port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});

app.get('/', (req,res) => {
    res.send('hello world');
});

const userRoutes = require('./api/routes/userRoutes');
app.use('/user',userRoutes);
