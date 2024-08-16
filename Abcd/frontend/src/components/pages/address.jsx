import React, { useEffect, useState } from "react";
import {
    Formik,
    Field,
    Form,
    ErrorMessage
} from "formik";
import * as Yup from "yup";
import "../../styles/product.css";
import {
    deleteAddress,
    fetchAddress,
    createAddress,
    updateAddress   
} from "../../axios/api";
import {
    MdModeEdit,
    MdDelete
} from "react-icons/md";
import Pagination from "../pagination";

const validationSchema = Yup.object({
    city: Yup.string().required("City required"),
    state: Yup.string().required("State required"),
    country: Yup.string().required("Country required"),
    pinCode: Yup.string()
        .matches(/^\d{6}$/, "PinCode must be a 6-digit number")
        .required("PinCode required"),
});

const Address = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deletingAddress, setDeletingAddress] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('city');
    const [sortType, setSortType] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const handleButtonClick = () => {
        setIsEdit(false);
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
        setEditingAddress(null);
    };

    const handleAddressSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append('city', values.city);
        formData.append('state', values.state);
        formData.append('country', values.country);
        formData.append('pinCode', values.pinCode);
        try {
            let updatedAddress;
            if (isEdit && editingAddress) {
                const updatedFields = {};
                const originalValues = {
                    city: editingAddress.city,
                    state: editingAddress.state,
                    country: editingAddress.country,
                    pinCode: editingAddress.pinCode,
                };
                for (const key in values) {
                    if (values[key] !== originalValues[key] || values[key] === null) {
                        updatedFields[key] = values[key];
                    }
                }
                const updateFormData = new FormData();
                for (const key in updatedFields) {
                    updateFormData.append(key, updatedFields[key]);
                }
                updatedAddress = await updateAddress(editingAddress._id, updatedFields);
                setAddresses((prevAddresses) =>
                    prevAddresses.map((address) =>
                        address._id === editingAddress._id ? updatedAddress : address
                    )
                );
            } else {
                updatedAddress = await createAddress(values);
                setAddresses((prevAddresses) => [...prevAddresses, updatedAddress]);
            }
            await loadAddresses();
            setPopupVisible(false);
            resetForm();
        } catch (error) {
            console.error('Error creating or updating address:', error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteClick = (address) => {
        setDeletingAddress(address);
        setDeleteConfirmVisible(true);
    };

    const confirmDelete = async () => {
        if (deletingAddress) {
            try {
                await deleteAddress(deletingAddress._id);
                socket.emit('deleteAddress', deletingAddress._id);
                setAddresses((prevAddresses) => prevAddresses.filter(address => address._id !== deletingAddress._id));
                setDeleteConfirmVisible(false);
                setDeletingAddress(null);
            } catch (error) {
                console.error('Error deleting address:', error.message);
            }
        }
    };

    const loadAddresses = async (page = currentPage, searchTerm = '', sortBy = 'city', sortType = 'asc') => {
        try {
            const response = await fetchAddress(page, 10, searchTerm, sortBy, sortType);
            if (response && response.addresses) {
                setAddresses(response.addresses);
                setTotalPages(response.totalPages || 1);
            } else {
                setAddresses([]); 
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error.message);
        }
    };

    useEffect(() => {
        loadAddresses(currentPage, searchTerm, sortBy, sortType);
    }, [currentPage]);

    const cancelDelete = () => {
        setDeleteConfirmVisible(false);
        setDeletingAddress(null);
    };

    const handleEdit = (address) => {
        setIsEdit(true);
        setEditingAddress(address);
        setPopupVisible(true);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (field) => {
        const newSortType = (sortBy === field && sortType === 'asc') ? 'desc' : 'asc';
        setSortBy(field);
        setSortType(newSortType);
        loadAddresses(currentPage, searchTerm, field, newSortType);
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            loadAddresses(1, '');
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setCurrentPage(1);
        loadAddresses(1, searchTerm, sortBy, sortType);
    };

    return (
        <div className="container">
            <button className="btn1" onClick={handleButtonClick}>+ Create</button>
            <form className='search-form' onSubmit={handleSearch}>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </form>
            {isPopupVisible && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <button className="close-btn" onClick={handleClosePopup}>X</button>
                        <h2 className="h1">{isEdit ? "Edit Address" : "Create Address"}</h2>
                        <Formik
                            initialValues={{
                                city: isEdit ? editingAddress?.city : "",
                                state: isEdit ? editingAddress?.state : "",
                                country: isEdit ? editingAddress?.country : "",
                                pinCode: isEdit ? editingAddress?.pinCode : "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleAddressSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <label>
                                        City:
                                        <Field type="text" name="city" />
                                        <ErrorMessage name="city" component="div" className="error" />
                                    </label>
                                    <label>
                                        State:
                                        <Field type="text" name="state" />
                                        <ErrorMessage name="state" component="div" className="error" />
                                    </label>
                                    <label>
                                        Country:
                                        <Field type="text" name="country" />
                                        <ErrorMessage name="country" component="div" className="error" />
                                    </label>
                                    <label>
                                        PinCode:
                                        <Field
                                            type="text"
                                            name="pinCode"
                                            maxLength="6"
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/\D/g, '');
                                            }}
                                        />
                                        <ErrorMessage name="pinCode" component="div" className="error" />
                                    </label>
                                    <button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Submitting..." : isEdit ? "Update Address" : "Create Address"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
            {isDeleteConfirmVisible && (
                <div className="delete-confirm-overlay">
                    <div className="delete-confirm-box">
                        <p>Are you sure you want to delete this address?</p>
                        <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
                        <button className="confirm-btn" onClick={confirmDelete}>Ok</button>
                    </div>
                </div>
            )}
            {addresses.length > 0 ? (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th
                                    className={`sortable ${sortBy === 'city' ? (sortType === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                                    onClick={() => handleSortChange('city')}
                                >
                                    City
                                </th>
                                <th
                                    className={`sortable ${sortBy === 'state' ? (sortType === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                                    onClick={() => handleSortChange('state')}
                                >
                                    State
                                </th>
                                <th
                                    className={`sortable ${sortBy === 'country' ? (sortType === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                                    onClick={() => handleSortChange('country')}
                                >
                                    Country
                                </th>
                                <th
                                    className={`sortable ${sortBy === 'pinCode' ? (sortType === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                                    onClick={() => handleSortChange('pinCode')}
                                >
                                    PinCode
                                </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addresses.map((address) => (
                                <tr key={address._id}>
                                    <td>{address.city}</td>
                                    <td>{address.state}</td>
                                    <td>{address.country}</td>
                                    <td>{address.pinCode}</td>
                                    <td>
                                        <a href="#" className="btn2" onClick={() => handleEdit(address)}><MdModeEdit /></a>
                                        <a href="#" className="btn2" onClick={(e) => {
                                            e.preventDefault();
                                            handleDeleteClick(address);
                                        }}><MdDelete /></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            ) : (
                <div className="not">No Address Available</div>
            )}
        </div>
    );
};

export default Address;