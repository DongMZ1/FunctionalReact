import React, { useContext, useState, useMemo } from "react";
import { LoginContext } from "../usecontext/logincontext";
import { Container, Button, Row, Col } from "react-bootstrap";
import ProductCards from "../Component/ProductCards";
import { Link } from "react-router-dom";
const AfterLogin = ({setshowerrorcard, seterrorcardmessage}) => {
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
      <>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-2">
              <img
                style={{ height: "100px" }}
                src={product.url}
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                PRODUCT NAME : "{product.title}"
                <br />
                price : {product.price}
                <span style={{ paddingLeft: "10%" }}>
                  Number of Product : {product.number}
                </span>
                <br />
                Data when place order: {product.date}
              </div>
            </div>
          </div>
        </div>
      </>
    ))
  
//start show product the user is currently ordering --- user has place the order --------------------------------

  return (
    <Row className='mx-2 mt-3 blue-color'>
      <h6 className='width-max-content'>{loginState.email}</h6>
    {/*start button to show view shopping cart ------------------------------------------- */}
     <div className='disp-flex mb-3'>
      <div
        className={`font-14p cursor-pointer bold ${showshoppingcart && 'border-bottom-blue'} width-max-content`}
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
        className={`font-14p cursor-pointer ml-5 bold ${showorder && 'border-bottom-blue'} width-max-content`}
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
        className={`font-14p cursor-pointer ml-5 bold ${showorderhistory && 'border-bottom-blue'} width-max-content`}
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
        <>
        <Row className='offset-lg-2 offset-md-1'>
          <Col lg={5}>
          {loginState.productcart.length === 0 ? (
            "Shopping Cart is Empty"
          ) : (
            <ProductCards setshowerrorcard={setshowerrorcard} seterrorcardmessage={seterrorcardmessage} />
          )}
          </Col>
        </Row>    
          TOTAL: {totalprice} 
       {/**--------------START if totalprice is 0, then do not allow user to check out */}
          {totalprice < 1 ? (
            <Button
              style={{ marginLeft: "10%", marginRight: "10%" }}
              variant="primary"
              disabled={true}
            >
              Check Out
            </Button>
          ) : (
            <Link to={"/Checkout/"}>
              <Button
                style={{ marginLeft: "10%", marginRight: "10%" }}
                variant="primary"
              >
                Check Out
              </Button>
            </Link>
          )}
          {/**--------------END if totalprice is 0, then do not allow user to check out */}

        </>
      )}
      {/*End of shopping cart page--------------------------------------------------*/}

      {/*Start of orders page---------------------------------------------------------------*/}
      {loginState.productordering.length === 0 ? (showorder && <h2>You do not have any orders yet</h2>) :
          (showorder && productorderingjsx)
        }
      {/*End of orders page-------------------------------------------------------------------*/}

      {/*Start of orderhistory page*/}
      {/*End of orderhistory page*/}
    </Row>
  );
};

export default AfterLogin;
