import React, { useContext, useState, useMemo} from "react";
import { LoginContext } from "../usecontext/logincontext";
import { Container, Button } from "react-bootstrap";
import ProductCards from "../Component/ProductCards";
import {Link} from 'react-router-dom'
const AfterLogin = () => {
  const { loginState, setLoginDispatch } = useContext(LoginContext);
  const [showshoppingcart, setshowshoppingcart] = useState(true);
  const [showorder, setshoworder] = useState(false);
  const [showorderhistory, setshoworderhistory] = useState(false);


  let totalprice = loginState.productcart
    .filter((product) => product.checked === true)
    .map((product) => {
      return product.price * product.number;
    })
    .reduce((accu, current) => {
      return accu + current;
    }, 0).toFixed(2);

  return (
    <Container style={{ margin: "5%", fontFamily: "sans-serif" }}>
      <h1>Welcome {loginState.email}</h1>
      <br />
      <Button style={{marginLeft: '5%'}} onClick={
        () => {
          setshowshoppingcart(true);
          setshoworder(false);
          setshoworderhistory(false);
        }
      }>View Shopping Cart</Button>
      <Button style={{marginLeft: '5%'}} onClick={
        () => {
          setshowshoppingcart(false);
          setshoworder(true);
          setshoworderhistory(false);
        }
      }
      >View Current Orders</Button>
      <Button style={{marginLeft: '5%'}} onClick={
        () => {
          setshowshoppingcart(false);
          setshoworder(false);
          setshoworderhistory(true);
        }
      }
      >View Orders History</Button>

      <br />
      <br />
{/*Start of shopping cart page*/}
    { showshoppingcart && <> 
      <h2>Shopping Cart</h2>
      <br />
      {loginState.productcart.length === 0? 'Shopping Cart is Empty' : <ProductCards />}
      <br />
      TOTAL: {totalprice}
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
        >
          Check Out
        </Button>
        </Link>
      }
      </>}
{/*End of shopping cart page*/}   

{/*Start of orders page*/}
{/*End of orders page*/}   

{/*Start of orderhistory page*/}
{/*End of orderhistory page*/}   

    </Container>
  );
};

export default AfterLogin;
