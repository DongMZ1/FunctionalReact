import React, {useState, useReducer} from 'react'
import {LoginContext} from './usecontext/logincontext'
import { HashRouter as Router, Switch, Route} from 'react-router-dom';


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
    /*Pass LoginState and SetLoginState as an object to usecontext hook for manage content showing*/ 
    <LoginContext.Provider value ={{loginState, setLoginDispatch}}>
      <h1>{loginState.isLogin ? <>U are not login, click to login</> : <>U are logined, click to login out</>}</h1>
      <button onClick={()=>setLoginDispatch({type:'login', isLogin: true})}>Click to login</button>
      <button onClick={()=>setLoginDispatch({type:'login', isLogin: false})}>Click to log out</button>


    </LoginContext.Provider>
  );
}

export default App;
