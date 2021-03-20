import React from "react";
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {FaHome, FaReact, FaEnvelopeOpenText, FaFacebook, FaInstagramSquare, FaLinkedinIn, } from "react-icons/fa";
import {MdAccountCircle} from 'react-icons/md'
import { NavLink } from "react-router-dom";
import { LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
const Topnavbar = ({loginState, setLoginDispatch}) => {
    const history = useHistory();
    const handlelogout = () =>{
        setLoginDispatch({
            type: 'user',
            email: null,
            password: null
        })

        setLoginDispatch(
            {
                type: 'login',
                isLogin: false
            }
        )
        history.push('/')
    }
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
            <Nav.Link style={{float: "right"}} onClick={handlelogout}>
            <MdAccountCircle fontSize="50px" /><span style={{whiteSpace: "nowrap"}}>log out</span>
            </Nav.Link>
            } 

        </Navbar>
        </>
    )
    ;

}

export default Topnavbar
