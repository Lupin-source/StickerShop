import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCreditCard, FaCashRegister } from 'react-icons/fa'; // Importing icons

const CheckoutComponent = () => {
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        address: '',
        phone: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
    const [successMessage, setSuccessMessage] = useState('');
    const userName = localStorage.getItem('userName');
    const userPhone = localStorage.getItem('userPhone');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchCart = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            const data = await response.json();
            setCart(data.cart || []);
            
            const total = (data.cart || []).reduce((acc, item) => {
                const price = parseFloat(item.amount) || 0;
                return acc + (price * item.quantity);
            }, 0);
            setGrandTotal(total);
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to load cart items.');
        }
    }, [userId]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    useEffect(() => {
        setShippingDetails({
            name: userName || '',
            address: '',
            phone: userPhone || '',
        });
    }, [userName, userPhone]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckout = () => {
        if (!shippingDetails.address) {
            alert('Please provide a shipping address.');
            return;
        }

        setSuccessMessage('Order confirmed! Thank you for your purchase.');
        clearCart();
        setTimeout(() => navigate('/productcart'), 3000);
    };

    const clearCart = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/clear/${userId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to clear the cart.');
            }

            console.log('Cart cleared successfully!');
        } catch (error) {
            console.error('Error clearing the cart:', error.message);
        }
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Checkout</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Link to="/productcart" className="btn btn-outline-secondary mb-3">Back</Link>
            <Stack gap={4}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <Card.Title className="fw-bold">Shipping Details</Card.Title>
                        <Row>
                            <Col md={4}>
                                <Card.Text>
                                    <strong>{userName}</strong><br />
                                    <strong>{userPhone}</strong>
                                </Card.Text>
                            </Col>
                            <Col md={8}>
                                <Form.Group>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address"
                                        value={shippingDetails.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter your shipping address"
                                        required
                                        className="border-0 shadow-sm"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title class Name="fw-bold">Products Ordered</Card.Title>
                        {cart.map(item => {
                            const price = parseFloat(item.amount) || 0;
                            return (
                                <Card key={item.id} className="mb-3">
                                    <Card.Body>
                                        <Row>
                                            <Col md={8}>
                                                <Card.Text>{item.name} (Quantity: x{item.quantity} )</Card.Text>
                                            </Col>
                                            <Col md={4} className="text-end">
                                                <Card.Text>₱{price.toFixed(2)}</Card.Text>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Card.Body>
                </Card>
                <Card className="shadow-sm">
                    <Card.Body>
                        <Card.Title className="fw-bold">Payment Method</Card.Title>
                        <Form.Group>
                            <Form.Label>Select Payment Method</Form.Label>
                            <Form.Select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="border-0 shadow-sm"
                            >
                                <option value="cash-on-delivery">
                                    <FaCashRegister className="me-2" /> Cash on Delivery
                                </option>
                                <option value="credit-card">
                                    <FaCreditCard className="me-2" /> Credit Card
                                </option>
                            </Form.Select>
                        </Form.Group>
                        <Row className="mt-3">
                            <Col md={8}>
                                <Card.Text className="text-end">
                                    <strong>Order Total: ₱{grandTotal.toFixed(2)}</strong>
                                </Card.Text>
                            </Col>
                            <Col md={4}>
                                <Button variant="primary" size="lg" onClick={handleCheckout} className="w-100">
                                    Confirm Order
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Stack>
        </Container>
    );
};

export default CheckoutComponent;