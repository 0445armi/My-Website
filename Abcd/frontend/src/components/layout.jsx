import React from 'react';
import '../styles/layout.css';
import logo from "../public/image.png";
import Header from './Layout/header';
import {
    Link,
    Outlet,
    useLocation
} from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegListAlt } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";

const Layout = () => {
    const location = useLocation();
    const showHeader = location.pathname === '/home' ||
        location.pathname === '/about' ||
        location.pathname === '/product' || 
        location.pathname === '/address';

    return (
        <div className="home-container">
            {showHeader && (
                <>
                    <Header />
                    <nav className="navbar">
                        <h1 className="logo">
                            <img src={logo} alt="Logo" className='logo1' />
                            My WebSite
                        </h1>
                        <Link to="/home" className="nav-link"><IoIosHome className='logo2' />Home</Link>
                        <Link to="/about" className="nav-link"><FaRegListAlt className='logo2' />About</Link>
                        <Link to="/product" className="nav-link"><AiOutlineProduct className='logo2' />Product</Link>
                        <Link to="/address" className="nav-link"><FaRegAddressCard className='logo2' />Address</Link>
                    </nav>
                </>
            )}
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
