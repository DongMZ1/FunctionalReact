import React, { useState, useReducer, useEffect } from "react";
import { LoginContext } from "./usecontext/logincontext";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import './index.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
  useHistory,
} from "react-router-dom";
import { Modal, Button, Row, Col } from "react-bootstrap";
import useWindowSize from "@rooks/use-window-size"
/*Component */
import HomePage from "./Pages/HomePage";
import Auth from "./Pages/Auth";
import Topnavbar from "./Component/Topnavbar";
import Errorhandlepage from "./Pages/Errorhandlepage";
import ProductCards from "./Component/ProductCards";
import Checkout from "./Pages/Checkout";
import ErrorCard from "./Component/error/ErrorCard";
import Footer from './Component/Footer'

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
    case "localstorage":
      return action.localstorage;
  }
}

const App = () => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [showshoppingcart, setshowshoppingcart] = useState(false);

  /*error handling at top level*/
  const [showerrorcard, setshowerrorcard] = useState(false);
  const [errorcardmessage, seterrorcardmessage] = useState("");
  const [showserverstart, setshowserverstart] = useState(false);
  const history = useHistory();

  const [loginState, setLoginDispatch] = useReducer(loginReducer, {
    isLogin: false,
    LoginOrSignup: true,
    token: null,
    email: null,
    productcart: [],
    productordering: [],
    productfinished: [],
  });

  const router = (
    <Switch>
      <Route path={"/"} exact>
        <HomePage
          innerWidth={innerWidth}
          loginState={loginState}
          setLoginDispatch={setLoginDispatch}
          setshowerrorcard={setshowerrorcard}
          seterrorcardmessage={seterrorcardmessage}
        />
      </Route>
      <Route path={"/Auth/*"} exact>
        <Auth
          setshowshoppingcart={setshowshoppingcart}
          innerWidth={innerWidth}
          setshowerrorcard={setshowerrorcard}
          seterrorcardmessage={seterrorcardmessage}
        />
      </Route>
      <Route path="/*" exact>
        <Errorhandlepage />
      </Route>
    </Switch>
  );

  //first check if there is a token in localstorage, if so, fetch data, check its validity and login
  //if no token, then stay unloged

  useEffect(async () => {
    //token, auto login ------------------------------------------------------------------------
    if ("token" in localStorage) {
      //start logic of token in local
      const token = localStorage.getItem("token");
      let response;
      setshowserverstart(true);
      while (!response) {
        response = await fetch(
          "https://mernshoppingminiso.herokuapp.com/api/user/localstorage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              token: token,
            },
          }
        );
      }
      setshowserverstart(false);
      const responseData = await response.json();

      /*if token is expired, the log out give user a message */
      if (response.status === 438) {
        seterrorcardmessage(responseData.message);
        setshowerrorcard(true);
        localStorage.clear();
        setLoginDispatch({
          type: "login",
          email: null,
          isLogin: false,
          token: null,
          productcart: [],
          productordering: [],
          productfinished: [],
        });
        return;
      }
      /*END of token is expired*/

      setLoginDispatch({
        type: "login",
        email: responseData.email,
        isLogin: true,
        token: token,
        productcart: responseData.productcart,
        productordering: responseData.productordering,
        productfinished: responseData.productfinished,
      });

      //start of check local storgae ------------------------------------------------------------------------
    } else {
      //start testing server is runningm if there is no token in local-----------------------------------------------------
      let response;
      setshowserverstart(true);
      while (!response) {
        response = await fetch(
          "https://mernshoppingminiso.herokuapp.com/api/user/localstorage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
      }
      setshowserverstart(false);

      //end testing server is running---------------------------------------------------------------
    }
  }, []);
  //END ---- first check if there is a token in localstorage, if so, fetch data, check its validity and login
  //if no token, then stay unloged

  //------similar to redux logger, once store change its value, then it console log

  useEffect(() => {
    console.log(JSON.stringify(loginState));
  }, [loginState]);

  //-----------end of similar to redux logger, once store change its value, then it console log

  //--------------------------total price of the cart, need to pass this value to mutiple child component, thus init in here
  let totalprice = 0;
  if (
    loginState.productcart.filter((product) => product.checked === true)
      .length > 0
  ) {
    totalprice = loginState.productcart
      .filter((product) => product.checked === true)
      .map((product) => {
        return product.price * product.number;
      })
      .reduce((accu, current) => {
        return accu + current;
      }, 0);
  }
  //-------------------------------end of init total price -----------------------------------------------------------------

  //--------------shopping cart onclick on the navbar -----------------------------------

  const shoppingcart = (
    <Modal
      show={showshoppingcart}
      onHide={() => setshowshoppingcart(false)}
      dialogClassName="modal-90w bg-none"
      size="lg"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className='border-bottom-none lightblue-bg'>
        {/*start of items in cart */}
        {loginState.productcart.length === 0 ? (
          <div className='width-100 text-center blue-color bold font-16p'><AiOutlineShoppingCart fontSize='35px' /> Your Cart is Empty</div>
        ) :
          <>
            <ProductCards
              innerWidth={innerWidth}
              setshowerrorcard={setshowerrorcard}
              seterrorcardmessage={seterrorcardmessage}
              setshowshoppingcart={setshowshoppingcart}
            />
            <div className='disp-flex px-4 width-100 blue-color font-14p space-between'>
              <div className='blue-color ml-2'>(Product Subtotal : <b>{totalprice.toFixed(2)}</b> + (GST/QST : <b>{(totalprice * 0.15).toFixed(2)}</b>)
                <br />
                Estimated Total: <b>{(totalprice * 1.15).toFixed(2)}</b>
              </div>
              {totalprice < 1 ? (
                null
              ) : (
                <div className='height-max-content'>
                  <Checkout
                    setshowshoppingcart={setshowshoppingcart}
                    setshowerrorcard={setshowerrorcard}
                    seterrorcardmessage={seterrorcardmessage}
                  />
                </div>
              )}
            </div>
            <Row >
              <Col className='font-16p pl-4 ml-3 bold blue-color'>
                Using 4242 4242 4242 4242 as card number, Any 3 digits of CVC and Any future date to complete purchase.
              </Col>
            </Row>
          </>
        }
      </Modal.Body>
    </Modal>
  );

  //--------------end of shopping cart onclick on the navbar --------------------------
  return (
    <Router>
      <LoginContext.Provider value={{ loginState, setLoginDispatch }}>
        {/**------------------------------------------------------show server starting modal */}
        <Showserverstartingmodal show={showserverstart} />
        {/**end --------------------------------------------------- show server starting modal */}
        <Topnavbar
          innerWidth={innerWidth}
          loginState={loginState}
          setLoginDispatch={setLoginDispatch}
          setshowshoppingcart={setshowshoppingcart}
        />
        {router}
        {shoppingcart}
        <ErrorCard
          innerWidth={innerWidth}
          show={showerrorcard}
          message={errorcardmessage}
          setshow={setshowerrorcard}
        />
        <Footer />
      </LoginContext.Provider>
    </Router>
  );
};

const Showserverstartingmodal = ({ show }) => {
  return (
    <Modal size='sm' className='rounder-border' show={show}>
      <Modal.Header>
        <div className='font-18p text-center width-100'>Server is Loading...</div>
      </Modal.Header>
    </Modal>
  );
};

export default App;
