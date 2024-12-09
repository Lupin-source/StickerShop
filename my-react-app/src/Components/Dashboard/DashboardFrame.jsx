import React, { useState, useEffect, useCallback } from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import './dashboardComponent.css';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteProductFrame from './DeleteProductFrame';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';

const DashboardFrame = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('product_amount');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/display_products')
            .then((response ) => {
                if (!response.ok) throw new Error('Failed to fetch products');
                return response.json();
            })
            .then((data) => {
                setAllProducts(data.products);
                setFilteredProducts(data.products);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const filterProducts = useCallback(() => {
        let filtered = [...allProducts];

        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) =>
                selectedCategories.includes(product.product_category)
            );
        }

        filtered = sortProducts(filtered);
        setFilteredProducts(filtered);
    }, [allProducts, searchTerm, selectedCategories, sortCriteria, sortOrder]);

    useEffect(() => {
        filterProducts();
    }, [searchTerm, selectedCategories, sortCriteria, sortOrder, filterProducts]);

    const sortProducts = (products) => {
        return products.sort((a, b) => {
            let comparison = 0;

            if (sortCriteria === 'product_amount') {
                comparison = a.product_amount - b.product_amount;
            } else if (sortCriteria === 'product_category') {
                comparison = a.product_category.localeCompare(b.product_category);
            } else if (sortCriteria === 'product_available_quantity') {
                comparison = a.product_available_quantity - b.product_available_quantity;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });
    };

    const handleSearch = (input) => {
        setSearchTerm(input);
    };

    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories);
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
        setSearchTerm('');
    };

    const handleProductDeleted = (deletedProductId) => {
        const updatedProducts = allProducts.filter((product) => product.id !== deletedProductId);
        setAllProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
    };
return (
    <div className="dashboardLayout">
        <SidebarComponent onCategoryChange={handleCategoryChange} />
        <TopbarComponent onSearch={handleSearch} />
        <div className="dashboardContent">
        <div className="sortingControls">
                   <select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
                       <option value="product_amount">Sort by Amount</option>
                       <option value="product_category">Sort by Category</option>
                       <option value="product_available_quantity">Sort by Quantity</option>
                   </select>
                  <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                     <option value="asc">Ascending</option>
                       <option value="desc">Descending</option>
                    </select>
               </div>
            <div className="productGrid">
                {filteredProducts.map(product => (
                    <div className="productCard" key={product.id}>
                        <div className="productInfo">
                            <label className='productInfo'>{product.product_name}</label>
                            <label className='productInfo'>Barcode: {product.product_barcode}</label>
                            <label className='productInfo'>Category: {product.product_category}</label>
                            <label>Quantity: {product.product_available_quantity}</label><br />
                            <label>₱{parseFloat(product.product_amount).toFixed(2)}</label>
                        </div>
                        <div className="productActions">
                            <ListGroup horizontal>
                            <ListGroup.Item variant="info">
                            <Link to={`/editproduct/${product.id}`} style={{ background: 'none', textDecoration: "none", color: 'inherit' }}>
                                 <FaEdit className="customIcon" /> {/* Edit Icon */}
                             </Link>
                            </ListGroup.Item>
                            <ListGroup.Item variant="success">
                            <Link to={`/viewproduct/${product.id}`} style={{ background: 'none', textDecoration: "none", color: 'inherit' }}>
                                <FaEye className="customIcon" /> {/* View Icon */}
                             </Link>
                            </ListGroup.Item>
                            <ListGroup.Item variant="danger">
                                 {/* Delete Button with Trash Icon */}
                                 <button onClick={() => handleDeleteClick(product)} style={{ background: 'none', border: 'none' }}>
                                      <FaTrashAlt className="customIcon" /> {/* Delete Icon */}
                                 </button>
                            </ListGroup.Item>

                            </ListGroup>
                        </div>
                    </div>
                ))}
            </div>

            {showDeleteModal && productToDelete && (
                <DeleteProductFrame
                    product={productToDelete}
                    handleClose={handleCloseModal}
                    onProductDeleted={handleProductDeleted}
                />
            )}
        </div>
    </div>
);    
};

export default DashboardFrame;