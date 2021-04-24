import React, { useContext } from "react";
import { LoginContext } from "../usecontext/logincontext";
import { Container, Button } from "react-bootstrap";
import {useHistory} from 'react-router-dom'

const ProductCards = ({ setshowerrorcard, seterrorcardmessage, setshowshoppingcart }) => {
  const { loginState, setLoginDispatch } = useContext(LoginContext);
  const history = useHistory();
  return (
    <>
      {loginState.productcart.map((product) => (
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-2">
              <img
                style={{ height: "100px" }}
                src={`/${product.url}`}
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                PRODUCT NAME : "{product.title}"
                <br />
                price : {product.price}
                <span style={{ paddingLeft: "10%" }}>
                  <Button
                    onClick={async () => {
                      const response = await fetch(
                        "/user/removeproductfromcart",
                        {
                          method: "POST",
                          body: JSON.stringify({
                            title: product.title,
                          }),
                          headers: {
                            "Content-Type": "application/json;charset=utf-8",
                            token: loginState.token,
                          },
                        }
                      );

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
                        setshowshoppingcart(false);
                        history.push('/Auth/');
                        return;
                      }
                      /*END of token is expired*/
                      setLoginDispatch({
                        type: "addcart",
                        products: responseData.data,
                      });
                    }}
                  >
                    DECREASE
                  </Button>

                  {product.number}
                  <Button
                    onClick={async () => {
                      const response = await fetch("/user/addproducttocart", {
                        method: "POST",
                        body: JSON.stringify({
                          title: product.title,
                        }),
                        headers: {
                          "Content-Type": "application/json;charset=utf-8",
                          token: loginState.token,
                        },
                      });

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
                        setshowshoppingcart(false);
                        history.push('/Auth/');
                        return;
                      }
                      /*END of token is expired*/
                      setLoginDispatch({
                        type: "addcart",
                        products: responseData.data,
                      });
                    }}
                  >
                    INCREASE
                  </Button>
                </span>
                <span style={{ marginLeft: "10%" }}>
                  <input
                    onChange={async (e) => {
                      let response = await fetch("/user/selectitemonchange", {
                        method: "POST",
                        body: JSON.stringify({
                          title: product.title,
                          checked: e.target.checked,
                        }),
                        headers: {
                          "Content-Type": "application/json;charset=utf-8",
                          token: loginState.token,
                        },
                      });
                      let responseData = await response.json();
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
                        setshowshoppingcart(false);
                        history.push('/Auth/');
                        return;
                      }
                      /*END of token is expired*/
                      setLoginDispatch({
                        type: "addcart",
                        products: responseData.data,
                      });
                    }}
                    className="form-check-input"
                    checked={product.checked}
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  ></input>
                  <label className="form-check-label" for="flexCheckChecked">
                    Select
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCards;
