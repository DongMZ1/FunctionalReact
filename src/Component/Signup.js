import React, { useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from '../costumhooks/useForm'
import { Loginvalidator, Signupvalidator } from '../Validator/formvalidator'
import { useHistory } from 'react-router-dom'
import { LoginContext } from '../usecontext/logincontext'

const Signup = ({ setshowerrorcard, seterrorcardmessage, setLoginOrSignup, innerWidth }) => {

  const { loginState, setLoginDispatch } = useContext(LoginContext)

  const history = useHistory();

  /*signup form data and signup validator */
  const [signupformdata, signupformstatedispatch, signuphandleinputchange] = useForm({ email: '', password: '' })
  const [signupformdataerror, signupformdataisvalid] = Signupvalidator(signupformdata)


  const handlesignup = async (event) => {
    event.preventDefault();
    const response = await fetch(
      'https://mernshoppingminiso.herokuapp.com/api/user/signup',
      {
        method: 'POST', body: JSON.stringify(signupformdata),
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
      }
    )
    const responseData = await response.json();

    if (response.ok) {
      setLoginDispatch({
        type: 'login',
        email: signupformdata.email,
        token: responseData.token,
        isLogin: true,
        productcart: [],
        productordering: [],
        productfinished: []
      })
      localStorage.setItem('token', responseData.token);
      history.push(`/Auth/${responseData.email}`);
    }

    if (!response.ok) {
      seterrorcardmessage(responseData.message);
      setshowerrorcard(true);
    }
  };

  /*sign up page */

  return <div className={(innerWidth > 768 && 'mt-100p')}>
      <input className='input-field font-14p px-3' type="email" name="email" placeholder="Email" onChange={signuphandleinputchange} />
      <div className="font-12p min-height-12p blue-color ml-2 bold mb-1">
        {!signupformdataisvalid && signupformdataerror.email}
      </div>
      <input className='input-field font-14p px-3' type="password" name="password" placeholder="Password" onChange={signuphandleinputchange} />
      <div className="font-12p min-height-12p blue-color ml-2 bold mb-1">
        {!signupformdataisvalid && signupformdataerror.password}
      </div>

        <input className='input-field font-14p px-3' type="password" name="passwordrepeat" placeholder="Password" onChange={signuphandleinputchange} />
        <div className="font-12p min-height-12p blue-color bold ml-2 mb-1">
          {!signupformdataisvalid && signupformdataerror.password}
        </div>

      {/*if password is not matching, then disable  */}

      {/*Start Button for sign up ---------------------------------------------------------- */}
      {
        signupformdataisvalid? <div className='blue-bg cursor-pointer width-max-content font-14p mb-1 rounder-border white-color bold px-2 py-1' onClick={handlesignup}>Sign up</div>
         : <div className='blue-bg width-max-content opacity-0-5 font-14p bold white-color mb-1 rounder-border px-2 py-1'>Sign up</div>
      }

      {/*End Button for sign up ---------------------------------------------------------- */}

      {/*Start Button for switch to sign in page ---------------------------------------------------------- */}
      <div className='blue-bg width-max-content cursor-pointer font-14p bold white-color rounder-border px-2 py-1' onClick={() => setLoginOrSignup(true)}>
        Already have an account? Click to sign in!
      </div>
      {/*END Button for switch to sign in page ---------------------------------------------------------- */}
  </div>
}

export default Signup;