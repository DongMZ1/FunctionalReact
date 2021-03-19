import React, {useContext} from 'react'
import {LoginContext} from '../usecontext/logincontext'
const AfterLogin = () =>{
    const {loginState, setLoginDispatch} = useContext(LoginContext)
  return(
   <>
     <h1>Welcome back {loginState.email}</h1>
     <h1>Your Pasword is {loginState.password}</h1>
   </>
  );
}

export default AfterLogin