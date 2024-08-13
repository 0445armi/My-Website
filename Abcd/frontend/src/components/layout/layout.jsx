import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import '../../styles/layout.css';
import Header from './header';
import Footer from './footer';

const Layout = () => {
    const location = useLocation();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!isAuthPage && <Header />}
            <main style={{ minHeight: "88vh" }}>
                <Outlet />
            </main>
            {!isAuthPage && <Footer />}
        </>

    );
};

export default Layout;
