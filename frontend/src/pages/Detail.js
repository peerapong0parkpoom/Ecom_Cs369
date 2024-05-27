import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <div>{product.image}</div>
            <h3>{product.productName}</h3>
            <p>Price: ${product.price}</p>
            <p>Size: {product.size}</p>
        </div>
    );
}

export default ProductDetailPage;
