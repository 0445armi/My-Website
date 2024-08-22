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
    deleteProduct,
    fetchProducts,
    createProduct,
    updateProduct
} from "../../axios/api";
import {
    MdModeEdit,
    MdDelete
} from "react-icons/md";
import { BASE_URL } from "../../store/config";
import Pagination from "../pagination";
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const validationSchema = Yup.object({
    name: Yup.string().required("Name required"),
    price: Yup.number().required("Price required").positive("Price must be positive"),
    category: Yup.string().required("Category required"),
    quantity: Yup.number().required("Quantity required").positive("Quantity must be positive"),
});

export const Product = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('name');
    const [sortType, setSortType] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const handleButtonClick = () => {
        setIsEdit(false);
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
        setEditingProduct(null);
    };

    const handleProductSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('category', values.category);
        formData.append('quantity', values.quantity);
        if (values.image) {
            formData.append('image', values.image);
        }
        try {
            let updatedProduct;
            if (isEdit && editingProduct) {
                const updatedFields = {};
                const originalValues = {
                    name: editingProduct.name,
                    price: editingProduct.price,
                    category: editingProduct.category,
                    quantity: editingProduct.quantity,
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
                updatedProduct = await updateProduct(editingProduct._id, updateFormData);
                socket.emit('updateProduct', updatedProduct);
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === editingProduct._id ? updatedProduct : product
                    )
                );
            } else {
                updatedProduct = await createProduct(formData);
                socket.emit('newProduct', updatedProduct);
                // setProducts((prevProducts) => [...prevProducts, updatedProduct]);
            }
            await loadProducts();
            setPopupVisible(false);
            resetForm();
        } catch (error) {
            console.error('Error creating or updating product:', error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteClick = (product) => {
        setDeletingProduct(product);
        setDeleteConfirmVisible(true);
    };

    const confirmDelete = async () => {
        if (deletingProduct) {
            try {
                await deleteProduct(deletingProduct._id);
                socket.emit('deleteProduct', deletingProduct._id);
                setProducts((prevProducts) => prevProducts.filter(product => product._id !== deletingProduct._id));
                setDeleteConfirmVisible(false);
                setDeletingProduct(null);
            } catch (error) {
                console.error('Error deleting product:', error.message);
            }
        }
    };

    const loadProducts = async (page = currentPage, searchTerm = '', sortBy = 'name', sortType = 'asc') => {
        try {
            const response = await fetchProducts(page, searchTerm, sortBy, sortType);
            if (response && response.products) {
                setProducts(response.products);
                setTotalPages(response.totalPages || 1);
            } else {
                setProducts([]); 
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    useEffect(() => {
        loadProducts(currentPage);
        socket.on('newProduct', (newProduct) => {
            if (newProduct?._id) {
                setProducts((prevProducts) => [...prevProducts, newProduct]);
            }
        });
        socket.on('updateProduct', (updatedProduct) => {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
        });
        socket.on('deleteProduct', (deletedProductId) => {
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== deletedProductId)
            );
        });
        return () => {
            socket.off('newProduct');
            socket.off('updateProduct');
            socket.off('deleteProduct');
        };
    }, [currentPage]);

    const cancelDelete = () => {
        setDeleteConfirmVisible(false);
        setDeletingProduct(null);
    };

    const handleEdit = (product) => {
        setIsEdit(true);
        setEditingProduct(product);
        setPopupVisible(true);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (field) => {
        const newSortType = (sortBy === field && sortType === 'asc') ? 'desc' : 'asc';
            setSortBy(field);
            setSortType(newSortType);
            loadProducts(currentPage, searchTerm, field, newSortType); 
    };
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            loadProducts(1, '');
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setCurrentPage(1);
        loadProducts(1, searchTerm, sortBy, sortType);
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
                        <h2 className="h1">{isEdit ? "Edit Product" : "Create Product"}</h2>
                        <Formik
                            initialValues={{
                                name: isEdit ? editingProduct?.name : "",
                                price: isEdit ? editingProduct?.price : "",
                                category: isEdit ? editingProduct?.category : "",
                                quantity: isEdit ? editingProduct?.quantity : "",
                                image: null,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleProductSubmit}
                        >
                            {({ setFieldValue, isSubmitting }) => (
                                <Form>
                                    <label>
                                        Name:
                                        <Field type="text" name="name" />
                                        <ErrorMessage name="name" component="div" className="error" />
                                    </label>
                                    <label>
                                        Price:
                                        <Field type="number" name="price" />
                                        <ErrorMessage name="price" component="div" className="error" />
                                    </label>
                                    <label>
                                        Category:
                                        <Field as="select" name="category">
                                            <option value="">Select a category</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="home">Home</option>
                                        </Field>
                                        <ErrorMessage name="category" component="div" className="error" />
                                    </label>
                                    <label>
                                        Quantity:
                                        <Field type="number" name="quantity" />
                                        <ErrorMessage name="quantity" component="div" className="error" />
                                    </label>
                                    <label>
                                        Image:
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={(event) => {
                                                setFieldValue("image", event.currentTarget.files[0]);
                                            }}
                                        />
                                        <ErrorMessage name="image" component="div" className="error" />
                                    </label>
                                    <button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Submitting..." : isEdit ? "Update Product" : "Create Product"}
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
                        <p>Are you sure you want to delete this product?</p>
                        <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
                        <button className="confirm-btn" onClick={confirmDelete}>Ok</button>
                    </div>
                </div>
            )}
            {products.length > 0 ? (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th
                                    className={`sortable ${sortBy === 'name' ? (sortType === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                                    onClick={() => handleSortChange('name')}
                                >
                                    Product Name
                                </th>
                                <th
                                    className={`sortable ${sortBy === 'price' ? (sortType === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                                    onClick={() => handleSortChange('price')}
                                >
                                    Price
                                </th>
                                <th
                                    className={`sortable ${sortBy === 'category' ? (sortType === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                                    onClick={() => handleSortChange('category')}
                                >
                                    Category
                                </th>
                                <th
                                    className={`sortable ${sortBy === 'quantity' ? (sortType === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}`}
                                    onClick={() => handleSortChange('quantity')}
                                >
                                    Quantity
                                </th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        {product.image ? (
                                            <img
                                                src={`${BASE_URL}/uploads/${product.image}`}
                                                alt={product.name}
                                                className="product-image"
                                                style={{ width: '100px', height: 'auto' }}
                                            />
                                        ) : (
                                            'No image'
                                        )}
                                    </td>
                                    <td>
                                        <a href="#" className="btn2" onClick={() => handleEdit(product)}><MdModeEdit /></a>
                                        <a href="#" className="btn2" onClick={(e) => {
                                            e.preventDefault();
                                            handleDeleteClick(product);
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
                <div className="not">No Products Available</div>
            )}
        </div>
    );
};

export default Product;