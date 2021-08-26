import React, { useState, useContext } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import AfterLogin from './AccountAfterLogin'
import { useHistory } from 'react-router-dom'
import { LoginContext } from '../usecontext/logincontext'
import Signup from '../Component/Signup'
import Login from '../Component/Login'

const Auth = ({ setshowerrorcard, seterrorcardmessage, innerWidth, setshowshoppingcart }) => {
  const { loginState, setLoginDispatch } = useContext(LoginContext)

  const history = useHistory();

  /*check if it is in the login page or sign up page, login page return true, sign up page return false*/
  const [LoginOrSignup, setLoginOrSignup] = useState(true);


  if (!loginState.isLogin) {
    return <div className='min-height-25rem'>
    <Row className='justify-content-center mx-4'>
      <Col sm={3} className='px-3'>
         <div className='mt-100p blue-color'>
           <h5>Welcome to</h5>
           <h6>Mingzhou Shopping Center</h6>
           <div className='font-14p'>Mingzhou Shopping Center is a Toy e-commerce company headquartered in Montreal, Quebec, Canada.
           You are free to buy whatever you want in this shopping site with a fake credit card but nothing will ship to you.
           </div>
         </div>
      </Col>
      <Col sm={3} className='px-3'>
      {LoginOrSignup ?
        <Login
          innerWidth={innerWidth}
          setshowerrorcard={setshowerrorcard}
          seterrorcardmessage={seterrorcardmessage}
          setLoginOrSignup={setLoginOrSignup}
        />
        :
        <Signup
          innerWidth={innerWidth}
          setshowerrorcard={setshowerrorcard}
          seterrorcardmessage={seterrorcardmessage}
          setLoginOrSignup={setLoginOrSignup}
        />}
        </Col>
    </Row>
    </div>  
  }

  return (
    <AfterLogin innerWidth={innerWidth} setshowshoppingcart={setshowshoppingcart} setshowerrorcard={setshowerrorcard} seterrorcardmessage={seterrorcardmessage} />
  )

}

export default Auth