import React from 'react';
import { createPortal, useState } from "react-dom";
import {Card} from 'react-bootstrap'

const ErrorCard = ({message}) =>{

   return createPortal(
       <>
       {
        <Card>
  <Card.Body>{message}.</Card.Body>
        </Card>
       }
       </>, document.getElementById('ErrorCard')
        
    )
}

export default ErrorCard;