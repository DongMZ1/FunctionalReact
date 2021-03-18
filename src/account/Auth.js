import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const Auth = ({loginState, setLoginDispatch}) => {
    const [LoginOrSignup, setLoginOrSignup] = useState(true)
    const handlelogin =()=>{

    }

    let page;
    {/*if not login, then login page or sign up page, else display the account imformation and sign out button*/}
    if(!loginState.isLogin){
        if(LoginOrSignup){
        page = 
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
  
  <Button style={{padding : "10px"}} variant="primary" type="submit" onClick={handlelogin}>
    Submit
  </Button>

  <Button style={{padding : "10px"}} variant="primary">
    Do not have an account? Click to create one!
  </Button>
</Form>
     </>
        }
    }else{
        page = <>
        
        </>
    }

    
      return(
          <>
          {page}
          </>
      )

}

export default Auth