import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Alert, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const CartComponent = () => {
    const [cart, setCart] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [uniqueProductCount, setUniqueProductCount] = useState(0);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

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

            const countResponse = await fetch(`http://127.0.0.1:8000/api/cart/count/${userId}`);
            if (!countResponse.ok) {
                throw new Error('Failed to fetch unique product count');
            }
            const countData = await countResponse.json();
            setUniqueProductCount(countData.count);
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to load cart items.');
        }
    }, [userId]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleRemove = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/remove/${userId}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }
            fetchCart();
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to remove item from cart.');
        }
    };

    const handleUpdateQuantity = async (id, quantity) => {
        if (quantity < 1) return;
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/update/${userId}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity }),
            });
            if (!response.ok) {
                throw new Error('Failed to update item quantity');
            }
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            );
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to update item quantity.');
        }
    };

    const goToCheckout = () => {
        navigate('/checkout');
    };

    const goBack = () => {
        navigate('/productlist');
    };

    return (
        <Container>
            <Row className="align-items-center">
                <Col>
                    <h2 className="my-4">Your Cart</h2> 
                </Col>
                <Col className="text-end">
                    <Button onClick={() => goBack()}> Back </Button>
                </Col>
            </Row>
            
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {cart.length > 0 && (
                <Button variant="primary" className="mb-3" onClick={goToCheckout}>
                    Proceed to Checkout
                </Button>
            )}
            {cart.length === 0 ? (
                <Alert variant="info">Your cart is empty.</Alert>
            ) : (
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price per Item</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => {
                                const price = parseFloat(item.amount) || 0;
                                const totalPrice = price * item.quantity;

                                return (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>
                                            <InputGroup>
                                                <FormControl
                                                    type="number"
                                                    value={item.quantity}
                                                    min="1"
                                                    onChange={(e) =>
                                                        handleUpdateQuantity(item.id, parseInt(e.target.value, 10))
                                                    }
                                                />
                                            </InputGroup>
                                        </td>
                                        <td>₱{price.toFixed(2)}</td>
                                        <td>₱{totalPrice.toFixed(2)}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </>
            )}
            <Row>
                <Col className="text-end">
                    <h3>Grand Total: ₱{grandTotal.toFixed(2)}</h3>
                </Col>
            </Row>
        </Container>
    );
};

export default CartComponent;