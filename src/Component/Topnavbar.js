import React, { useState } from "react";
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { FaHome } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineShoppingCart, AiFillShop } from 'react-icons/ai'
import { MdAccountCircle } from 'react-icons/md'
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom'
const Topnavbar = ({ loginState, setLoginDispatch, setshowshoppingcart, innerWidth }) => {
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

            <div className={`disp-flex blue-color bold width-100 py-2 ${innerWidth > 768 ? 'static' : 'fixed z-100 white-bg border-bottom-blue'}`} style={{ height: 'max-content' }}>
                <LinkContainer to={'/'}>
                    <div className={`${innerWidth > 768 ? 'px-3' : 'px-2'} user-select-none cursor-pointer py-2`}>
                        <AiFillShop fontSize="30px" /><span style={{ whiteSpace: "nowrap", fontSize: '15px' }}>Home</span>
                    </div>
                </LinkContainer>

                <LinkContainer to={'/Auth/' + loginState.email}>
                <div className={`${innerWidth > 768 ? 'px-3' : 'px-2'} user-select-none cursor-pointer py-2`}>
                        <MdAccountCircle fontSize="30px" /><span style={{ whiteSpace: "nowrap", fontSize: '15px' }}>Account</span>
                    </div>
                </LinkContainer>
                {loginState.isLogin &&
                     <div className={`${innerWidth > 768 ? 'px-3' : 'px-2'} user-select-none cursor-pointer py-2 ml-auto`} onClick={() => setshowshoppingcart(show => !show)}>
                        <AiOutlineShoppingCart fontSize="30px" /><span style={{ whiteSpace: "nowrap", fontSize: '15px' }}>Shopping Cart</span>
                    </div>
                }
                {loginState.isLogin &&
                    <div className={`${innerWidth > 768 ? 'px-3' : 'px-2'} user-select-none cursor-pointer py-2`} onClick={handlelogout}>
                        <AiOutlineLogout fontSize="30px" /><span style={{ whiteSpace: "nowrap", fontSize: '15px' }}>log out</span>
                    </div>
                }

            </div>
            {
                (innerWidth) < 769 && <div className='height-100p'>

                </div>
            }
            {showlogoutmodal}
        </>
    )
        ;

}

export default Topnavbar
