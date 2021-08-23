import React, { useContext, useState } from "react";
import { LoginContext } from "../usecontext/logincontext";
import { Button, Modal } from "react-bootstrap";
import { Link, useHistory} from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
const Checkout = ({setshowerrorcard, seterrorcardmessage}) => {
  const history = useHistory();
  const { loginState, setLoginDispatch } = useContext(LoginContext);


  const [showsuccess, setshowsuccess] = useState(false);

  const showsuccessmodal =     
    <Modal show={showsuccess}>
    <Modal.Header closeButton>
      <Modal.Title>Thanks For Shopping, Your Order is Placed</Modal.Title>
    </Modal.Header>
    <Modal.Body>Check out your order in Your Account Page</Modal.Body>
    <Modal.Footer>
          <Button variant="secondary" onClick={
            ()=>{setshowsuccess(show => !show)
            history.push('/');}
            }>
            Close
          </Button>
        </Modal.Footer>
  </Modal>

  let totalprice = loginState.productcart
    .filter((product) => product.checked === true)
    .map((product) => {
      return product.price * product.number;
    })
    .reduce((accu, current) => {
      return accu + current;
    }, 0);

    /*start items user selected-------------------------------------------- */
  const productlist = loginState.productcart.filter(
    (product) => product.checked === true
  ).map(product => ({
    title: product.title,
    price: product.price,
    number: product.number
  }));
  /*end start items user selected-------------------------------------------- */

  
     /*the way to submit payment information to STRIPE----------------------- */
  const handleToken = async (token) => {
    const response = await fetch("https://mernshoppingminiso.herokuapp.com/api/user/createcheckout", {
      method: "POST",
      body: JSON.stringify({
        token: token,
        email: loginState.email,
        totalprice: (totalprice*1.15*100).toFixed(),
        productlist: productlist
      }),
      headers: { "Content-Type": "application/json;charset=utf-8",
      token: loginState.token
     },
    });
    const responseData = await response.json();
    
    /*if token is expired, the log out give user a message */
    if(response.status === 438){
      seterrorcardmessage(responseData.message);
      setshowerrorcard(true);
      localStorage.clear();
      setLoginDispatch({
        type: 'login',
        email: null,
        isLogin: false,
        token: null,
        productcart: [],
        productordering:[],
        productfinished: []
    })
    history.push('/');
 }
 /*END of token is expired*/

    /*if not success, then send an error message */
    if (!response.ok) {
      seterrorcardmessage(responseData.message);
      setshowerrorcard(true);
    }
    /*if success, tell the user, then redirect to homepage */
    if(response.ok){
      const res = await fetch('https://mernshoppingminiso.herokuapp.com/api/user/getproductlist', {
        method: 'POST',
        headers: { "Content-Type": "application/json;charset=utf-8",
      token: loginState.token },
      })
      const resData = await res.json();
      setLoginDispatch({type: 'addcart', products: resData.productcart});
      setLoginDispatch({type: 'addorder', products: resData.productordering});
      setshowsuccess(true);
    }


  };

  /*END the way to submit payment information to STRIPE----------------------- */


  return (
    <>
      <StripeCheckout
        stripeKey="pk_test_51IhmDWJmnqfDDj8MXwauIMMXW72ZmiFzlNMpxcc22Cvws6ce08QnLQlgbcyI7cgUSJxMuqjxHy3oBuMhGTuWVxAX00NxuYpL09"
        token={handleToken}
        amount={(totalprice*1.15).toFixed(2) * 100}
        name={`Pay ${(totalprice*1.15).toFixed(2)} $ for your ORDER`}
        billingAddress
        shippingAddress
      />
    {showsuccessmodal}
    </>
  );
};

export default Checkout;
