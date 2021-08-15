import React, { useEffect , useState} from 'react';
import Mo from 'materialize-css'
import {useHistory } from 'react-router-dom'

export const Createposts=()=>{
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setimage] = useState("")
    const [url, seturl] = useState("")
    const history = useHistory()

    // useEffect(()=>{
    //     console.log(url)
    //     if(url){
    //         fetch("/createpost", { 
    //             method:"post",
    //             headers:{
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //               "Authorization":"Bearer" + localStorage.getItem("jwt")
                    
    //             }, 
    //           body:JSON.stringify({
    //              Title , 
    //              Body,
    //              pic:url
    //             })
    //          }).then(res=>res.json()).then(data=>{
    //             if(data.error){
    //               Mo.toast({html:data.error,classes:"#4dd0e1 cyan lighten-2"})
    //             }else{
    //                 history.push("/")
    //               Mo.toast({html:"created post successfully",classes:"#18ffff cyan accent-2"})
    //             }
    //          }).catch(err=>{
    //           console.log(err)
    //          })
          
    //     }
        
    // },[url])

    const db=(url)=>{
        console.log(url, title, body)
        fetch("/createpost", { 
            method:"post",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              "Authorization":"Bearer" + localStorage.getItem("jwt")
                
            }, 
          body:JSON.stringify({
             title , 
             body,
             pic:url
            })
         }).then(res=>res.json()).then(data=>{
            if(data.error){
              //Mo.toast({html:data.error,classes:"#4dd0e1 cyan lighten-2"})
            }else{
                history.push("/")
              //Mo.toast({html:"created post successfully",classes:"#18ffff cyan accent-2"})
            }
         }).catch(err=>{
          console.log(err)
         })
    }

    const postDetails=()=>{

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
            db(data2.url)
        }).catch(err=>{
            console.log(err);
        })
    }

    return(
        <div className="card input-filed #b2ebf2 cyan lighten-5"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
        <input type="text" placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}} 
        />
        <input type="text" placeholder="Description" 
            value={body} onChange={(e)=>{setBody(e.target.value)}}
        />
        <div className="file-field input-field">
        <div className="btn waves-effect waves-light #00bcd4 cyan">
        <span>Upload Photo</span>
        <input type="file" 
            onChange={(e)=>{
                console.log(e.target.files)
                setimage(e.target.files[0])}}
        />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
        </div>
        <button className="btn waves-effect waves-light #00bcd4 cyan" type="submit" name="action"
        onClick={()=>postDetails()}>Upload Post</button>
        </div>
    )
}