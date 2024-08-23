import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Home from './components/pages/home';
import Product from './components/pages/product';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Cart from './components/pages/cart';
import PrivateRoute from './components/privateRoute';
import Layout from './components/layout/layout';
import Address from './components/pages/address';

const App = () => {
    const userRole = localStorage.getItem('role');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                    {userRole === 'Admin' ? (
                        <Route path="/product" element={<PrivateRoute allowedRoles={['Admin']}><Product /></PrivateRoute>} />
                    ) : (
                        <>
                            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
                            <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
                            <Route path="/address" element={<PrivateRoute><Address /></PrivateRoute>} />
                            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                        </>
                    )}
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
