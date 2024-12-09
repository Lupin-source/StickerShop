import React, { useState, useEffect } from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import './dashboardComponent.css';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Barcode from 'react-barcode';
const ViewProductFrame = () => {
    const [viewProduct, setViewProduct] = useState([]);
    const { id } = useParams();
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories);
    };
    useEffect(() => {    
        fetch(`http://127.0.0.1:8000/api/view_product/${id}`)
          .then(response => response.json())
          .then(data => setViewProduct(data))
          .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    return (
        <div className="dashboardLayout">
            <SidebarComponent onCategoryChange={handleCategoryChange} />
            <TopbarComponent />
            <div className="dashboardContent">
                <div className="productGrid">
                    <div className="productView align-items-center">
                        <Container>
                        <Link to="/dashboard" className='btn btn-outline-secondary' style={{ textDecoration: 'none', color: 'inherit' }}>
                            Back to Dashboard
                        </Link>
                        <Row className="mt-4">
                            {viewProduct.product_barcode && (
                                    <div>
                                        <Barcode value={viewProduct.product_barcode}  width={3} height={50}/>
                                    </div>
                            )}
                            <Col>
                                <hr/>
                                <label>Product Name: {viewProduct.product_name}</label><br />
                                <label>Description: {viewProduct.product_description}</label><br />
                                <label>Price: ₱{parseFloat(viewProduct.product_amount).toFixed(2)}</label><br />
                                <label>Category: {viewProduct.product_category}</label><br />
                                <label>Quantity: {viewProduct.product_available_quantity}</label><br />
                                <hr/>
                                <p>{viewProduct.item_description}</p>
                            </Col>
                        </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductFrame;
