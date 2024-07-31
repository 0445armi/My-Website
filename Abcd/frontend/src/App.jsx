import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './views/Register';
import Login from './views/Login';
import Home from './components/Home';
import About from './components/About';
import Product from './components/Product';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />
            <Route
              path="/product"
              element={
                <PrivateRoute>
                  <Product />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
