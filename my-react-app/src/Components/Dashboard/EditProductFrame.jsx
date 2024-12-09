import React,{useState} from 'react';
import SidebarComponent from './SidebarComponent';
import TopbarComponent from './TopbarComponent';
import EditProductComponent from '../Product Management/EditProductComponent';
import { useParams } from 'react-router-dom';
import './dashboardComponent.css';

const EditProductFrame = () => {
    const { id } = useParams();
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories);
    };
    return (
        <div className="dashboardLayout">
            <SidebarComponent onCategoryChange={handleCategoryChange} />
            <TopbarComponent />
            <div className="dashboardContent">
                <EditProductComponent productId={id}/>
            </div>
        </div>
    );
};

export default EditProductFrame;
