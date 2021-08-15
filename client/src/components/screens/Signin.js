import React, { useState , useContext } from 'react'
import { Link , useHistory } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
export const Signin=()=>{
    const {state, dispatch} = useContext(UserContext)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const history = useHistory()
  const PostData =()=>{
    // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    //   M.toast({html:"Invalid Email ID", classes:"#4dd0e1 cyan lighten-2"})
    //   return
    //} 
    
    fetch("/signin", { 
      method:"post",
      headers:{
        'Accept': 'application/json',
      'Content-Type': 'application/json'}, 
    body:JSON.stringify({
       password:password , 
       email:email 
      })
   }).then(res=>res.json()).then(data=>{
    console.log(data)  
    if(data.error){
        M.toast({html:data.error,classes:"#4dd0e1 cyan lighten-2"})
      }else{
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER", payload:data.user})
        //M.toast({html:data.message,classes:"#18ffff cyan accent-2"})
        history.push("/")
      }
   }).catch(err=>{
    console.log(err)
   })
}
    return(
        <div className="mycard">
            <div className="card auth-card #b2ebf2 cyan lighten-5">
            <h3> THE AMIGO SITE</h3>
            <input type="text" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}></input>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}></input>
            <button className="btn waves-effect waves-light #00bcd4 cyan" type="submit" name="action">Login
    <i className="material-icons right" onClick={()=>PostData()}>send</i>
  </button>
  <h6><Link to="/signup">Don't have an account?</Link></h6>
      </div>
        </div>
    )
}