import React, { useEffect, createContext, useReducer,useContext } from 'react'
import Navbar from './components/navbar'
import './App.css'
import Home from './components/screen/home'
import SignIn from './components/screen/signin'
import Profile from './components/screen/profile'
import SignUp from './components/screen/signup'
import UserProfile from './components/screen/userProfile'
import CreatePost from './components/screen/createpost'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import SubscribedPost from './components/screen/subScribedUserPost'
import {reducer,initialState} from './reducers/userReducer'
export const UserContext = createContext()


const Routing = () => {
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    console.log("user",user);
    debugger
    if(user)
    {
      dispatch({type:"USER",payload:user})
    }
    else   
    {
      history.push('/signin')
    }
  },[])
  return (
    <Switch>
      <Route exact path='/'>
        <Home></Home>
      </Route>
      <Route path='/signup'>
        <SignUp></SignUp>
      </Route>
      <Route exact path='/profile'>
        <Profile></Profile>
      </Route>
      <Route path='/signin'>
        <SignIn></SignIn>
      </Route>
      <Route path='/createpost'>
        <CreatePost></CreatePost>
      </Route>
      <Route path='/profile/:userid'>
        <UserProfile></UserProfile>
      </Route>
      <Route path='/subpost'>
        <SubscribedPost></SubscribedPost>
      </Route>


    </Switch>
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar></Navbar>
      <Routing></Routing>

    </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
