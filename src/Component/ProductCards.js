import React, { useContext } from "react";
import { LoginContext } from "../usecontext/logincontext";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import {MdRadioButtonChecked, MdRadioButtonUnchecked} from 'react-icons/md'

const ProductCards = ({ setshowerrorcard, seterrorcardmessage, setshowshoppingcart }) => {
  const { loginState, setLoginDispatch } = useContext(LoginContext);
  const history = useHistory();
  const decrease = async (product) => {
    const response = await fetch(
      "https://mernshoppingminiso.herokuapp.com/api/user/removeproductfromcart",
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
  }

  const increase = async (product) => {
    const response = await fetch("https://mernshoppingminiso.herokuapp.com/api/user/addproducttocart", {
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
  }

  const select = async (check, product) => {
    let response = await fetch("https://mernshoppingminiso.herokuapp.com/api/user/selectitemonchange", {
      method: "POST",
      body: JSON.stringify({
        title: product.title,
        checked: check,
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
  }

  return (
    <>
      {loginState.productcart.map((product) => (
        <Row className="white-bg blue-color user-select-none rounder-border mb-2 mx-3 lightblue-border">
          <Col className='disp-flex' xs={3}>
            <img
              className='m-auto'
              style={{ height: "100px" }}
              src={product.url}
              alt="cart-I"
            />
          </Col>
          <Col xs={7}>
            <div className='font-16p'>
            {product.title}
            </div>
            <div className='font-14p white-space-nowrap'>
            Price Per Item : <b>{product.price}</b> <span className='ml-2'>Subtotal: <b>{(product.price * product.number).toFixed(2)}</b></span>
            </div>
            <div className='disp-flex mb-1'>
              {/*start button for decrease the number of product in cart ------------------------------------------------ */}
              <div
                className='blue-border-thin width-max-content cursor-pointer font-12p blue-color rounder-border px-2 py-1'
                onClick={() => decrease(product)}
              >
                DECREASE
              </div>
              {/*start button for decrease the number of product in cart ----------------------------------- */}
              <div className='bold mx-1 mt-1 font-14p'>
              {product.number}
              </div>
              {/*start button for INCREASE the number of product in cart ----------------------------------- */}
              <div
                className='blue-border-thin width-max-content cursor-pointer font-12p blue-color rounder-border px-2 py-1'
                onClick={() => increase(product)}
              >
                INCREASE
              </div>
            </div>
          {/*end button for INCREASE the number of product in cart ----------------------------------- */}  
          </Col>
          {/**start of select product in product cart ----------------------------------------------------------- */}
          <Col xs={2} className='disp-flex px-0'>
            {
              product.checked ? <div className='cursor-pointer m-auto font-14p bold' onClick={()=>select(false, product)}><MdRadioButtonChecked fontSize='20px' /></div>
               : <div className='cursor-pointer m-auto font-14p bold' onClick={()=>select(true, product)}><MdRadioButtonUnchecked fontSize='20px' /></div>
            }
            {/**end of select product in product cart ----------------------------------------------------------- */}
          </Col>
        </Row>
      ))}
    </>
  );
};

export default ProductCards;
