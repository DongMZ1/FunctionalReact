import React from "react";
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {FaHome, FaReact, FaEnvelopeOpenText, FaFacebook, FaInstagramSquare, FaLinkedinIn, } from "react-icons/fa";
import {MdAccountCircle} from 'react-icons/md'
import { NavLink } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
const Topnavbar = () => {

    return (
        <>
        
        <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
            {/*Navbar in here */}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link href="#/">
            <FaHome fontSize="50px" /><span style={{whiteSpace: "nowrap"}}>HOME PAGE</span>
            </Nav.Link>


        <Nav.Link href="#/Auth">
            <MdAccountCircle fontSize="50px" /><span style={{whiteSpace: "nowrap"}}>Account</span>
            </Nav.Link>
            </Navbar.Collapse>


            </Nav>

        </Navbar>
        </>
    )
    ;

}

export default Topnavbar
