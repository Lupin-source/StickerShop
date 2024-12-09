import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserNavComponent from "./UserNavComponent";

const UserViewProductComponent = () => {
    const [viewProduct, setViewProduct] = useState({});
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cartCount, setCartCount] = useState(0); // Local cart count state
    const { id } = useParams();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/view_product/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setViewProduct(data);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        const fetchCartCount = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/cart/count/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cart count');
                }
                const data = await response.json();
                setCartCount(data.count); // Set initial cart count
            } catch (error) {
                console.error("Error fetching cart count: ", error);
            }
        };

        fetchProduct();
        fetchCartCount(); // Fetch cart count on component mount
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: viewProduct.id,
                    user_id: userId,
                    name: viewProduct.product_name,
                    amount: viewProduct.product_amount,
                    quantity: 1,
                }),
            });

            if (!response.ok) throw new Error('Failed to add product to cart');

            const cartData = await response.json();
            setFeedbackMessage(`${viewProduct.product_name} has been added to your cart!`);

            // Fetch the updated cart count
            const countResponse = await fetch(`http://127.0.0.1:8000/api/cart/count/${userId}`);
            if (!countResponse.ok) {
                throw new Error('Failed to fetch updated cart count');
            }
            const countData = await countResponse.json();
            setCartCount(countData.count); // Update local cart count

            setTimeout(() => setFeedbackMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <UserNavComponent cartCount={cartCount} />
            <Container>
                <Link to="/productlist" className="btn btn-outline-secondary mb-3">Back</Link>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {feedbackMessage && <div className="alert alert-success">{feedbackMessage}</div>}
                <Row>
                    <Col md={8}>
                        <h3>{viewProduct.product_name}</h3>
                        <p>{viewProduct.product_description}</p>
                        <p>Price: ₱{parseFloat(viewProduct.product_amount).toFixed(2)}</p>
                        <p>Available Quantity: {viewProduct.product_available_quantity}</p>
                        <p>Category: {viewProduct.product_category}</p>
                        <button
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                            disabled={viewProduct.product_available_quantity <= 0}
                        >
                            {viewProduct.product_available_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserViewProductComponent;