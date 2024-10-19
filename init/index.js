// Import required modules
const mongoose = require('mongoose');

const programData = require("./Program.js");
const programSchema = require("../models/programSchema.js")

// Connect to MongoDB
const MONGO_URL = 'mongodb://127.0.0.1:27017/innerbhakti'

main().then(() => {
    console.log("connected to db")
}).catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}


const initDB = async () =>{
    
    await programSchema.deleteMany({})
    await programSchema.insertMany(programData.program);

   
    console.log("Data was initilazed")
}

initDB();



