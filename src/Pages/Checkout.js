import React, { useContext, useState } from "react";
import { LoginContext } from "../usecontext/logincontext";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import ErrorCard from "../Component/error/ErrorCard";
import {useHistory} from 'react-router-dom'
const Checkout = () => {
  const history = useHistory();
  const { loginState, setLoginDispatch } = useContext(LoginContext);

  const [showerror, setshowerror] = useState(false);
  const [errormessage, seterrormessage] = useState("");

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

  const productlist = loginState.productcart.filter(
    (product) => product.checked === true
  ).map(product => ({
    title: product.title,
    price: product.price,
    number: product.number
  }));

  const productjsx = loginState.productcart
    .filter((product) => product.checked === true)
    .map((product) => (
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-2">
            <img
              style={{ height: "100px" }}
              src={`/${product.url}`}
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              PRODUCT NAME : "{product.title}"
              <br />
              price : {product.price} $
              <span style={{ paddingLeft: "10%" }}>
                Number: {product.number}
              </span>
              <span style={{ paddingLeft: "10%" }}>
                subtotal: {product.number * product.price} $
              </span>
            </div>
          </div>
        </div>
      </div>
    ));

  const handleToken = async (token) => {
    const response = await fetch("/user/createcheckout", {
      method: "POST",
      body: JSON.stringify({
        token: token,
        email: loginState.email,
        totalprice: totalprice.toFixed(2),
        productlist: productlist
      }),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    const responseData = await response.json();
    /*if not success, then send an error message */
    if (!response.ok) {
      seterrormessage(responseData.message);
      setshowerror(true);
    }
    /*if success, tell the user, then redirect to homepage */
    if(response.ok){
      const res = await fetch('/user/getproductlist', {
        method: 'POST',
        body: JSON.stringify({
          email: loginState.email
        }),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      })
      const resData = await res.json();
      setLoginDispatch({type: 'addcart', products: resData.productcart});
      setLoginDispatch({type: 'addorder', products: resData.productordering});
      setshowsuccess(true);
    }


  };

  return (
    <div>
      {productjsx}
      <StripeCheckout
        stripeKey="pk_test_51IhmDWJmnqfDDj8MXwauIMMXW72ZmiFzlNMpxcc22Cvws6ce08QnLQlgbcyI7cgUSJxMuqjxHy3oBuMhGTuWVxAX00NxuYpL09"
        token={handleToken}
        amount={totalprice.toFixed(2) * 100}
        name={`Pay ${totalprice.toFixed(2)} $ for your ORDER`}
        billingAddress
        shippingAddress
      />
      <Link to={"/"}>
        <Button style={{ marginLeft: "5%" }}>Back to HomePage</Button>
      </Link>
      <span style={{ marginLeft: "5%" }}>
        TOTAL : {totalprice.toFixed(2)} $ + (GST/QST {totalprice.toFixed(2)}
        *0.15) = {(totalprice * 1.15).toFixed(2)} $
      </span>
      <br />
      <ErrorCard
        show={showerror}
        setshow={setshowerror}
        message={errormessage}
      />
      {showsuccessmodal}
    </div>
  );
};

export default Checkout;
