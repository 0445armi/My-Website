import React from 'react';
import * as Yup from 'yup';
import '../../styles/register.css';
import {
    Formik,
    Form,
    Field
} from 'formik';
import { toast } from 'react-toastify';
import {
    useNavigate,
    Link
} from 'react-router-dom';
import { registerUser } from "../../axios/api";

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('UserName is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
});

const Register = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await registerUser(values);
            console.log(response);
            toast.success('Registration successful!');
            resetForm();
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed!');
        }
    };

    return (
        <div className="form-container">
            <Formik
                initialValues={{
                    userName: '',
                    email: '',
                    password: '',
                    phone: '',
                    address: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="register-form">
                        <h1 className='m1'>Register</h1>
                        <label className="c1">
                        User Name:
                            <Field
                                type="text"
                                name="userName"
                                className="input"
                            />
                            {errors.userName && touched.userName ? (
                                <div className="error-message">{errors.userName}</div>
                            ) : null}
                        </label>
                        <br />
                        <label className="c1">
                            Email:
                            <Field
                                type="email"
                                name="email"
                                className="input"
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
                                className="input"
                            />
                            {errors.password && touched.password ? (
                                <div className="error-message">{errors.password}</div>
                            ) : null}
                        </label>
                        <br />
                        <label className="c1">
                            Phone:
                            <Field type="text" name="phone" className="input" />
                            {errors.phone && touched.phone ? (
                                <div className="error-message">{errors.phone}</div>
                            ) : null}
                        </label>
                        <br />
                        <label className="c1">
                            Address:
                            <Field type="text" name="address" className="input" />
                            {errors.address && touched.address ? (
                                <div className="error-message">{errors.address}</div>
                            ) : null}
                        </label>
                        <br />
                        <button type="submit" className="btn">Register</button>
                        <p className="txt">
                            Already Have an Account? <Link to="/login">Login</Link>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
