import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import useForm from '../costumhooks/useForm'
import AfterLogin from './AfterLogin'
import {Loginvalidator} from '../Validator/formvalidator'

const Auth = ({loginState, setLoginDispatch}) => {

    const [signupformdata, signupformstatedispatch, signuphandleinputchange] = useForm({email: '', password : ''})
    const handlesignup = () =>{
      setLoginDispatch({type: 'LoginOrSignup', LoginOrSignup: true});
    }


    const [loginformdata, loginformstatedispatch, loginhandleinputchange] = useForm({email: '', password : ''})
    /*check if it is in the login page or sign up page, login page return true, sign up page return false*/
    const [loginerror, loginisvalid] = Loginvalidator(loginformdata)
    const handlelogin =()=>{
      if(loginisvalid){
        setLoginDispatch({
          type: 'user',
          email: loginformdata.email,
          password: loginformdata.password
        })
        setLoginDispatch({type: 'login', isLogin: true});
      }
    }
    
    
    const loginpage = (!loginState.isLogin &&
        <>
        <br />
        <br />
        <Form style={{paddingLeft:"20%", paddingRight:"40%"}}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" name="email" placeholder="Enter email" onChange={loginhandleinputchange} />
    <Form.Text className="text-muted">
      {!loginisvalid && loginerror.email}
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name="password" placeholder="Password" onChange={loginhandleinputchange} />
    <Form.Text className="text-muted">
      {!loginisvalid && loginerror.password}
    </Form.Text>
  </Form.Group>
  
  <Button style={{marginLeft : "5%px"}} variant="primary" type="submit" onClick={handlelogin}>
    SIGN IN
  </Button>

  <Button style={{marginLeft:"5%"}} variant="primary" onClick={() => setLoginDispatch({type: 'LoginOrSignup', payload: false})}>
    Do not have an account? Click to create one!
  </Button>
</Form>
     </>
    )
       
        {/*sign up page */}

          const signuppage =( !loginState.isLogin && <>
          <br />
          <br />
          <Form style={{paddingLeft:"20%", paddingRight:"40%"}}>


  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" name="emailsignup" placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name="passwordsignup" placeholder="Password" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Please enter the same password for validation </Form.Label>
    <Form.Control type="password" name="passwordsignup" placeholder="Password" />
  </Form.Group>
  
  <Button style={{marginLeft : "5%px"}} variant="primary" type="submit" onClick={handlesignup}>
    SIGN UP
  </Button>

  <Button style={{marginLeft:"5%"}} variant="primary" onClick={() => setLoginDispatch({type: 'LoginOrSignup', payload: true})}>
    Already have an account? Click to sign in!
  </Button>
</Form>
          </>
          )



    
      return(
          <>
          {loginState.LoginOrSignup && loginpage}
          {!loginState.LoginOrSignup && signuppage}
          
          {loginState.isLogin && <AfterLogin />}

          </>
      )

}

export default Auth