import React, {useContext} from 'react'
import {LoginContext} from '../usecontext/logincontext'
import ErrorCard from '../Component/error/ErrorCard'
const AfterLogin = () =>{
    const {loginState, setLoginDispatch} = useContext(LoginContext)
  return(
   <>
     <h1>Welcome back {loginState.email}</h1>
     <h1>Your Password is {loginState.password}</h1>
     <h1>Your Token is {loginState.token}</h1>
     <ErrorCard message={'Test the error Card'} />
   </>
  );
}

export default AfterLogin