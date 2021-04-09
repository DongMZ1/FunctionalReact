import React from 'react';
import { createPortal, useState } from "react-dom";
import {Modal, Button} from 'react-bootstrap'

const ErrorCard = ({message, show, setshow}) =>{

   return createPortal(
       <>
       {
        <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>There is an ERROR!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setshow(show => !show)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
       }
       </>, document.getElementById('ErrorCard')
        
    )
}

export default ErrorCard;