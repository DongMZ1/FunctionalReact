import React, {useState, useReducer} from 'react'
import {LoginContext} from './usecontext/logincontext'
import { BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'


/*Component */
import HomePage from './HomePage'
import Auth from './account/Auth'
import Topnavbar from './Topnavbar'
import Errorhandlepage from './Errorhandlepage'


/* The state control for login/log out is using useContext hook to pass useReducer to child component*/ 
function loginReducer(state, action){
  switch(action.type){
    case 'login' :
      return{
        ...state,
        isLogin: action.isLogin,
        email: action.email,
        token: action.token
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

       
  }

}
const App = () => {

 const[loginState, setLoginDispatch] = useReducer(loginReducer, {
   isLogin: false,
   LoginOrSignup: true,
   token: null
 })
 

 const router = (
   
  <Switch>
   <Route path={"/"} exact>
   <HomePage loginState={loginState} setLoginDispatch={setLoginDispatch} />
   </Route>

  <Route path={'/Auth/' + loginState.email} exact>
  <Auth loginState={loginState} setLoginDispatch={setLoginDispatch} />
  </Route>

  <Route path='/*' exact>
  <Errorhandlepage />
  </Route>
  </Switch>


)

  return (
<Router>
    <LoginContext.Provider value ={{loginState, setLoginDispatch}}>
      <Topnavbar loginState={loginState} setLoginDispatch={setLoginDispatch} />
      {router}
    </LoginContext.Provider>
    </Router>

  );
}

export default App;
