const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/valuekeys");
const requireLogin = require("../middleware/requireLogin");

/*router.get("/",(req,res)=>{
    res.send("Hello World");
})*/

router.post("/signup",(req,res)=>{
    //console.log(req.body)
    const{name,email,password,pic} = req.body
    if(!email || !password ||!name){
       
        res.status(401).json({error:"You will need to give all the information"})
    }
    User.findOne({email:email}).then((savedUser=>{
       // console.log("bushshd", savedUser)
        if(savedUser){
            return res.status(402).json({error:"User already exists with that email ID"})
        }
        bcrypt.hash(password,10).then(hashedpassword=>{
            const user = new User({
                email ,
                password : hashedpassword,
                name,
                pic
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            }).catch(err=>{
                console.log(err);
            })
        
        })
       
    })).catch(err=>{
        console.log(err);
    //res.json({message:"Your data is successfully sent"})
    //console.log(req.body.name); 
      })
    })


router.get("/protect",requireLogin,(req,res)=>{
    res.send("Heyy..!!!!!!!!!!!!!!!!");
})



router.post("/signin",(req,res)=>{
    console.log(req.body)
        const{email,password} = req.body;
        // if(!email || !password){
        //     return res.status(422).json({error:"Please add email and password"})
        // }
        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
                return res.status(422).json({error:"Invalid add email and password"})
            }
            bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                    //res.json({message:"Successfully signed in"});
                    const token = jwt.sign({_id:savedUser._id},"bush04sama");
                    const {_id,name,email, followers,following, pic} = savedUser
                    res.json({token,user:{_id,name,email,followers,following, pic }})
                }
                else{
                    return res.status(422).json({error:"Invalid Email or Password"})
                }
            }).catch(err=>{
                console.log(err)
            })
        })
    })


module.exports = router