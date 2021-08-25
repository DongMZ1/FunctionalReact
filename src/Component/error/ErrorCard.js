import React from 'react';
import { createPortal, useState } from "react-dom";
import { Modal, Button } from 'react-bootstrap'

const ErrorCard = ({ message, show, setshow, innerWidth}) => {


  return createPortal(
    <>
      {
        <Modal 
        dialogClassName='bg-none'
        size={innerWidth < 768 && 'sm'}
        show={show} onHide={()=>setshow(state => !state)} >
          <Modal.Header className='white-color' closeButton />
          <Modal.Body className='rounder-border py-5'> <div className='font-18p text-center width-100'>{message}</div></Modal.Body>
        </Modal>
      }
    </>, document.getElementById('ErrorCard')

  )
}

export default ErrorCard;