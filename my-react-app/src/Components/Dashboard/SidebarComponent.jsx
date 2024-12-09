import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './dashboardComponent.css';
import { Spinner } from 'react-bootstrap'; // Import Bootstrap's Spinner

const SidebarComponent = ({ onCategoryChange  }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [disabled, setDisabled] = useState(false); 
    const [loading, setLoading] = useState(false); 

    const categories = ['Sneakers', 'Loafers', 'Cycling Shoes', 'Sandals']; 

    useEffect(() => {
        // Disable checkboxes if not on the dashboard
        if (location.pathname === '/dashboard') {
            setDisabled(false); // Enable checkboxes when on the dashboard
        } else {
            setDisabled(true);
            setSelectedCategories([]); 
            onCategoryChange([]); 
        }
    }, [location.pathname, onCategoryChange]); // Dependency on pathname and onCategoryChange

    const handleLogout = async () => {
        setLoading(true); // Start loading
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        localStorage.removeItem('userPhone');
        
        // Simulate a delay for the logout process (optional)
        setTimeout(() => {
            setLoading(false); // Stop loading after sign out process
            navigate("/"); 
        }, 1500); // Simulate a delay of 1.5 seconds
    };

    const handleCategoryChange = (category) => {
        const newSelection = selectedCategories.includes(category)
            ? selectedCategories.filter(cat => cat !== category)
            : [...selectedCategories, category];

        setSelectedCategories(newSelection);
        onCategoryChange(newSelection); 
    };

    return (
        <div className='sidebar align-items-center'>
            <h1>ShoeFits</h1>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <h4>Categories</h4>
                    {categories.map((category, index) => (
                        <div key={index} className="form-check mb-2"> 
                            <input
                                type="checkbox"
                                id={category}
                                className="form-check-input"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                disabled={disabled} // Disable based on state
                                aria-label={`Select ${category}`} // Added accessibility
                            />
                            <label htmlFor={category} className="form-check-label ml-2">{category}</label> 
                        </div>
                    ))}
                </li>
                <li>
                    <button 
                        className="customButton" 
                        onClick={handleLogout} 
                        disabled={loading} // Disable button during loading
                    >
                        {loading ? (
                            <>
                                <Spinner 
                                    as="span" 
                                    animation="border" 
                                    size="sm" 
                                    role="status" 
                                    aria-hidden="true" 
                                />{' '}
                                ...
                            </>
                        ) : (
                            'Sign Out'
                        )}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SidebarComponent;