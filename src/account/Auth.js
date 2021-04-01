import React, {useState, useRef, useCallback} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useForm} from '../costumhooks/useForm'
import {useHttpClient} from '../costumhooks/http-hook'
import AfterLogin from './AfterLogin'
import {Loginvalidator, Signupvalidator} from '../validator/formvalidator'
import {useHistory} from 'react-router-dom'
import ErrorCard from '../Component/error/ErrorCard'

const Auth = ({loginState, setLoginDispatch}) => {
    const [showerrorcard, setshowerrorcard] = useState(false);
    const history = useHistory();
    const [signupformdata, signupformstatedispatch, signuphandleinputchange] = useForm({email: '', password : ''})
    const [signuperror, signupisvalid] = Signupvalidator(signupformdata)
   

    const [ httpisLoading, httperror, httpsetError, httpsendRequest, httpclearError] = useHttpClient();
    const handlesignup =
      async () =>{
        /*if signup is valid, which is in the sign up page, then signup */
        if(signupisvalid){
             const responsedata = await
              httpsendRequest('http://localhost:5000/user/signup',
                                    'POST',
                                     JSON.stringify(signupformdata),
                                     {
                                      'Content-Type': 'application/json'
                                     });
              setTimeout(()=>{}, 6000);      
             if(httperror === null){
              setLoginDispatch({type: 'login', isLogin: true, email: responsedata.email, token: responsedata.token})
             
             }else{ setshowerrorcard(true);}
              
                                              
        
          }
        }
       
     


    const [LoginOrSignup, setLoginOrSignup] = useState(true);
    const [loginformdata, loginformstatedispatch, loginhandleinputchange] = useForm({email: '', password : ''})

    /*check if it is in the login page or sign up page, login page return true, sign up page return false*/
    const [loginerror, loginisvalid] = Loginvalidator(loginformdata)
    
    
    const handlelogin = async () =>{
      if(loginisvalid){
       setLoginDispatch({
          type: 'login',
          email: loginformdata.email,
          token: null,
          isLogin: true
        })
        history.push('/Auth/' + loginformdata.email)
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



    console.log(JSON.stringify(loginState))
      return(
          <>
          {LoginOrSignup && loginpage}
          {!LoginOrSignup && signuppage}
          {showerrorcard && <ErrorCard message={httperror} />}
          The error is : {JSON.stringify(httperror)}
          <br />
          State: {JSON.stringify(loginState)}
          {loginState.isLogin && <AfterLogin />}
          Sign up is valid ? {JSON.stringify(signupisvalid)}
          <br />
          show error card is: {JSON.stringify(showerrorcard)}

          </>
      )

}

export default Auth