import React, {useContext} from 'react'
import {LoginContext} from '../usecontext/logincontext'
const AfterLogin = () =>{
    const {loginState, setLoginDispatch} = useContext(LoginContext)
  return(
   <>
     <h1>Welcome back</h1>
   </>
  );
}

export default AfterLogin