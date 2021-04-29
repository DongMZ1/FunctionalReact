import React, { useState, useReducer, useEffect } from "react";
import { LoginContext } from "./usecontext/logincontext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
  useHistory
} from "react-router-dom";
import { Modal, Button, Card } from "react-bootstrap";

/*Component */
import HomePage from "./Pages/HomePage";
import Auth from "./Pages/Auth";
import Topnavbar from "./Component/Topnavbar";
import Errorhandlepage from "./Pages/Errorhandlepage";
import ProductCards from "./Component/ProductCards";
import Checkout from './Pages/Checkout'
import ErrorCard from './Component/error/ErrorCard'

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
  const [showshoppingcart, setshowshoppingcart] = useState(false);

  /*error handling at top level*/
  const [showerrorcard, setshowerrorcard] = useState(false);
  const [errorcardmessage, seterrorcardmessage] = useState('');
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
          loginState={loginState}
          setLoginDispatch={setLoginDispatch}
          setshowerrorcard={setshowerrorcard}
          seterrorcardmessage={seterrorcardmessage}
        />
      </Route>

      <Route path={"/Auth/*"} exact>
        <Auth
        setshowerrorcard={setshowerrorcard}
        seterrorcardmessage={seterrorcardmessage}
        />
      </Route>

      <Route path={"/Checkout/"} exact>
        <Checkout
        setshowerrorcard={setshowerrorcard}
        seterrorcardmessage={seterrorcardmessage}
        />
      </Route>

      <Route path="/*" exact>
        <Errorhandlepage />
      </Route>
    </Switch>
  );

  /*similar to redux-logger, printout my 'store' everytime if my store updated */

 
  useEffect(
   async () =>{
   if('token' in localStorage){
     const token = localStorage.getItem('token');
     const response = await fetch('/api/user/localstorage',
     {
       method: 'POST',
       headers: {'Content-Type': 'application/json;charset=utf-8',
       'token': token
      }
     }
     )
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
        return;
     }
     /*END of token is expired*/

     setLoginDispatch(
       {
         type: 'login',
         email: responseData.email,
         isLogin: true,
         token: token,
         productcart: responseData.productcart,
         productordering: responseData.productordering,
         productfinished: responseData.productfinished
       }
     )
   }
    },[]
  )

  useEffect(() => {
    console.log(JSON.stringify(loginState));
  }, [loginState]);
  
  
  let totalprice = 0;
  if (loginState.productcart
    .filter((product) => product.checked === true).length > 0)
  {totalprice = loginState.productcart
    .filter((product) => product.checked === true)
    .map((product) => {
      return product.price * product.number;
    })
    .reduce((accu, current) => {
      return accu + current;
    }, 0);}

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
        {loginState.productcart.length === 0 ? (
          "Shopping Cart is Empty"
        ) : (
          <ProductCards setshowerrorcard={setshowerrorcard} seterrorcardmessage={seterrorcardmessage}
          setshowshoppingcart={setshowshoppingcart}
          />
        )}
        {/*end of items in cart */}
      </Modal.Body>
      <Modal.Footer>
        TOTAL: {totalprice.toFixed(2)}
      {  totalprice < 1 ? <Button
          style={{ marginLeft: "10%", marginRight: "10%" }}
          variant="primary"
          disabled={true}
        >
          Check Out
        </Button>
        :
        <Link to={'/Checkout/'}>
        <Button
          style={{ marginLeft: "10%", marginRight: "10%" }}
          variant="primary"
          onClick={()=>setshowshoppingcart(false)}
        >
          Check Out
        </Button>
        </Link>
      }
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
        <ErrorCard show={showerrorcard} message={errorcardmessage} setshow={setshowerrorcard} />
      </LoginContext.Provider>
    </Router>
  );
};

export default App;
