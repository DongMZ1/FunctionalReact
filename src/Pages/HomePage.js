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
  const [shoppingKeyWord, setshoppingKeyWord] = useState("");

  /*fetch data when reloading ------------------------------------- */
  useEffect(() => {
    const fetchdata = async () =>{
    let response = await fetch("https://mernshoppingminiso.herokuapp.com/api/product/getallproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    let responseData = await response.json();
    setshoppinglistfetch(responseData);
    setshoppinglistshow(responseData);
  }
     fetchdata();
  }, []);

  useEffect(()=>{
    let filtered = shoppinglistfetch.filter((product) => {
      return product.title.toLowerCase().includes((shoppingKeyWord?.toLowerCase()));
    });
    setshoppinglistshow(filtered);
  }, [shoppingKeyWord])


//end show filtered show items -------------------------------------------
  return (
    <div className='px-5 py-5'>
      {/*Search bar for search  */}
        <input
          type="text"
          placeholder="Search"
          style={{ width: "30rem" }}
          onChange={(e)=>{setshoppingKeyWord(e.target.value)}}
        />
      <div className="row">{shoppinglistshow.map((product) => (
    <div className="col-sm-6">
      <ProductCard
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
        productimage={product.url}
        producttitle={product.title}
        producttext={product.text}
        productprice={product.price}
        setshowerrorcard={setshowerrorcard}
        seterrorcardmessage={seterrorcardmessage}
      />
    </div>
  ))}</div>
    </div>
  );
};

export default HomePage;
