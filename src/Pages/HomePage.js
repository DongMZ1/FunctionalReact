import React, {useEffect, useState} from 'react'
import ProductCard from '../Component/ProductCard'
import {Container, Row, Col} from 'react-bootstrap'

const HomePage = ({loginState, setLoginDispatch}) =>{
    /*shopping list is an array */
   const [shoppinglist, setshoppinglist] = useState([]);

   /*fetch data when reloading */
    useEffect(
        async() =>{
           let response = await fetch(
                'http://localhost:5000/product/getallproduct', 
                {method: 'POST', 
                headers: {'Content-Type': 'application/json'}}
               )
               let responseData = await response.json();
               setshoppinglist(responseData);
        }
    )

    const shoppinglistjsx = shoppinglist.reduce(
        function(accumulator, currentValue, currentIndex, array) {
          if (currentIndex % 2 === 0)
            accumulator.push(array.slice(currentIndex, currentIndex + 2));
          return accumulator;
        }, []).map(product => (
            <>
            <br />
            <br />
            <Row>
            <Col><ProductCard productimage={`http://localhost:5000/${product[0].url}`} producttitle={product[0].title} producttext={product[0].text} productprice={product[0].price}/></Col>
            <Col><ProductCard productimage={`http://localhost:5000/${product[1].url}`} producttitle={product[1].title} producttext={product[1].text} productprice={product[1].price}/></Col>
            </Row>
            <br />
            <br />
                </>
        ))

    
        

    return (
        <Container>
        <h1>Welcome! This is HomePage</h1>
        {shoppinglistjsx}
        </Container>
    );
}

export default HomePage