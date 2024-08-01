const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({path:'./config/.env'})
const morgan = require('morgan')
const mainRouter = require('./routes/mainRouter')
const app = express();
PORT=process.env.PORT;

require('./db/database');
app.use(morgan('dev'))
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use('/',mainRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})