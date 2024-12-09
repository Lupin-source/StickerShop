import React, { useState, useEffect } from 'react';
import Barcode from 'react-barcode'; 
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';  // Import the Spinner component from react-bootstrap
import './productComponent.css';
import { Link, useNavigate } from 'react-router-dom';

const AddProductComponent = () => {
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});
    const [validateForm, setValidateForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add state to track form submission

    const navigate = useNavigate();

    const generateProductCode = () => {
        return 'P-' + Math.floor(100000 + Math.random() * 900000);
    };

    useEffect(() => {
        const generatedBarcode = generateProductCode();
        setBarcode(generatedBarcode);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidateForm(true);
        setIsSubmitting(true); // Set to true when form submission starts

        try {
            const response = await fetch('http://127.0.0.1:8000/api/create_product', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    'product_barcode': barcode,
                    'product_name': name,
                    'product_description': description,
                    'product_amount': price,
                    'product_available_quantity': quantity,
                    'product_category': category,
                }), 
            });

            if(response.status === 201) {
                navigate('/dashboard');
            } else if(response.status === 422) {
                const backEndErrors = await response.json();
                setErrors(backEndErrors.validationErrors);
            }

        } catch (error) {
            console.error("An error occurred", error);
        } finally {
            setIsSubmitting(false); // Reset submission state after process completes
        }
    };

    const handleInputChange = (setter, errorName) => (event) => {
        setter(event.target.value);
        if(validateForm)
            setErrors((prev) => ({...prev, [errorName]: null}));
    }

    return (
        <div>
            <div className='fieldsContainer'>
                <h1 className='text-center'>Add Product</h1>
                <Form noValidate validated={validateForm} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Product Code (Barcode)</Form.Label>
                        <Form.Control type='text' value={barcode} readOnly />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Barcode</Form.Label>
                        <Barcode value={barcode} width={2} height={50}/> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={name} onChange={handleInputChange(setName, 'product_name')} isInvalid={!!errors.product_name} required/>
                        <Form.Control.Feedback type="invalid">{errors.product_name ? errors.product_name[0] : null}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' value={description} onChange={handleInputChange(setDescription, 'product_description')} isInvalid={!!errors.product_description} required/>
                        <Form.Control.Feedback type="invalid">{errors.product_description ? errors.product_description[0] : null}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' value={price} onChange={handleInputChange(setPrice, 'product_amount')} isInvalid={!!errors.product_amount} required/>
                        <Form.Control.Feedback type="invalid">{errors.product_amount ? errors.product_amount[0] : null}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type='number' value={quantity} onChange={handleInputChange(setQuantity, 'product_available_quantity')} isInvalid={!!errors.product_available_quantity} required/>
                        <Form.Control.Feedback type="invalid">{errors.product_available_quantity ? errors.product_available_quantity[0] : null}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={category} onChange={handleInputChange(setCategory, 'product_category')} isInvalid={!!errors.product_category} required>
                            <option value="">Select Category</option>
                            <option value="Sneakers">Sneakers</option>
                            <option value="Loafers">Loafers</option>
                            <option value="Cycling Shoes">Cycling Shoes</option>
                            <option value="Sandals">Sandals</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.product_category ? errors.product_category[0] : null}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="submitContainer mt-4">
                        <button className="btn btn-primary" type='submit' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Spinner animation="border" size="sm" /> Submitting...
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

export default AddProductComponent;
