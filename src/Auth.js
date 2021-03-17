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
          
          </>
      )

}

export default Auth