import React, {useState} from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import AddProductComponent from '../Product Management/AddProductComponent';
import './dashboardComponent.css';

const AddProductFrame = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories);
    };
    return (
        <div className="dashboardLayout">
            <SidebarComponent onCategoryChange={handleCategoryChange} />
            <TopbarComponent />
            <div className="dashboardContent">
                <AddProductComponent/>
            </div>
        </div>
    );
};

export default AddProductFrame;
