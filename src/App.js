import React, {useState, useReducer} from 'react'
import {LoginContext} from './usecontext/logincontext'
import { HashRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './HomePage'
import Auth from './account/Auth'

import Topnavbar from './Topnavbar'


/* The state control for login/log out is using useContext hook to pass useReducer to child component*/ 
function loginReducer(state, action){
  switch(action.type){
    case 'login' :
      return{
        ...state,
        isLogin: action.isLogin
      }
    case 'user' :
      return{
         ...state,
         email: action.email,
         password: action.password
      }
     case 'token' :
       return{
         ...state,
         token: action.payload
       } 
       case 'LoginOrSignup' :
         return{
           ...state,
           LoginOrSignup: action.payload
         }

       
  }

}
const App = () => {

 const[loginState, setLoginDispatch] = useReducer(loginReducer, {
   isLogin: false,
   LoginOrSignup: true
 })

 const router = (<Router>
 <Switch>
   <Route path={"/"} exact>
   <HomePage loginState={loginState} setLoginDispatch={setLoginDispatch} />
   </Route>

  <Route path={'/Auth'} exact>
  <Auth loginState={loginState} setLoginDispatch={setLoginDispatch} />
  </Route> 


</Switch>

</Router>)

  return (
    <LoginContext.Provider value ={{loginState, setLoginDispatch}}>
      <Topnavbar loginState={loginState} />
      {router}
    </LoginContext.Provider>
  );
}

export default App;
