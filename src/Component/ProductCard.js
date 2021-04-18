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
import {useHistory} from "react-router-dom";

const ProductCard = ({
  productimage,
  producttitle,
  producttext,
  productprice,
}) => {
  const { loginState, setLoginDispatch } = useContext(LoginContext);
  const [showaddtocartmessage, setshowaddtocartmessage] = useState(false);
  const [shownotloginmessage, setshownotloginmessage] = useState(false);
  const history = useHistory();

  const addproducttocart = async () => {
    if(!loginState.isLogin){
      setshownotloginmessage(true);

      setTimeout(()=>{
        setshownotloginmessage(false);
        history.push('Auth/');
      }, 1000)
    }
    const response = await fetch(
      "http://localhost:5000/user/addproducttocart",
      {
        method: "POST",
        body: JSON.stringify({
          email: loginState.email,
          title: producttitle,
        }),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }
    );

    const responseData = await response.json();
    setLoginDispatch({ type: "addcart", products: responseData.data });
    setshowaddtocartmessage(true);
    setTimeout(()=>{setshowaddtocartmessage(false);}, 1000);
  };

  const successfulmessage = (
    <Modal show={showaddtocartmessage}>
      <Modal.Header>
        <Modal.Title>Successfully add "{producttitle}" to Cart</Modal.Title>
      </Modal.Header>
    </Modal>
  );

  const notloginmessage = (
    <Modal show={shownotloginmessage}>
      <Modal.Header>
        <Modal.Title>PlEASE SIGN IN</Modal.Title>
      </Modal.Header>
    </Modal>
  );


  return (
    <>
      <Card style={{ width: "30rem" }}>
        <Card.Img variant="top" src={productimage} />
        <Card.Body>
          <Card.Title>{producttitle}</Card.Title>
          <Card.Text>{producttext}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Price : {productprice} $</ListGroupItem>
          <ListGroupItem>
            <Button variant="primary" onClick={addproducttocart}>
              ADD to Chart
              <AiOutlineShoppingCart style={{ fontSize: "2em" }} />
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Card>
      {successfulmessage}
      {notloginmessage}
    </>
  );
};

export default ProductCard;
