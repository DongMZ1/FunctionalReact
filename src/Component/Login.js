import React, {useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useForm} from '../costumhooks/useForm'
import {Loginvalidator, Signupvalidator} from '../Validator/formvalidator'
import {useHistory} from 'react-router-dom'
import {LoginContext} from '../usecontext/logincontext'

const Login = ({setshowerrorcard, seterrorcardmessage, setLoginOrSignup, innerWidth}) =>{
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
    
    return  <div className={(innerWidth > 768 && 'mt-100p')}>
    <input className='input-field bold blue-color font-14p px-3' type="email" name="email" placeholder="Email" onChange={loginhandleinputchange} />
    <div className="font-12p min-height-12p blue-color ml-2 bold mb-1">
      {!loginformdataisvalid && loginformdataerror.email}
    </div>
  
    
    <input className='input-field bold blue-color font-14p px-3' type="password" name="password" placeholder="Password" onChange={loginhandleinputchange} />
    <div className="font-12p min-height-12p blue-color ml-2 bold mb-1">
      {!loginformdataisvalid && loginformdataerror.password}
    </div>
  
  {/*Start Button for sign in ---------------------------------------------------------- */}
     {
        loginformdataisvalid? <div className='blue-bg cursor-pointer width-max-content font-14p mb-1 rounder-border white-color bold px-2 py-1' onClick={handlelogin}>SIGN IN</div>
         : <div className='blue-bg width-max-content opacity-0-5 font-14p bold white-color mb-1 rounder-border px-2 py-1'>SIGN IN</div>
      }
  {/*end Button for sign in ---------------------------------------------------------- */}

   {/*Start Button for switch to signup page ---------------------------------------------------------- */}
  <div className='blue-bg width-max-content cursor-pointer font-14p bold white-color rounder-border px-2 py-1' onClick={() => setLoginOrSignup(false)}>
    Do not have an account? Click to create one!
  </div>
  {/*end Button for switch to signup page ---------------------------------------------------------- */}

     </div>
     /*end of Login form------------------------------------------------------- */

}

export default Login;