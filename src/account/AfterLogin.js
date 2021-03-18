import React, {useContext} from 'react'
import {LoginContext} from '../usecontext/logincontext'
const AfterLogin = () =>{
    const {loginState, setLoginDispatch} = useContext(LoginContext)
  return(
   <>
     {String(loginState.isLogin)}
   </>
  );
}

export default AfterLogin