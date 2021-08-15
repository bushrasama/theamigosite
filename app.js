const express = require("express");
const app = express()
const mongoose = require("mongoose");
const PORT = process.env.PORT||5000
const {MONGOURI} = require("./config/valuekeys.js")
const cors = require('cors');
app.use(cors());

mongoose.connect("mongodb+srv://bushra:bumongodb@cluster0.2wk1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{useNewUrlParser: true,
useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log("connected to server");
})

mongoose.connection.on('error',()=>{
    console.log("connection error");
})

require("./models/user");
require("./models/post");

app.use(express.json())
app.use(require('./routes/authen'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
//bumongodb : password for mongodb

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Server is running at ", PORT);
})