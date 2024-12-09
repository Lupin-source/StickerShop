import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './CustomStyle.css';
import { Spinner } from 'react-bootstrap';

const UserSideNavComponent = ({ onCategoryChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const categories = ['Sneakers', 'Loafers', 'Cycling Shoes', 'Sandals'];
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // New state for loading spinner

  useEffect(() => {
    if (location.pathname === "/productlist") {
      setDisabled(false);
    } else {
      setDisabled(true);
      setSelectedCategories([]);
      onCategoryChange([]); // Reset the categories when not on the correct page
    }
  }, [location.pathname, onCategoryChange]);

  const handleCategoryChange = (category) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelection);
    onCategoryChange(newSelection); // Notify parent component about the category change
  };

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

  return (
    <div className="sidebar2">
      <ul>
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
                disabled={disabled}
              />
              <label htmlFor={category} className="form-check-label ml-2">
                {category}
              </label>
            </div>
          ))}
        </li>
      </ul>

    <button 
      className="customButtonFront" 
      onClick={handleLogout} 
      disabled={loading} 
    >
    {loading ? (
      <>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>{' '}
          ...
          </>
          ) : (
          'Sign Out'
          )}
      </button>
    </div>
  );
};

export default UserSideNavComponent;
