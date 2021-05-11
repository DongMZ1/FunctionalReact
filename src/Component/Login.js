import React, {useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useForm} from '../costumhooks/useForm'
import {Loginvalidator, Signupvalidator} from '../Validator/formvalidator'
import {useHistory} from 'react-router-dom'
import {LoginContext} from '../usecontext/logincontext'

const Login = ({setshowerrorcard, seterrorcardmessage, setLoginOrSignup}) =>{
    const {loginState, setLoginDispatch} = useContext(LoginContext)

    const history = useHistory();

    const [loginformdata, loginformstatedispatch, loginhandleinputchange] = useForm({email: '', password : ''})

    const [loginformdataerror, loginformdataisvalid] = Loginvalidator(loginformdata)
    
    
    const handlelogin =
     async (event) =>{
      event.preventDefault();
     const response = await fetch(
        'https://mernshoppingminiso.herokuapp.com/api/user/login', 
        {method: 'POST', body: JSON.stringify(loginformdata), 
        headers: {'Content-Type': 'application/json;charset=utf-8'}}
       )
       const responseData = await response.json();

       if(response.ok) {
       setLoginDispatch({
          type: 'login',
          email: loginformdata.email,
          token: responseData.token,
          isLogin: true,
          productcart: responseData.productcart,
          productordering: responseData.productordering,
          productfinished: responseData.productfinished
        })
        localStorage.setItem('token', responseData.token);
        history.push(`/Auth/${responseData.email}`);
      }

      if(!response.ok){
        seterrorcardmessage(responseData.message);
        setshowerrorcard(true);
      }
      
    }
    
    /*Login form------------------------------------------------------- */
    
    return  <>
        <br />
        <br />
        <Form style={{paddingLeft:"20%", paddingRight:"20%"}}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" name="email" placeholder="Enter email" onChange={loginhandleinputchange} />
    <Form.Text className="text-muted">
      {!loginformdataisvalid && loginformdataerror.email}
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name="password" placeholder="Password" onChange={loginhandleinputchange} />
    <Form.Text className="text-muted">
      {!loginformdataisvalid && loginformdataerror.password}
    </Form.Text>
  </Form.Group>
  
  {/*Start Button for sign in ---------------------------------------------------------- */}

  <Button style={{marginLeft : "5%px"}} variant="primary" type="submit" onClick={handlelogin} disabled={!loginformdataisvalid}>
    SIGN IN
  </Button>
  {/*end Button for sign in ---------------------------------------------------------- */}

   {/*Start Button for switch to signup page ---------------------------------------------------------- */}
  <Button style={{marginLeft:"5%"}} variant="primary" onClick={() => setLoginOrSignup(false)}>
    Do not have an account? Click to create one!
  </Button>
  {/*end Button for switch to signup page ---------------------------------------------------------- */}

  
</Form>
     </>
     /*end of Login form------------------------------------------------------- */

}

export default Login;