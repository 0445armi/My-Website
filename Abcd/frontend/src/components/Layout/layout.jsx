import React from 'react';
import '../../styles/layout.css';
import Header from './header';
import Footer from './footer';

const Layout = () => {
    return (
        <>
            <Header />
            <main style={{ minHeight: "88vh" }}></main>
            <Footer />
        </>
        
    );
};

export default Layout;
