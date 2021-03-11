import React, {useState} from 'react'
import LoginContext from './usecontext/logincontext'
import { HashRouter as Router, Switch, Route} from 'react-router-dom';
const App = () => {
 const[loginState, setLoginState] = useState(false)

  return (
    /*Pass LoginState and SetLoginState as an object to usecontext hook for manage content showing*/ 
    <LoginContext.Provider value ={{loginState, setLoginState}}>


    </LoginContext.Provider>
  );
}

export default App;
