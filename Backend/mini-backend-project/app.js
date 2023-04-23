const express = require('express');
const app  = express();
require('dotenv').config();

const {connection}=require('./config/connection');
const { loginRouter } = require('./routes/login');
const { noteRouter } = require('./routes/notes');
const { regRouter } = require('./routes/register');
const cors = require('cors')
app.use(express.json())
app.use(cors())
//_________________________________________________
app.get('/',async(req,res)=>{
    res.send("Home page is here")
})
//_________________________________________________
app.use('/login',loginRouter);
app.use('/register',regRouter);
app.use('/notes',noteRouter);
//_________________________________________________
app.listen(process.env.port, async(req,res)=>{
    try{
    await connection ;
    console.log('connected to remote db')

    }catch(err){
        console.log("_________errror :mongodb atlas connection")
    }
    console.log(`server started at http://localhost:${process.env.port}`)
})