import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const Auth = ({loginState, setLoginDispatch}) => {
    const [LoginOrSignup, setLoginOrSignup] = useState(true)
    const handlelogin =()=>{

    }

    const handlesignup = () =>{
      setLoginOrSignup(true);
    }

    let beforelogin = null;
    {/*if not login, then login page or sign up page, else display the account imformation and sign out button*/}
    if(!loginState.isLogin){
        if(LoginOrSignup){
        beforelogin = 
        <>
        <br />
        <br />
        <Form style={{paddingLeft:"20%", paddingRight:"50%"}}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" name="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" name="password" placeholder="Password" />
  </Form.Group>
  
  <Button style={{marginLeft : "5%px"}} variant="primary" type="submit" onClick={handlelogin}>
    SIGN IN
  </Button>

  <Button style={{marginLeft:"5%"}} variant="primary" onClick={() => setLoginOrSignup(false)}>
    Do not have an account? Click to create one!
  </Button>
</Form>
     </>
        }else{
        {/*sign up page */}
          beforelogin = <>
          <Form style={{paddingLeft:"20%", paddingRight:"50%"}}>


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

  <Button style={{marginLeft:"5%"}} variant="primary" onClick={() => setLoginOrSignup(true)}>
    Already have an account? Click to sign in!
  </Button>
</Form>
          </>
      }
    }


    
      return(
          <>
          {beforelogin}
          </>
      )

}

export default Auth