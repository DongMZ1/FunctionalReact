import React, {useContext} from 'react'
import {LoginContext} from '../usecontext/logincontext'
import {Container, Button} from 'react-bootstrap'

const ProductCards = () => {
    const { loginState, setLoginDispatch } = useContext(LoginContext)
    return (
        <> 
    {loginState.productcart.map(product =>
      <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-2">
          <img style={{height: '100px'}} src={`/${product.url}`} alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            PRODUCT NAME : "{product.title}" 
            <br />
            price : {product.price}
            <span style={{paddingLeft:'10%'}}> 
  
  
            <Button onClick = {
              async () =>{
                const response = await fetch(
                  "/user/removeproductfromcart",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      email: loginState.email,
                      title: product.title,
                    }),
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                  }
                );
            
                const responseData = await response.json();
                setLoginDispatch({ type: "addcart", products: responseData.data });
              }
            }>DECREASE</Button>
  
  
             {product.number} 
             <Button onClick={
              async () =>{
                const response = await fetch(
                  "/user/addproducttocart",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      email: loginState.email,
                      title: product.title,
                    }),
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                  }
                );
            
                const responseData = await response.json();
                setLoginDispatch({ type: "addcart", products: responseData.data });
              }
             }>INCREASE</Button>
            </span>

            <span style={{marginLeft:'10%'}}>
            <input
            onChange={
              async (e) => {
                let response = await fetch('/user/selectitemonchange', {
                  method: 'POST',
                  body: JSON.stringify({email: loginState.email, title: product.title, checked: e.target.checked}),
                  headers: { "Content-Type": "application/json;charset=utf-8" },
                });
                let responseData = await response.json(); 
                setLoginDispatch({ type: "addcart", products: responseData.data });
           }
            }
            className="form-check-input" checked={product.checked} type="checkbox" value="" id="flexCheckDefault"></input>
            <label className="form-check-label" for="flexCheckChecked">
                  Select
            </label>
            </span>

          </div>
        </div>
      </div>
      </div>
      )}
      </>
    )
}

export default ProductCards
