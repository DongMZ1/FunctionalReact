import React, { useEffect, useState } from "react";
import ProductCard from "../Component/ProductCard";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";

const HomePage = ({ loginState, setLoginDispatch, setshowerrorcard, seterrorcardmessage}) => {
  /*shopping list is an array, shoppinglistfetch is data from backend, but shioppinglist show
    is what acutally displaying on the screen.
    */
  const [shoppinglistfetch, setshoppinglistfetch] = useState([]);
  const [shoppinglistshow, setshoppinglistshow] = useState([]);

  /*fetch data when reloading */
  useEffect(async () => {
    let response = await fetch("/api/product/getallproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    let responseData = await response.json();
    setshoppinglistfetch(responseData);
    setshoppinglistshow(responseData);
  }, []);

  const handlesearchchange = (e) => {
    let value = e.target.value.toLowerCase();
    let filtered = shoppinglistshow.filter((product) => {
      return product.title.toLowerCase().match(value);
    });
    setshoppinglistshow(filtered);
    if (value == "") {
      setshoppinglistshow(shoppinglistfetch);
    }
  };

  let shoppinglistjsx = shoppinglistshow.map((product) => (
    <div className="col-sm-6">
      <ProductCard
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
        productimage={`/${product.url}`}
        producttitle={product.title}
        producttext={product.text}
        productprice={product.price}
        setshowerrorcard={setshowerrorcard}
        seterrorcardmessage={seterrorcardmessage}
      />
    </div>
  ));

  return (
    <Container>
      {/*Search bar for search  */}

      <br />
      <br />
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search By Keywords"
          style={{ width: "30rem" }}
          onChange={handlesearchchange}
        />
      </Form>
      <br />
      <br />
      <div className="row">{shoppinglistjsx}</div>
    </Container>
  );
};

export default HomePage;
