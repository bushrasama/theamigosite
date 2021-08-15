const { request } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.get('/allposts',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedby" , "_id name")
    .populate("comments.postedby" , "_id name")
    .then(posts=>{
        console.log(posts)
        res.status(200).json(posts)
    }).catch(err=>{
        console.log(err);
    })
})


router.get('/getsubpost',requireLogin,(req,res)=>{
    //if posted by following
    Post.find({postedby:{$in:req.user.following}})
    .populate("postedby" , "_id name")
    .populate("comments.postedby" , "_id name")
    .then(posts=>{
        console.log(posts)
        res.status(200).json(posts)
    }).catch(err=>{
        console.log(err);
    })
})



router.post('/createpost', requireLogin ,(req,res)=>{
    console.log(req.body)
    const {title,body,pic} = req.body;
    if(!title || !body || !pic){
       return  res.status(422).json({error:"Please add all of the fields"});
    }
     req.user.password = undefined

    const post = new Post({
        title,
        body,
        photo:pic,
        postedby:req.user
    }) 
    post.save().then(result=>{
        console.log(result)
        res.json({post:result})
    }).catch(err=>{
        console.log(err);
    })
})

router.get('/mypost', requireLogin ,(req,res)=>{
    Post.find({postedby:req.user._id})
    .populate("postedby", "_id name")
    .then(mypost=>{
        res.json({mypost})
    }).catch(err=>{
        console.log(err);
    })
})

router.put('/like', requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}},
        {
            new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/unlike', requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}},
        {
            new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin,(req,res)=>{
    console.log(req.body);
        const comment = {
            text:req.body.text,
            name:req.body.name,
            postedBy:res.user
        }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}},
        {
            new:true
    }).populate("postedBy" , "_id name")
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

module.exports = router






