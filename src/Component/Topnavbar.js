import React, { useState } from "react";
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { FaHome } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineShoppingCart, AiFillShop } from 'react-icons/ai'
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
        <Modal size='sm' className='rounder-border' show={showlogout}>
            <Modal.Header>
                <div className='font-18p text-center width-100'>Successfully Log out</div>
            </Modal.Header>
        </Modal>


    return (
        <>

            <div className={`disp-flex py-2 ${window.innerWidth > 700 ? 'static':'fixed z-100 white-bg border-bottom-blue'}`} style={{height:'max-content'}}>


                        <LinkContainer to={'/'}>
                            <Nav.Link>
                                <AiFillShop fontSize="30px" /><span style={{ whiteSpace: "nowrap",fontSize:'15px' }}>Home</span>
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
            {
                (window.innerWidth) < 700 && <div className='height-100p'>

                </div>
            }
            {showlogoutmodal}
        </>
    )
        ;

}

export default Topnavbar
