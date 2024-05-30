import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`/api/v1/products/${id}`) 
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <div className="product-image">
                    <img src={product.image_url} alt={product.product_name} />
                </div>
                <div className="product-info">
                    <h3>Product: {product.product_name}</h3>
                    <div className="product-detail">
                        <div className="detail-item">
                            <span className="detail-label">Price:</span>
                            <span className="detail-value">${product.price}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Size:</span>
                            <span className="detail-value">{product.size}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
