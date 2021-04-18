import React, {useContext} from 'react'
import {LoginContext} from '../usecontext/logincontext'
import {Container, Button} from 'react-bootstrap'
const AfterLogin = () =>{
    const {loginState, setLoginDispatch} = useContext(LoginContext)

    let totalprice = loginState.productcart.map(product => {return product.price*product.number;}).reduce(
      (accu, current) => {return accu+current},0
    )
  
  
    let shoppingitemlist =
    <> 
    {loginState.productcart.map(product =>
      <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-2">
          <img style={{height: '100px'}} src={`http://localhost:5000/${product.url}`} alt="..." />
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
                  "http://localhost:5000/user/removeproductfromcart",
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
                  "http://localhost:5000/user/addproducttocart",
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
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
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



  return(
   <Container style={{margin:'5%', fontFamily:'sans-serif'}}>
     <h1>Welcome {loginState.email}</h1>
     <br />
     {shoppingitemlist}
     </Container>
  );
}

export default AfterLogin