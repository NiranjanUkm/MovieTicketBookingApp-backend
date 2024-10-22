const mongoose = require('mongoose');


const MONGO_DB = process.env.MONGO_DB;
const DB_NAME = process.env.DB_NAME;

if (!MONGO_DB || !DB_NAME) {
    throw new Error("Missing MONGO_DB or DB_NAME environment variables.");
}

mongoose.connect(`${MONGO_DB}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB Connected Successfully!");
})
.catch((err) => {
    console.error("DB Connection Failed! \n", err);
});
