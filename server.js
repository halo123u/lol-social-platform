const express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});

app.get('/', (req,res)=>{
    res.send('hello world');
});