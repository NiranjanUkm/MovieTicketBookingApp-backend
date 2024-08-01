const mongoose = require('mongoose')
const MONGO_DB=process.env.MONGO_DB;
const DB_NAME=process.env.DB_NAME;

mongoose.connect(`${MONGO_DB}/${DB_NAME}`)
.then(()=>{
    console.log("DB Connected Successfully!");
})
.catch((err)=>{
    console.log("DB Connection Failed! \n",err);
})
