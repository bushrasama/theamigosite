import React, { useContext, useEffect, useState } from 'react'
import {UserContext} from '../../App'
import {useParams,useHistory} from 'react-router-dom'
export const UserProfile = () => {
    const history = useHistory();
    const[Prof,setProf] = useState({})
    const[userfollower,setFollower] = useState([])
    const {state,dispatch} = useContext(UserContext)
    //console.log(UserContext)
    const[Profile,setProfile] = useState("")
    const[userProfile,setUserProfile] = useState("")
    const[userEmail,setUserEmail] = useState("")
    const {userid} = useParams()
    const[posts,setposts] = useState([])
    const[showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    const[userpic, setuserpic] = useState("")

    console.log(userid)
    useEffect(()=>{
        setShowFollow(state?!state.following.includes(userid):true)
        fetch(`/user/${userid}`,{
            headers:{
                'Accept': 'application/json',
                "Authorization":"Bearer" + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setUserProfile(result.user.name)
            setUserEmail(result.user.email)
            console.log(userProfile)
            setProfile(result.posts.length)
            //console.log(Profile)
            setposts(result.posts)
            setProf(result)
            setuserpic(result.user.pic)
        })
    },[])

    // const followUser = (userid)=>{
     const followUser = ()=>{
        fetch('/follow',{
        method:"put",
        headers:{
            'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization":"Bearer" + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            followId:userid,
            myid:JSON.parse(localStorage.getItem("user"))._id
            })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data);
        //  dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
         localStorage.setItem("user",JSON.stringify(data))
        // setProf((prevState)=>{
        //     return{
        //     user:{
        //         ...prevState.user,
        //         followers:[...prevState.user.followers,data._id]
        //     }
        // }
        // })

        setShowFollow(false)
        // window.location.reload();
        history.push("/");
    })
    }


    const unfollowUser = ()=>{
    // const unfollowUser = (userid)=>{

        fetch('/unfollow',{
        method:"put",
        headers:{
            'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization":"Bearer" + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            // followId:userid
            followId:userid,
            myid:JSON.parse(localStorage.getItem("user"))._id
            })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data);
        // dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        // setProf((prevState)=>{
        //     const newFollower = prevState.user.followers.filter(item=>item!=data._id)
        //     return{
        //     user:{
        //         ...prevState,
        //         users:{
        //             ...prevState.user,
        //             followers:newFollower
        //         }
        //     }
        // }
        // })
        setShowFollow(true)
        history.push("/");
        // window.location.reload();
    })
    }


    return(
        <div>
            {
                posts?

                <div className="profile #b2ebf2 cyan lighten-5" style={{maxWidth:"550px", margin:"0px auto"}}>
           <div className="pro #b2ebf2 cyan lighten-4" style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px, 0px",
               borderBottom:"1px solid grey"
           }}>
           <div>
                <img src={userpic} style={{width:"160px",
                height:"160px",
                borderRadius:"80px",
                }} /> </div>
            <div>
                <h4> {userProfile} </h4>
                <h5> {userEmail} </h5>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    width:"108%"
                }}>

                   <h6> {Profile} posts</h6>
                   <h6> {Prof.user === undefined? "loading": Prof.user.followers===undefined?"loading":Prof.user.followers.length} followers</h6>  
                   <h6> {Prof.user === undefined? "loading": Prof.user.following===undefined?"loading":Prof.user.following.length} following</h6>   
                </div>

                {/* {!JSON.parse(localStorage.getItem("user")).following.includes(userid) && showfollow ? <button onClick={()=>followUser()} className="btn waves-effect waves-light #00bcd4 cyan" type="submit" name="action">Follow
                <i className="material-icons right" ></i>
                </button> :
                <button onClick={()=>unfollowUser()} className="btn waves-effect waves-light #00bcd4 cyan" type="submit" name="action">UnFollow
                <i className="material-icons right" ></i>
                </button>
                } */}

                 
                {JSON.parse(localStorage.getItem("user"))._id != userid&&(JSON.parse(localStorage.getItem("user")).following.length > 0) &&JSON.parse(localStorage.getItem("user")).following.includes(userid) ? 
                <button onClick={()=>unfollowUser()} className="btn waves-effect waves-light #00bcd4 cyan" type="submit" name="action">UnFollow
                <i className="material-icons right" ></i>
                </button>:null}
                {console.log(JSON.parse(localStorage.getItem("user"))._id != userid)}
                {console.log((JSON.parse(localStorage.getItem("user")).following.length > 0))}
                {console.log(!JSON.parse(localStorage.getItem("user")).following.includes(userid))}

                {  !JSON.parse(localStorage.getItem("user")).following.includes(userid) ?
                <button onClick={()=>followUser()} className="btn waves-effect waves-light #00bcd4 cyan" type="submit" name="action">Follow
                <i className="material-icons right" ></i>
                </button>:null}
                
                
                <br />
            </div>
           </div>
           <div className="gallery"> 
                {
                    posts.map(item=>{
                   return(
                    <img key={item._id} className="item" src={item.photo} />
                 
                        )
                    })
                }
         </div>
        </div>
                :
                "loading"
            }
        </div>
    )
        }