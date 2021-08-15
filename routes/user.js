const { request } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedby:req.params.id})
        .populate("postedby","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

router.put('/follow',requireLogin,(req,res)=>{
    console.log(req.body)
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.body.myid}
        
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
        User.findByIdAndUpdate(req.body.myid,{
            $push:{following:req.body.followId}
        },{new:true}).select("-password").then(result=>{
            console.log(result)
            // return res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})

        })
    }
    console.log(result)
         res.json(result)
    })
})

router.put('/unfollow',requireLogin,(req,res)=>{
    console.log(req.body)
    User.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.body.myid}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.body.myid,{
            $pull:{following:req.body.followId}
        },{new:true}).select("-password").then(result=>{
            // console.log(result)
            //  res.json(result)
        }).catch(err=>{
            console.log(err);
            return res.status(422).json({error:err})
        })
        // console.log(result)
         res.json(result)
    })
})


module.exports = router