import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import {Signin } from './components/screens/Signin';
import { Profile } from './components/screens/Profile';
import { Home } from './components/screens/Home';
import { Signup } from './components/screens/Signup';
import { Createposts } from './components/screens/Createposts';
import {createContext , useEffect, useContext, useReducer } from 'react';
import {UserProfile} from './components/screens/UserProfile';
import {initialState, reducer} from './reducers/userReducer';
import {SubscribedUserPosts} from './components/screens/SubscribedUserPosts';
export const UserContext = createContext()
const Routing = ()=>{
  const history = useHistory()
  const {state , dispatch} = useContext(UserContext);
  useEffect (() =>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER" , payload:user})
      
    }else{
      history.push("/signin")
    }
  },[])
return(
  <Switch>
   <Route exact path='/'>
   <Home />
     </Route>
     <Route path='/signin'>
       <Signin />
     </Route>
     <Route path='/signup'>
       <Signup />
     </Route>
     <Route exact path='/profile'>
       <Profile />
     </Route>
     <Route path='/create'>
       <Createposts />
     </Route>
     <Route path='/profile/:userid'>
       <UserProfile />
     </Route>
     <Route path='/myfollowerspost'>
       <SubscribedUserPosts />
     </Route>
  </Switch>
)
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}> 
    <BrowserRouter>
    <Navbar />
    <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
