const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const connect = require('./db/connect');
const users= require('./routes/user');
const app = express();
require('dotenv').config();

// middleware
app.use(morgan('tiny'))
app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// routes
app.use('/tic-tac-toe/game/v1',users);

const port = process.env.PORT || 5000;
const url =  process.env.DATABASE_URL;
// const url =  "mongodb://localhost:27017/TicTacToe_Game";
const start = async ()=>{
    try {
        await connect(url);
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`)
            console.log('db connected')
        })
    } catch (error) {
        console.log(error);
    }
}
start()

