import React, { useContext } from "react";
import { LoginContext } from "../usecontext/logincontext";
import { Container, Button } from "react-bootstrap";
import ProductCards from "../Component/ProductCards";
const AfterLogin = () => {
  const { loginState, setLoginDispatch } = useContext(LoginContext);

  let totalprice = loginState.productcart
    .filter((product) => product.checked === true)
    .map((product) => {
      return product.price * product.number;
    })
    .reduce((accu, current) => {
      return accu + current;
    }, 0);

  return (
    <Container style={{ margin: "5%", fontFamily: "sans-serif" }}>
      <h1>Welcome {loginState.email}</h1>
      <br />
      <ProductCards />
    </Container>
  );
};

export default AfterLogin;
