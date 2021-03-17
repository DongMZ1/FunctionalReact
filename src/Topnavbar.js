import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {FaHome, FaReact, FaEnvelopeOpenText, FaFacebook, FaInstagramSquare, FaLinkedinIn, } from "react-icons/fa";
import {MdAccountCircle} from 'react-icons/md'
import GitIcon from 'react-ionicons/lib/LogoGithub'
import { NavLink } from "react-router-dom";

const Topnavbar = () => {

    return (
        <>
        
        <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
            {/*Navbar in here */}

        <Navbar.Link href ="#/">
            <FaHome fontSize="35px" /><span style={{whiteSpace: "nowrap"}}>HOME PAGE</span>
        </Navbar.Link>

        <Navbar.Link href="#/Auth">
            <MdAccountCircle fontSize="50px" /><span style={{whiteSpace: "nowrap"}}>Account</span>
        </Navbar.Link>

            </Nav>

        </Navbar>
        </>
    )
    ;

}

export default Topnavbar
