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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('size', size);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:4000/api/v1/products', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate("/");
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
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
