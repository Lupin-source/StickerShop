import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import logo from './logo.png'; // Import your logo image
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon

const UserNavComponent = ({ handleSearch, cartCount }) => {
  const location = useLocation();
  const showSearchBar = location.pathname === '/productlist';

  return (
    <Navbar bg="transparent" expand="lg" className="mb-4">
      <Container className="d-flex align-items-center justify-content-between mt-3">
        <div className="d-flex align-items-center"> 
          <img src={logo} alt="ShoeFits Logo" className="me-2 logo-image" /> 
          <Navbar.Brand as={Link} to="/productlist" className="me-auto">
            <strong>ShoeFITS</strong>
          </Navbar.Brand>
        </div>

        {showSearchBar && (
          <Form className="d-flex mx-auto" style={{ flexGrow: 1, maxWidth: '380px' }}>
            <Form.Control
              type="search"
              placeholder="🔎︎ Search for a product"
              className="me-2"
              style={{ width: '100%', height: '38px', fontSize: '1rem' }}
              onChange={handleSearch} 
            />
          </Form>
        )}

        <Link to="/productcart" className="btn btn-outline-dark btn-sm ms-auto">
          <FaShoppingCart className="me-2" /> 
          {cartCount > 0 && <span className="badge bg-danger ms-2">{cartCount}</span>}
        </Link>
      </Container>
    </Navbar>
  );
};

export default UserNavComponent;