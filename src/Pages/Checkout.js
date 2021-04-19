import React, { useContext } from "react";
import { LoginContext } from "../usecontext/logincontext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { loginState, setLoginDispatch } = useContext(LoginContext);
  let totalprice = loginState.productcart
    .filter((product) => product.checked === true)
    .map((product) => {
      return product.price * product.number;
    })
    .reduce((accu, current) => {
      return accu + current;
    }, 0);
  const product = loginState.productcart
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

  return (
    <div>
      {product}
      <Button style={{ marginLeft: "5%" }}>Pay your order</Button>
      <Link to={"/"}>
        <Button style={{ marginLeft: "5%" }}>Back to HomePage</Button>
      </Link>
      <span style={{ marginLeft: "5%" }}>
        TOTAL : {totalprice.toFixed(2)} $ + (GST/QST {totalprice.toFixed(2)}
        *0.15) = {(totalprice * 1.15).toFixed(2)} $
      </span>
      <br />
    </div>
  );
};

export default Checkout;
