import React, { useContext, useState } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Container,
} from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LoginContext } from "../usecontext/logincontext";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ProductCard = ({
  productimage,
  producttitle,
  producttext,
  productprice,
  setshowerrorcard,
  seterrorcardmessage
}) => {
  const { loginState, setLoginDispatch } = useContext(LoginContext);
  const [showaddtocartmessage, setshowaddtocartmessage] = useState(false);
  const [shownotloginmessage, setshownotloginmessage] = useState(false);
  const history = useHistory();

  const addproducttocart = async () => {
    if (!loginState.isLogin) {
      setshownotloginmessage(true);

      setTimeout(() => {
        setshownotloginmessage(false);
        history.push('Auth/');
      }, 1000)
      return;
    }
    const response = await fetch(
      "https://mernshoppingminiso.herokuapp.com/api/user/addproducttocart",
      {
        method: "POST",
        body: JSON.stringify({
          title: producttitle,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          'token': loginState.token
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
        type: 'login',
        email: null,
        isLogin: false,
        token: null,
        productcart: [],
        productordering: [],
        productfinished: []
      })
      history.push('/Auth/');
      return;
    }
    /*END of token is expired*/
    setLoginDispatch({ type: "addcart", products: responseData.data });
    setshowaddtocartmessage(true);
    setTimeout(() => { setshowaddtocartmessage(false); }, 1000);
  };

  const successfulmessage = (
    <Modal size='sm' dialogClassName='rounder-border' show={showaddtocartmessage}>
      <Modal.Header>
        <div className='font-16p rounder-border text-center width-100'>Successfully add "{producttitle}" to Cart</div>
      </Modal.Header>
    </Modal>
  );

  const notloginmessage = (
    <Modal size='sm' className='rounder-border' show={shownotloginmessage}>
      <Modal.Header>
        <div className='font-18p text-center width-100'>Please Login in</div>
      </Modal.Header>
    </Modal>
  );


  return (
    <>
      <div className='round-border lightblue-border lightblue-bg' style={{ width: "95%" }}>
        <Card.Img className='rounder-border' variant="top" src={productimage} />
        <Card.Body>
          <Card.Title className="font-16p">{producttitle}</Card.Title>
          <Card.Text className="font-14p">{producttext}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="font-14p">Price : <b>{productprice} $</b></ListGroupItem>
          <ListGroupItem>
            <div className='blue-bg round-border cursor-pointer width-max-content px-3 py-1 font-14p white-color' onClick={addproducttocart}>
              ADD to Chart
              <AiOutlineShoppingCart className='ml-1' style={{ fontSize: "22px" }} />
            </div>
          </ListGroupItem>
        </ListGroup>
      </div>
      {successfulmessage}
      {notloginmessage}
    </>
  );
};

export default ProductCard;
