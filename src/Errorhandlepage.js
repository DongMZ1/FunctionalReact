import React, {useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useHistory} from 'react-router-dom'

const Errorhandlepage = () =>{
    const history = useHistory();
    /*similar to componentDidmount, I set time out after initial rendering to redirect to homepage if url is not valid */
    useEffect(
        ()=>{
            setTimeout(() =>{history.push('/')}, 3000)
          
           
        }, []
    )

  return(
         <>
         <h1>ERROR</h1>
         <br />
            <h3> URL is not Found, will redirect to HOMEPAGE in 3 seconds</h3>
            <br />
         </>
  )
}

export default Errorhandlepage