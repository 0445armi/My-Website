import React, { useEffect, useRef, useState } from 'react';
import "../styles/header.css";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TfiDashboard } from "react-icons/tfi";
import { ImNotification } from "react-icons/im";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [userName, setUserName] = useState('');
    const menuRef = useRef(null);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
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

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userName');
        toast.success('Logout successful!');
        navigate('/login');
    };

    return (
        <div className='nav'>
            <div className='nav-left'>
                <div className='nav1'><FaCartShopping className='pro' /><a className='text'>Shop</a></div>
            </div>
            <div className='nav-right'>
                <div className='profile-container' onClick={toggleMenu} ref={menuRef}>
                    <CgProfile className='profile-icon' />
                    <span className='user-name'>{userName}</span>
                    {showMenu && (
                        <div className='profile-menu'>
                            <div className='profile-menu-item' onClick={() => navigate('/home')}><TfiDashboard className='logo2' />Dashboard</div>
                            <div className='profile-menu-item'><ImNotification className='logo2' />Notifications</div>
                            <div className='profile-menu-item'><RiUserSettingsLine className='logo2' />User Settings</div>
                            <div className='profile-menu-separator' />
                            <div className='profile-menu-item' onClick={handleLogout}><IoIosLogOut className='logo2' />Log Out</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
