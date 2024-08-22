import React, { useEffect } from 'react';
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
import { loginUser } from '../../axios/api';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('email is required'),
    password: Yup.string().required('password is required').min(6, 'Password must be at least 6 characters'),
});

export const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await loginUser(values);
            // localStorage.setItem('jwtToken', response.token);
            // localStorage.setItem('name', response.user.userName);
            // localStorage.setItem('role', response.role);
            toast.success('Login successful!');
            resetForm();
            navigate('/home');
        } catch (error) {
            toast.error('Login failed!');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
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
                            <Field
                                type="password"
                                name="password"
                                className={`input ${touched.password && errors.password ? 'error' : ''}`}
                                autoComplete="current-password"
                            />
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
