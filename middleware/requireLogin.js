const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/valuekeys.js")
const mongoose = require("mongoose")
const User = mongoose.model("User");
module.exports = (req,res,next) =>{
    const {authorization} =req.headers;
    if(!authorization){
        res.status(401).json({error:"You must be logged in"});
    }
    const token = authorization.replace("Bearer" , "");
    jwt.verify(token,"bush04sama",(err,payload)=>{
        if(err){
            res.status(401).json({error:"You must be logged in"});
        }
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
      
    })
}