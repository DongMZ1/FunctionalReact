import React, { useContext, useState, useMemo } from "react";
import { LoginContext } from "../usecontext/logincontext";
import { Container, Button, Row, Col } from "react-bootstrap";
import ProductCards from "../Component/ProductCards";
import Checkout from "./Checkout";
import { AiOutlineShoppingCart, AiOutlineShopping, AiOutlineHistory } from 'react-icons/ai'
import { Link } from "react-router-dom";
const AfterLogin = ({ setshowerrorcard, seterrorcardmessage, innerWidth }) => {
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
    }, 0)
    .toFixed(2);


  //start show product the user is currently ordering --- user has place the order --------------------------------
  const productorderingjsx =
    loginState.productordering.map((product) => (
      <Row className={`white-bg blue-color user-select-none rounder-border mb-2 ${innerWidth > 768 && 'mx-3'} lightblue-border`}>
        <Col className='disp-flex px-0' xs={3}>
          <img
            className='m-auto'
            style={{ height: "100px" }}
            src={product.url}
            alt="..."
          />
        </Col>
        <Col xs={9} className='blue-color font-14p'>
          <div>
            PRODUCT NAME : <b>{product.title}"</b>
            <br />
            UNIT PRICE : <b>{product.price}</b> UNITS : <b>{product.number}</b>
            <br />
            PAYMENT: <b>{(product.price * product.number * 1.15).toFixed(2)}</b>
            <br />
            Date: <b>{product.date.slice(0, 10)}</b> <b>{product.date.slice(11, 20)}</b>
          </div>
        </Col>
      </Row>
    ))

  //start show product the user is currently ordering --- user has place the order --------------------------------

  return (
    <Row className='mx-2 mt-3 blue-color min-height-25rem'>
      <Col xl={6} lg={7} md={9} className='offset-lg-2 offset-md-1'>
        <h6 className='width-max-content'>{loginState.email}</h6>
        {/*start button to show view shopping cart ------------------------------------------- */}
        <div className='disp-flex mb-3'>
          <div
            className={`font-14p user-select-none cursor-pointer bold ${showshoppingcart && 'border-bottom-blue'} width-max-content`}
            onClick={() => {
              setshowshoppingcart(true);
              setshoworder(false);
              setshoworderhistory(false);
            }}
          >
            Shopping Cart
          </div>
          {/*end button to show view shopping cart ------------------------------------------- */}

          {/*start button to show view current orders cart ------------------------------------------- */}
          <div
            className={`font-14p user-select-none cursor-pointer ${innerWidth < 768? 'ml-3' : 'ml-5'} bold ${showorder && 'border-bottom-blue'} width-max-content`}
            onClick={() => {
              setshowshoppingcart(false);
              setshoworder(true);
              setshoworderhistory(false);
            }}
          >
            Current Orders
          </div>
          {/*end button to show view current orders cart ------------------------------------------- */}


          {/*start button to show view history orders cart ------------------------------------------- */}
          <div
            className={`font-14p user-select-none cursor-pointer ${innerWidth < 768? 'ml-3' : 'ml-5'} bold ${showorderhistory && 'border-bottom-blue'} width-max-content`}
            onClick={() => {
              setshowshoppingcart(false);
              setshoworder(false);
              setshoworderhistory(true);
            }}
          >
            Past Orders
          </div>
          {/*end button to show view history orders cart ------------------------------------------- */}
        </div>
        {/*Start of shopping cart page-------------------------------------------------------------------*/}
        {showshoppingcart && (
          loginState.productcart.length === 0 ? (
            <div className='bold font-16p'><AiOutlineShoppingCart fontSize='35px' /> Your Cart is empty</div>
          ) : (
            <>
              <ProductCards setshowerrorcard={setshowerrorcard} seterrorcardmessage={seterrorcardmessage} />
              <div className='disp-flex space-between'>
                <div className='blue-color ml-2 font-16p'>(Product Subtotal : <b>{totalprice}</b> + (GST/QST : <b>{(totalprice * 0.15).toFixed(2)}</b>)
                  <br />
                  Estimated Total: <b>{(totalprice * 1.15).toFixed(2)}</b>
                </div>
                {totalprice > 1 &&
                  <Checkout
                    setshowshoppingcart={setshowshoppingcart}
                    setshowerrorcard={setshowerrorcard}
                    seterrorcardmessage={seterrorcardmessage}
                  />
                }
              </div>
              <Row >
                <Col md={6} className='font-16p bold blue color ml-2'>
                  Using 4242 4242 4242 4242 as card number, Any 3 digits of CVC and Any future date to complete purchase.
                </Col>
              </Row>
            </>
          )
        )}
        {/*End of shopping cart page--------------------------------------------------*/}

        {/*Start of orders page---------------------------------------------------------------*/}
        {loginState.productordering.length === 0 ? (showorder && <div className='bold font-16p'><AiOutlineShopping fontSize='35px' /> You Do not Have Any Order Yet</div>) :
          (showorder && productorderingjsx)
        }
        {/*End of orders page-------------------------------------------------------------------*/}

        {/*Start of orderhistory page*/}
        {
          showorderhistory && <div className='bold font-16p'><AiOutlineHistory fontSize='35px' /> You Do not Have Any Past Orders</div>
        }
        {/*End of orderhistory page*/}
      </Col>
    </Row>
  );
};

export default AfterLogin;
