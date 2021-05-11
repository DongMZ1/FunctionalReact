import React, {useState, useContext} from 'react'
import AfterLogin from './AccountAfterLogin'
import {useHistory} from 'react-router-dom'
import {LoginContext} from '../usecontext/logincontext'
import Signup from '../Component/Signup'
import Login from '../Component/Login'

const Auth = ({setshowerrorcard, seterrorcardmessage}) => {
    const {loginState, setLoginDispatch} = useContext(LoginContext)

    const history = useHistory();

   /*check if it is in the login page or sign up page, login page return true, sign up page return false*/
    const [LoginOrSignup, setLoginOrSignup] = useState(true);

       
      if(!loginState.isLogin){
        return <>
            {LoginOrSignup && 
            <Login 
            setshowerrorcard={setshowerrorcard}
            seterrorcardmessage={seterrorcardmessage}
            setLoginOrSignup={setLoginOrSignup}
            />
            }
            {!LoginOrSignup && <Signup 
            setshowerrorcard={setshowerrorcard}
            seterrorcardmessage={seterrorcardmessage}
            setLoginOrSignup={setLoginOrSignup}
            />}
        </>
      }

      return(
          <AfterLogin setshowerrorcard={setshowerrorcard} seterrorcardmessage={seterrorcardmessage} />
      )

}

export default Auth