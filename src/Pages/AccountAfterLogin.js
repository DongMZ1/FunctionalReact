import React, {useContext} from 'react'
import {LoginContext} from '../usecontext/logincontext'
import {Container} from 'react-bootstrap'
const AfterLogin = () =>{
    const {loginState, setLoginDispatch} = useContext(LoginContext)
  return(
   <Container style={{margin:'5%', fontFamily:'sans-serif'}}>
     <h1>Welcome {loginState.email}</h1>
     Your Token is {loginState.token}
     </Container>
  );
}

export default AfterLogin