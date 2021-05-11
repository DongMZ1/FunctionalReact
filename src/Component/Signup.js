import React, {useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useForm} from '../costumhooks/useForm'
import {Loginvalidator, Signupvalidator} from '../Validator/formvalidator'
import {useHistory} from 'react-router-dom'
import {LoginContext} from '../usecontext/logincontext'

const Signup = ({setshowerrorcard, seterrorcardmessage, setLoginOrSignup}) =>{

    const {loginState, setLoginDispatch} = useContext(LoginContext)

    const history = useHistory();

        /*signup form data and signup validator */
        const [signupformdata, signupformstatedispatch, signuphandleinputchange] = useForm({email: '', password : ''})
        const [signupformdataerror, signupformdataisvalid] = Signupvalidator(signupformdata)
       
      
        const handlesignup = async (event) =>{
             event.preventDefault();
            const response = await fetch(
               'https://mernshoppingminiso.herokuapp.com/api/user/signup', 
               {method: 'POST', body: JSON.stringify(signupformdata), 
               headers: {'Content-Type': 'application/json;charset=utf-8'}}
              )
              const responseData = await response.json();
       
              if(response.ok) {
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
       
             if(!response.ok){
               seterrorcardmessage(responseData.message);
               setshowerrorcard(true);
             }
            };

            /*sign up page */

    return <>
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
}

export default Signup;