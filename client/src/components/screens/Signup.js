import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
export const Signup=()=>{
  const history = useHistory()
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  console.log(name, email, password)
  const [url,seturl] = useState(undefined)
  const [image,setImage] = useState("")

  useEffect(()=>{
    if(url){
      uploadFields()
    }
  },[url])



  const uploadpic = () =>{
    const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","socialnetwork")
        data.append("cloud_name","bushcloud")
        fetch("https://api.cloudinary.com/v1_1/bushcloud/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data2=>{
            console.log(data2)
          seturl(data2.url)
            console.log(data2.url)
            //db(data2.url)
        }).catch(err=>{
            console.log(err);
        })
  }

  const uploadFields = () =>{
     /* if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"Invalid Email ID", classes:"#4dd0e1 cyan lighten-2"})
      return 
    } */
    
    fetch("/signup", { 
      method:"post",
      headers:{
        'Accept': 'application/json',
      'Content-Type': 'application/json'}, 
        
    body:JSON.stringify({
      name:name,
       password:password , 
       email:email 
      })
   }).then(res=>res.json()).then(data=>{
      if(data.error){
        M.toast({html:data.error,classes:"#4dd0e1 cyan lighten-2"})
      }else{
        M.toast({html:data.message,classes:"#18ffff cyan accent-2"})
        history.push("/signin")
      }
   }).catch(err=>{
    console.log(err)
   })
  }


  const PostData =()=>{
        if(image){
          uploadpic()
        } else{
          uploadFields()
        }
    }
    return(
        <div className="mycard">
        <div className="card auth-card #b2ebf2 cyan lighten-5">
        <h3> THE AMIGO SITE </h3>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{setname(e.target.value)}}></input>
        <input type="text" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}></input>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}></input>
        
        <div className="file-field input-field">
        <div className="btn waves-effect waves-light #00bcd4 cyan">
        <span>Upload Photo</span>
        <input type="file" 
            onChange={(e)=>{
                console.log(e.target.files)
                setImage(e.target.files[0])}}
        />
      </div>

      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
      </div>
        <button onClick={()=>{PostData()}} className="btn waves-effect waves-light #00bcd4 cyan" type="submit" name="action">Signup
<i className="material-icons right">send</i>
</button>
<h6><Link to="/signin">Already have an account?</Link></h6>
  </div>
    </div>
    )
}