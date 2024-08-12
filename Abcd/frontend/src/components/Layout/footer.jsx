import React from 'react';
import '../../styles/footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='footer-nav'>
            <div className='footer-content'>
                <div className='footer-section'>
                    <h1 className='footer-title'>Footer Components</h1>
                    <p className='footer-description'>Your one-stop shop for all your needs. Follow us on social media for the latest updates!</p>
                </div>
                <div className='footer-section'>
                    <h2 className='footer-heading'>Quick Links</h2>
                    <ul className='footer-links'>
                        <li><a href='/about' className='footer-link'>About Us</a></li>
                        <li><a href='/contact' className='footer-link'>Contact Us</a></li>
                        <li><a href='/privacy' className='footer-link'>Privacy Policy</a></li>
                        <li><a href='/terms' className='footer-link'>Terms of Service</a></li>
                    </ul>
                </div>
                <div className='footer-section'>
                    <h2 className='footer-heading'>Contact Us</h2>
                    <p className='footer-contact'>123 E-commerce St, Shop City, EC 12345</p>
                    <p className='footer-contact'>Email: support@ecommerce.com</p>
                    <p className='footer-contact'>Phone: +1 (234) 567-890</p>
                </div>
                <div className='footer-section'>
                    <h2 className='footer-heading'>Follow Us</h2>
                    <div className='footer-social'>
                        <a href='https://facebook.com' className='footer-social-icon'><FaFacebook /></a>
                        <a href='https://twitter.com' className='footer-social-icon'><FaTwitter /></a>
                        <a href='https://instagram.com' className='footer-social-icon'><FaInstagram /></a>
                        <a href='https://linkedin.com' className='footer-social-icon'><FaLinkedin /></a>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <p>&copy; {new Date().getFullYear()} E-commerce Website. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
