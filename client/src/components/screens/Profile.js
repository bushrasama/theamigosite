import React, { useContext, useEffect, useState } from 'react'
import {UserContext} from '../../App'
export const Profile=()=>{
    const {state,dispatch} = useContext(UserContext)
    console.log(UserContext)
    const[mypics,setPics] = useState([])
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer" + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])
    return(
        <div className="profile #b2ebf2 cyan lighten-5" style={{maxWidth:"550px", margin:"0px auto"}}>
           <div className="pro #b2ebf2 cyan lighten-4" style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px, 0px",
               borderBottom:"1px solid grey"
           }}>
           <div>
                <img src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=330&q=80" style={{width:"160px",
                height:"160px",
                borderRadius:"80px",
                }} /> </div>
            <div>
                <h4> {JSON.parse(localStorage.getItem("user")).name}</h4>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    width:"108%"
                }}>
                   <h6>30 posts</h6>
                   <h6>30 followers</h6>  
                   <h6>35 following</h6>   
                </div>
            </div>
           </div>
           <div className="gallery"> 
           {
               mypics.map(item=>{
                   return(
                    <img key={item._id} className="item" src={item.photo} />
                 
                   )
               })
           }
         </div>
        </div>
    )
}