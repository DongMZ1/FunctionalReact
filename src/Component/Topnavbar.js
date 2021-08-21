import React, { useState } from "react";
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { FaHome } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai'
import { MdAccountCircle } from 'react-icons/md'
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom'
const Topnavbar = ({ loginState, setLoginDispatch, setshowshoppingcart }) => {
    const history = useHistory();
    const [showlogout, setshowlogout] = useState(false);

    const handlelogout = () => {
        localStorage.clear();
        setLoginDispatch({
            type: 'login',
            email: null,
            isLogin: false,
            token: null,
            productcart: [],
            productordering: [],
            productfinished: []
        })
        setshowlogout(true);
        setTimeout(() => { setshowlogout(false); }, 1000)
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

            <div className='disp-flex' style={{height:'max-content'}}>


                        <LinkContainer to={'/'}>
                            <Nav.Link>
                                <FaHome fontSize="30px" /><span style={{ whiteSpace: "nowrap",fontSize:'15px' }}>HOME PAGE</span>
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to={'/Auth/' + loginState.email}>
                            <Nav.Link>
                                <MdAccountCircle fontSize="30px" /><span style={{ whiteSpace: "nowrap", fontSize:'15px' }}>Account</span>
                            </Nav.Link>
                        </LinkContainer>


                   



               
                {loginState.isLogin &&
                    <Nav.Link className='ml-auto' onClick={() => setshowshoppingcart(show => !show)}>
                        <AiOutlineShoppingCart fontSize="30px" /><span style={{ whiteSpace: "nowrap", fontSize:'15px' }}>Shopping Cart</span>
                    </Nav.Link>
                }

                {loginState.isLogin &&
                    <Nav.Link onClick={handlelogout}>
                        <AiOutlineLogout fontSize="30px" /><span style={{ whiteSpace: "nowrap", fontSize:'15px' }}>log out</span>
                    </Nav.Link>
                }

            </div>
            {showlogoutmodal}
        </>
    )
        ;

}

export default Topnavbar
