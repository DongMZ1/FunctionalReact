import React, {useState, useRef, useCallback, useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useForm} from '../costumhooks/useForm'
import AfterLogin from './AfterLogin'
import {Loginvalidator, Signupvalidator} from '../validator/formvalidator'
import {useHistory} from 'react-router-dom'
import ErrorCard from '../Component/error/ErrorCard'
import axios from 'axios'
import {LoginContext} from '../usecontext/logincontext'

const Auth = () => {
    const {loginState, setLoginDispatch} = useContext(LoginContext)
    /*error handling */
    const [showerrorcard, setshowerrorcard] = useState(false);
    const [errorcardmessage, seterrorcardmessage] = useState('');

    const history = useHistory();

    /*signup form data and signup validator */
    const [signupformdata, signupformstatedispatch, signuphandleinputchange] = useForm({email: '', password : ''})
    const [signupformdataerror, signupformdataisvalid] = Signupvalidator(signupformdata)
   
  
    const handlesignup = async (event) =>{
         event.preventDefault();
        const response = await fetch(
           'http://localhost:5000/user/signup', 
           {method: 'POST', body: JSON.stringify(signupformdata), 
           headers: {'Content-Type': 'application/json;charset=utf-8'}}
          )
          const responseData = await response.json();
   
          if(response.ok) {
          setLoginDispatch({
             type: 'login',
             email: signupformdata.email,
             token: responseData.token,
             isLogin: true
           })
           history.push('/')
         }
   
         if(!response.ok){
           seterrorcardmessage(responseData.message);
           setshowerrorcard(true);
         }
        }
    

          
        
  
       
     


    const [LoginOrSignup, setLoginOrSignup] = useState(true);
    const [loginformdata, loginformstatedispatch, loginhandleinputchange] = useForm({email: '', password : ''})

    /*check if it is in the login page or sign up page, login page return true, sign up page return false*/
    const [loginerror, loginisvalid] = Loginvalidator(loginformdata)
    
    
    const handlelogin =
     async (event) =>{
      event.preventDefault();
     const response = await fetch(
        'http://localhost:5000/user/login', 
        {method: 'POST', body: JSON.stringify(loginformdata), 
        headers: {'Content-Type': 'application/json;charset=utf-8'}}
       )
       const responseData = await response.json();

       if(response.ok) {
       setLoginDispatch({
          type: 'login',
          email: loginformdata.email,
          token: responseData.token,
          isLogin: true
        })
        history.push('/')
      }

      if(!response.ok){
        seterrorcardmessage(responseData.message);
        setshowerrorcard(true);
      }
      
    }
    
    /*Login page */
    
    let loginpage = 
        <>
        <br />
        <br />
        <Form style={{paddingLeft:"20%", paddingRight:"20%"}}>
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

       



    /*sign up page */

    let signuppage = <>
      <br />
      <br />
      <Form style={{paddingLeft:"20%", paddingRight:"20%"}}>


<Form.Group controlId="formBasicEmail">
<Form.Label>Email address</Form.Label>
<Form.Control type="email" name="email" placeholder="Enter email" onChange={signuphandleinputchange} />
<Form.Text className="text-muted">
  {!signupformdataisvalid && signupformdataerror.email}
</Form.Text>
</Form.Group>

<Form.Group controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<Form.Control type="password" name="password" placeholder="Password" onChange={signuphandleinputchange} />
<Form.Text className="text-muted">
  {!signupformdataisvalid && signupformdataerror.password}
</Form.Text>
</Form.Group>

<Form.Group controlId="formBasicPassword">
<Form.Label>Please enter the same password for validation </Form.Label>
<Form.Control type="password" name="passwordrepeat" placeholder="Password" onChange={signuphandleinputchange} />
<Form.Text className="text-muted">
  {!signupformdataisvalid && signupformdataerror.password}
</Form.Text>
</Form.Group>

{/*if password is not matching, then disable  */}

<Button style={{marginLeft : "5%px"}} variant="primary" type="submit" onClick={handlesignup} disabled={!signupformdataisvalid}>
SIGN UP
</Button>

<Button style={{marginLeft:"5%"}} variant="primary" onClick={() => setLoginOrSignup(true)}>
Already have an account? Click to sign in!
</Button>
</Form>
      </>
      




      if(!loginState.isLogin){
        return <>
            {LoginOrSignup && loginpage}
            {!LoginOrSignup && signuppage}
            <ErrorCard show={showerrorcard} message={errorcardmessage} setshow={setshowerrorcard} />
        </>
      }

      return(
          <AfterLogin />
      )

}

export default Auth