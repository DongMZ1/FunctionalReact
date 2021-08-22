import React, { useEffect, useState } from "react";
import ProductCard from "../Component/ProductCard";
import {BiSearchAlt2} from 'react-icons/bi'
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
    <div className='px-5 py-3'>
      {/*Search bar for search  */}
      <div className='position-relative'>
      <BiSearchAlt2 className='position-absolute blue-color top-5px left-0 mt-2 ml-2' />
        <input
          type="text"
          className='search-bar px-4 py-2 mb-4'
          placeholder="Search Items"
          onChange={(e)=>{setshoppingKeyWord(e.target.value)}}
        />
        </div>
      <div className="row">{shoppinglistshow.map((product) => (
    <div className={`${window.innerWidth > 1338? 'col-sm-3' : window.innerWidth > 1000? 'col-sm-4' : 'col-sm-6'} justify-content-center`}>
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
