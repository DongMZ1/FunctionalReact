import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import useForm from '../costumhooks/useForm'
import AfterLogin from './AfterLogin'
import {Loginvalidator, Signupvalidator} from '../validator/formvalidator'
import {useHistory} from 'react-router-dom'

const Auth = ({loginState, setLoginDispatch}) => {
    const history = useHistory();
    const [signupformdata, signupformstatedispatch, signuphandleinputchange] = useForm({email: '', password : ''})
    const [signuperror, signupisvalid] = Signupvalidator(signupformdata)

    const handlesignup = () =>{
      if(signupisvalid){
      setLoginOrSignup(true);
      }
    }



    const [LoginOrSignup, setLoginOrSignup] = useState(true);
    const [loginformdata, loginformstatedispatch, loginhandleinputchange] = useForm({email: '', password : ''})

    /*check if it is in the login page or sign up page, login page return true, sign up page return false*/
    const [loginerror, loginisvalid] = Loginvalidator(loginformdata)
    
    
    const handlelogin = async () =>{
      if(loginisvalid){
        setLoginDispatch({
          type: 'user',
          email: loginformdata.email,
          password: loginformdata.password
        })
        setLoginDispatch({
          type: 'login',
          isLogin: true
        })
        history.push('/Auth/' + (loginformdata.email))
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

  <Button style={{marginLeft:"5%"}} variant="primary" onClick={() => setLoginOrSignup(false)}>
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
    <Form.Control type="email" name="email" placeholder="Enter email" onChange={signuphandleinputchange} />
    <Form.Text className="text-muted">
      {!signupisvalid && signuperror.email}
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name="password" placeholder="Password" onChange={signuphandleinputchange} />
    <Form.Text className="text-muted">
      {!signupisvalid && signuperror.password}
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Please enter the same password for validation </Form.Label>
    <Form.Control type="password" name="passwordrepeat" placeholder="Password" onChange={signuphandleinputchange} />
    <Form.Text className="text-muted">
      {!signupisvalid && signuperror.password}
    </Form.Text>
  </Form.Group>
  
  {/*if password is not matching, then disable  */}
  
  <Button style={{marginLeft : "5%px"}} variant="primary" type="submit" onClick={handlesignup} disabled={!signupisvalid}>
    SIGN UP
  </Button>

  <Button style={{marginLeft:"5%"}} variant="primary" onClick={() => setLoginOrSignup(true)}>
    Already have an account? Click to sign in!
  </Button>
</Form>
          </>
          )



    
      return(
          <>
          {LoginOrSignup && loginpage}
          {!LoginOrSignup && signuppage}
          
          {loginState.isLogin && <AfterLogin />}

          </>
      )

}

export default Auth