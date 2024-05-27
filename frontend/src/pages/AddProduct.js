import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('XL');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            productName,
            price,
            size,
            image
        };
        console.log(product);
        // Add logic to send the product to the server

        navigate("/");
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="add-product-page">
            <div className="add-product-container">
                <form onSubmit={handleSubmit}>
                    <h2>Add product to your shop</h2>
                    <div className="add-product-form-group">
                        <label htmlFor="productName">Product name</label>
                        <input type="text" id="productName" name="productName" placeholder="Enter your Product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="add-product-form-group">
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" name="price" placeholder="Enter your Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="add-product-form-group">
                        <label htmlFor="size">Size</label>
                        <select id="size" name="size" value={size} onChange={(e) => setSize(e.target.value)}>
                            <option value="XL">XL</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
                            <option value="S">S</option>
                            <option value="XS">XS</option>
                        </select>
                    </div>
                    <div className="add-product-form-group">
                        <label htmlFor="image">Select image</label>
                        <input type="file" id="image" name="image" onChange={handleImageChange} />
                    </div>
                    <div className="add-product-form-buttons">
                        <button type="submit" className="add-product-button">Add</button>
                        <button type="button" className="add-product-cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
                {imagePreview && (
                    <div className="add-product-image-preview">
                        <img src={imagePreview} alt="Product Preview" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddProduct;
