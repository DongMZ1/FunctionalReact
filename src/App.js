import React, { useState, useReducer, useEffect } from "react";
import { LoginContext } from "./usecontext/logincontext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { Modal, Button, Card } from "react-bootstrap";

/*Component */
import HomePage from "./Pages/HomePage";
import Auth from "./Pages/Auth";
import Topnavbar from "./Topnavbar";
import Errorhandlepage from "./Pages/Errorhandlepage";



/* The state control for login/log out is using useContext hook to pass useReducer to child component*/
function loginReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLogin: action.isLogin,
        email: action.email,
        token: action.token,
        productcart: action.productcart,
        productordering: action.productordering,
        productfinished: action.productfinished,
      };
    case "addcart":
      return {
        ...state,
        productcart: action.products,
      };
    case "addorder":
      return {
        ...state,
        productordering: action.products,
      };
    case "addorderhistory":
      return {
        ...state,
        productfinished: action.products,
      };
  }
}






const App = () => {
  const [showshoppingcart, setshowshoppingcart] = useState(false);

  const [loginState, setLoginDispatch] = useReducer(loginReducer, {
    isLogin: false,
    LoginOrSignup: true,
    token: null,
    productcart: [],
    productordering: [],
    productfinished: [],
  });



  const router = (
    <Switch>
      <Route path={"/"} exact>
        <HomePage loginState={loginState} setLoginDispatch={setLoginDispatch} setshowshoppingcart={setshowshoppingcart} />
      </Route>

      <Route path={"/Auth/*"} exact>
        <Auth />
      </Route>

      <Route path="/*" exact>
        <Errorhandlepage />
      </Route>
    </Switch>
  );

  /*similar to redux-logger, printout my 'store' everytime if my store updated */

  useEffect(async () => {
    console.log(JSON.stringify(loginState));
  }, [loginState]);





  let totalprice = loginState.productcart.map(product => {return product.price*product.number;}).reduce(
    (accu, current) => {return accu+current},0
  )



  let shoppingitemlist =
  <> 
  {loginState.productcart.map(product =>
    <div className="card mb-3">
    <div className="row g-0">
      <div className="col-md-2">
        <img style={{height: '100px'}} src={`/${product.url}`} alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          PRODUCT NAME : "{product.title}" 
          <br />
          price : {product.price}
          <span style={{paddingLeft:'10%'}}> 


          <Button onClick = {
            async () =>{
              const response = await fetch(
                "/user/removeproductfromcart",
                {
                  method: "POST",
                  body: JSON.stringify({
                    email: loginState.email,
                    title: product.title,
                  }),
                  headers: { "Content-Type": "application/json;charset=utf-8" },
                }
              );
          
              const responseData = await response.json();
              setLoginDispatch({ type: "addcart", products: responseData.data });
            }
          }>DECREASE</Button>


           {product.number} 
           <Button onClick={
            async () =>{
              const response = await fetch(
                "/user/addproducttocart",
                {
                  method: "POST",
                  body: JSON.stringify({
                    email: loginState.email,
                    title: product.title,
                  }),
                  headers: { "Content-Type": "application/json;charset=utf-8" },
                }
              );
          
              const responseData = await response.json();
              setLoginDispatch({ type: "addcart", products: responseData.data });
            }
           }>INCREASE</Button>

            <span style={{marginLeft:'10%'}}>
            <input onChange={

             async (e) => {
                   let response = await fetch('/user/selectitemonchange', {
                     method: 'POST',
                     body: JSON.stringify({email: loginState.email, title: product.title, checked: e.target.checked}),
                     headers: { "Content-Type": "application/json;charset=utf-8" },
                   });
                   let responseData = await response.json(); 
                   setLoginDispatch({ type: "addcart", products: responseData.data });
              }

            }
            className="form-check-input" type="checkbox" checked={product.checked} id="flexCheckDefault" />
            <label className="form-check-label" for="flexCheckChecked">
                  Select
            </label>
            </span>

          </span>
        </div>
      </div>
    </div>
    </div>
    )}
    </>





  const shoppingcart = (
    <Modal
      show={showshoppingcart}
      onHide={() => setshowshoppingcart(false)}
      dialogClassName="modal-90w"
      size="lg"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Shopping Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {/*start of items in cart */} 
     {loginState.productcart.length === 0 ? 'Shopping Cart is Empty' : shoppingitemlist} 
{/*end of items in cart */}

      </Modal.Body>
      <Modal.Footer>
    TOTAL: {totalprice.toFixed(2)} <Button style={{marginLeft:"10%", marginRight:"10%"}} variant="primary">Check Out</Button>
  </Modal.Footer>
    </Modal>
  );



  

  return (
    <Router>
      <LoginContext.Provider value={{ loginState, setLoginDispatch }}>
        <Topnavbar
          loginState={loginState}
          setLoginDispatch={setLoginDispatch}
          setshowshoppingcart={setshowshoppingcart}
        />
        {router}
        {shoppingcart}
      </LoginContext.Provider>
    </Router>
  );
};


export default App;
