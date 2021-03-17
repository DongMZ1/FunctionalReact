import React, {useState, useReducer} from 'react'
import {LoginContext} from './usecontext/logincontext'
import { HashRouter as Router, Switch, Route} from 'react-router-dom'

import Topnavbar from './Topnavbar'


/* The state control for login/log out is using useContext hook to pass useReducer to child component*/ 
function loginReducer(state, action){
  switch(action.type){
    case 'login' :
      return{
        ...state,
        isLogin: action.isLogin
      }
  }

}
const App = () => {

 const[loginState, setLoginDispatch] = useReducer(loginReducer, {
   isLogin: false
 })

  return (
    <LoginContext.Provider value ={{loginState, setLoginDispatch}}>

       <Topnavbar />
      <h1>{loginState.isLogin ? <>You are not logged in, click to login</> : <>You are logged in, click to log out</>}</h1>
      <button onClick={()=>setLoginDispatch({type:'login', isLogin: true})}>Click to login</button>
      <button onClick={()=>setLoginDispatch({type:'login', isLogin: false})}>Click to log out</button>


    </LoginContext.Provider>
  );
}

export default App;
