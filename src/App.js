import React, {useState, useReducer} from 'react'
import {LoginContext} from './usecontext/logincontext'
import { HashRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './HomePage'
import Auth from './Auth'

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

 const router = (<Router>
 <Switch>
   <Route path={"/HomePage"} 
  component={HomePage} exact />

  <Route path={"/Auth"}
   render={() => <Auth loginState={loginState} setLoginDispatch={setLoginDispatch} />} exact /> 


</Switch>

</Router>)

  return (
    <LoginContext.Provider value ={{loginState, setLoginDispatch}}>
      <Topnavbar />
      {router}
    </LoginContext.Provider>
  );
}

export default App;
