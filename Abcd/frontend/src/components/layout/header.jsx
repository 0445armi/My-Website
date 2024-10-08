import React, { useEffect, useRef, useState } from 'react';
import "../../styles/header.css";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { TfiDashboard } from "react-icons/tfi";
import { ImNotification } from "react-icons/im";
import { RiUserSettingsLine } from "react-icons/ri";

const Header = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const storedUserName = localStorage.getItem('name');
        const userRole = localStorage.getItem('role');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        setIsAdmin(userRole === 'Admin');
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => setShowMenu(prev => !prev);

    const handleLogout = () => {
        localStorage.clear();
        toast.success('Logout successful!');
        navigate('/login');
    };

    return (
            <div className='nav'>
                <div className='nav-left'>
                    <nav className='nav-links'>
                        <h3 className='nav-links'>E-Commerce</h3>
                        <Link to="/home" className='nav-link'>Home</Link>
                        {isAdmin ? (
                            <Link to="/product" className='nav-link'>Product</Link>
                        ) : (
                            <>
                                <Link to="/about" className='nav-link'>About</Link>
                                <Link to="/contact" className='nav-link'>Contact</Link>
                                <Link to="/address" className='nav-link'>Address</Link>
                                <Link to="/cart" className='nav-link'>Cart</Link>
                            </>
                        )}
                    </nav>
                </div>
                <div className='nav-right'>
                    <div className='profile-container' onClick={toggleMenu} ref={menuRef}>
                        <CgProfile className='profile-icon' />
                        <span className='user-name'>{userName}</span>
                        {showMenu && (
                            <div className='profile-menu'>
                                <div className='profile-menu-item' onClick={() => navigate('/home')}>
                                    <TfiDashboard className='logo2' />Dashboard
                                </div>
                                <div className='profile-menu-item'>
                                    <ImNotification className='logo2' />Notifications
                                </div>
                                <div className='profile-menu-item'>
                                    <RiUserSettingsLine className='logo2' />User Settings
                                </div>
                                <div className='profile-menu-separator' />
                                <div className='profile-menu-item' onClick={handleLogout}>
                                    <IoIosLogOut className='logo2' />Log Out
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    );
}

export default Header;