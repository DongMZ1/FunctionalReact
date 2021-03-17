import React from 'react'

const Auth = ({loginState, setLoginDispatch}) => {
    let page;
    if(loginState.isLogin){
        page = <>Login form</>
    }else{
        page = <>logined</>
    }
      return(
          <>
          {page}
          <h1>{loginState.isLogin ? <>You are not logged in, click to login</> : <>You are logged in, click to log out</>}</h1>
      <button onClick={()=>setLoginDispatch({type:'login', isLogin: true})}>Click to login</button>
      <button onClick={()=>setLoginDispatch({type:'login', isLogin: false})}>Click to log out</button>
          </>
      )

}

export default Auth