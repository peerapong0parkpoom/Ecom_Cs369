import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import './Detail.css';

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/api/v1/products/${id}`) 
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <div className="product-image">
                <img src={product.image_url} alt={product.product_name} />
            </div>
            <h3>{product.product_name}</h3>
            <p>Price: ${product.price}</p>
            <p>Size: {product.size}</p>
        </div>
    );
}

export default ProductDetailPage;
