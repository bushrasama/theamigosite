import React , {useContext} from 'react'
import { Link  ,useHistory } from 'react-router-dom'
import {UserContext} from '../App'
const Navbar=()=>{
  const {state , dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = () =>{
    if(state){
      return[
        <div>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/create">Create Post</Link></li>
        <li><Link to="/myfollowerspost">My following posts</Link></li>
        <li> <button className="btn waves-effect waves-light #00bcd4 cyan" type="submit" name="action"
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")
        }}>Logout
    <i className="material-icons" ></i>
  </button>
  </li>
        </div>
      ]
    }else{
      return[
        <div>
        <li><Link to="/signin">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        
        </div>
      ]
    }
  }
    return(
        <nav>
        <div className="nav-wrapper #00bcd4 cyan">
          <Link to={state?"/home":"/signin"} className="brand-logo left b">THE AMIGO SITE</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
    )
}

export default Navbar