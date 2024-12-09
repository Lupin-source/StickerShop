import React, { useEffect, useState } from 'react';
import './productComponent.css';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Barcode from 'react-barcode';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner from Bootstrap

const EditProductComponent = ({ productId }) => {
    const [viewProduct, setViewProduct] = useState([]);
    const [productName, setProductName] = useState(viewProduct.product_name);
    const [productDescription, setProductDescription] = useState(viewProduct.product_description);
    const [productPrice, setProductPrice] = useState(viewProduct.product_amount);
    const [productAvailableQuantity, setProductAvailableQuantity] = useState(viewProduct.product_available_amount);
    const [validatedForm, setValidatedForm] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false); // State for tracking submission status
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/view_product/${productId}`)
            .then(response => response.json())
            .then(data => {
                setViewProduct(data);
                setProductName(data.product_name);
                setProductDescription(data.product_description);
                setProductPrice(data.product_amount);
                setProductAvailableQuantity(data.product_available_quantity);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, [productId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidatedForm(true);
        setLoading(true); // Set loading to true when form submission starts

        const data = {
            product_name: productName,
            product_description: productDescription,
            product_amount: productPrice,
            product_available_quantity: productAvailableQuantity,
        };

        axios.put('http://127.0.0.1:8000/api/update_product/' + productId, data)
            .then(response => {
                setLoading(false); // Set loading to false after success
                navigate('/dashboard');
            })
            .catch(error => {
                setLoading(false); // Set loading to false if an error occurs
                if (error.response && error.response.status === 422) {
                    const backEndErrors = error.response.data.validationErrors;
                    setValidationErrors(backEndErrors);
                } else {
                    console.error('Error updating product: ', error);
                }
            });
    }

    const handleInputChange = (setter, errorName) => (event) => {
        setter(event.target.value);
        if (validatedForm)
            setValidationErrors((prev) => ({ ...prev, [errorName]: null }));
    }

    return (
        <div>
            <div className='fieldsContainer'>
                <h1 className='text-center'>Edit Product</h1>
                <Form noValidate validated={validatedForm} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Barcode:
                        <Barcode value={viewProduct.product_barcode} width={2} height={50} /></Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name: {viewProduct.product_name}</Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as='textarea'
                            placeholder={viewProduct.product_description}
                            value={productDescription}
                            onChange={handleInputChange(setProductDescription, 'product_description')}
                            isInvalid={!!validationErrors.product_description}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.product_description ? validationErrors.product_description[0] : null}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            step='any'
                            placeholder={viewProduct.product_amount}
                            value={productPrice}
                            onChange={handleInputChange(setProductPrice, 'product_amount')}
                            isInvalid={!!validationErrors.product_amount}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.product_amount ? validationErrors.product_amount[0] : null}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder={viewProduct.product_available_quantity}
                            value={productAvailableQuantity}
                            onChange={handleInputChange(setProductAvailableQuantity, 'product_available_quantity')}
                            isInvalid={!!validationErrors.product_available_quantity}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{validationErrors.product_available_quantity ? validationErrors.product_available_quantity[0] : null}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="submitContainer">
                        <button className="btn btn-primary" type='submit' disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> ...
                                </>
                            ) : 'Submit'}
                        </button>
                        <Link to="/dashboard" className="btn btn-secondary" role="button">Cancel</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditProductComponent;
