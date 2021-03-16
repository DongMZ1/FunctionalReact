import React, {}  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {FaHome, FaReact, FaEnvelopeOpenText, FaFacebook, FaInstagramSquare, FaLinkedinIn, } from "react-icons/fa";
import {IoLanguage} from "react-icons/io5"
import GitIcon from 'react-ionicons/lib/LogoGithub'

const Topnavbar = () => {

    return(
        <>
        <Navbar bg="none" className ="navbar" expand="lg" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="#/" className ="navlink" style ={{color: "white"}}><FaHome fontSize="35px" /><span style={{whiteSpace: "nowrap"}}>HOME PAGE</span></Nav.Link>
        <Nav.Link href="#/" className ="navlink"style ={{color: "white"}}><GitIcon color ="white" fontSize = "35px" className="Nfa" /><span style={{whiteSpace: "nowrap"}}>dd</span></Nav.Link>
        <Nav.Link href="#/" className ="navlink" style ={{color: "white"}}><FaReact fontSize ="40px" /><span style={{whiteSpace: "nowrap"}}>dd</span></Nav.Link>
        <Nav.Link href="#/" className ="navlink" style ={{color: "white"}}><FaEnvelopeOpenText fontSize = "40px" /><span style={{whiteSpace: "nowrap"}}>dd</span></Nav.Link>
        </Nav>
        </Navbar.Collapse>              
        </Navbar>
        </>
    )

}
export default Topnavbar
