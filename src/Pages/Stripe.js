import React, {useContext} from 'react'
import {LoginContext} from '../usecontext/logincontext'
const Stripe = () => {
  const {loginState, setLoginDispatch} = useContext(LoginContext);
    return (
        <div>
            stripe page
        </div>
    )
}

export default Stripe
