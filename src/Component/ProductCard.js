import React from "react";
import {Card, ListGroup, ListGroupItem, Button, Container} from 'react-bootstrap'
import {AiOutlineShoppingCart} from 'react-icons/ai'

const ProductCard = ({productimage, producttitle, producttext, productprice}) => {

  return (
    <Card style={{ width: '30rem' }}>
  <Card.Img variant="top" src={productimage} />
  <Card.Body>
    <Card.Title>{producttitle}</Card.Title>
    <Card.Text>
     {producttext}
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Price : {productprice} $</ListGroupItem>
  <ListGroupItem>
  <Button variant="primary">ADD to Chart<AiOutlineShoppingCart style={{fontSize:'2em'}} /></Button>
  </ListGroupItem>
  </ListGroup>
</Card>
  );
};

export default ProductCard;
