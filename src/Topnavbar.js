import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import {FaHome, FaReact, FaEnvelopeOpenText, FaFacebook, FaInstagramSquare, FaLinkedinIn, } from "react-icons/fa";
import GitIcon from 'react-ionicons/lib/LogoGithub'

const Topnavbar = () => {

    return (
        <>
        
        <FaHome fontSize="35px" /><span style={{whiteSpace: "nowrap"}}>HOME PAGE</span>
        <GitIcon color ="black" fontSize = "35px"/><span style={{whiteSpace: "nowrap"}}>dd</span>
        <FaReact fontSize ="40px" /><span style={{whiteSpace: "nowrap"}}>dd</span>
        <FaEnvelopeOpenText fontSize = "40px" /><span style={{whiteSpace: "nowrap"}}>dd</span>
       
        </>
    )
    ;

}

export default Topnavbar
