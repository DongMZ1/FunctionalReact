import React, {useState} from "react";
import {Navbar, Nav, Modal, Button} from 'react-bootstrap';
import {FaHome} from "react-icons/fa";
import {AiOutlineLogout, AiOutlineShoppingCart} from 'react-icons/ai'
import {MdAccountCircle} from 'react-icons/md'
import { LinkContainer} from 'react-router-bootstrap';
import {useHistory} from 'react-router-dom'
const Topnavbar = ({loginState, setLoginDispatch, setshowshoppingcart}) => {
    const history = useHistory();
    const [showlogout, setshowlogout] = useState(false);

    const handlelogout = () =>{
        localStorage.clear();
        setLoginDispatch({
            type: 'login',
            email: null,
            isLogin: false,
            token: null,
            productcart: [],
            productordering:[],
            productfinished: []
        })
        setshowlogout(true);
        setTimeout(()=>{setshowlogout(false);}, 1000)
        history.push('/')
    }

    const showlogoutmodal =     
    <Modal show={showlogout}>
    <Modal.Header closeButton>
      <Modal.Title>Successfully Log out</Modal.Title>
    </Modal.Header>
  </Modal>


    return (
        <>
        
        <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
            {/*Navbar in here */}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <LinkContainer to={'/'}>
                <Nav.Link>
            <FaHome fontSize="50px" /><span style={{whiteSpace: "nowrap"}}>HOME PAGE</span>
            </Nav.Link>
            </LinkContainer>

            <LinkContainer to={'/Auth/' + loginState.email}>
        <Nav.Link>
            <MdAccountCircle fontSize="50px" /><span style={{whiteSpace: "nowrap"}}>Account</span>
            </Nav.Link>
            </LinkContainer>

            
            </Navbar.Collapse>



            </Nav>
            {loginState.isLogin &&
            <Nav.Link style={{float: "right"}} onClick={() =>setshowshoppingcart(show => !show)}>
            <AiOutlineShoppingCart fontSize="50px" /><span style={{whiteSpace: "nowrap"}}>Shopping Cart</span>
            </Nav.Link>
            } 

            {loginState.isLogin &&
            <Nav.Link style={{float: "right"}} onClick={handlelogout}>
            <AiOutlineLogout fontSize="50px" /><span style={{whiteSpace: "nowrap"}}>log out</span>
            </Nav.Link>
            } 

        </Navbar>
        {showlogoutmodal}
        </>
    )
    ;

}

export default Topnavbar
