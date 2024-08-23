import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import '../../styles/login.css';
import {
    Link,
    useNavigate
} from 'react-router-dom';
import {
    Formik,
    Field,
    Form
} from 'formik';
import { toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 
import { loginUser } from '../../axios/api';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await loginUser(values);
            toast.success('Login successful!');
            resetForm();
            navigate('/home');
        } catch (error) {
            toast.error('Login failed!');
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <div className="form-container">
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors }) => (
                    <Form className='login-form'>
                        <h1 className='m1'>Log In</h1>
                        <label className="c1">
                            Email:
                            <Field
                                type="email"
                                name="email"
                                className={`input ${touched.email && errors.email ? 'error' : ''}`}
                                autoComplete="email"
                            />
                            {errors.email && touched.email ? (
                                <div className="error-message">{errors.email}</div>
                            ) : null}
                        </label>
                        <br />
                        <label className="c1">
                            Password:
                            <div className="password-container">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className={`input ${touched.password && errors.password ? 'error' : ''}`}
                                    autoComplete="current-password"
                                /> <span
                                    className="password-toggle-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                </span>
                            </div>
                            {errors.password && touched.password ? (
                                <div className="error-message">{errors.password}</div>
                            ) : null}
                        </label>
                        <br />
                        <button type="submit" className='btn'>Login</button>
                        <p className="txt">
                            Have not Account? <Link to="/register">Register</Link>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
