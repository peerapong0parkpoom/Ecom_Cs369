import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shop.css';

function HomePage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    //api logic start here
    useEffect(() => {
        fetch('http://localhost:4000/api/v1/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleDetailClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="marketplace">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <div>{product.image}</div>
                    <h3>{product.productName}</h3>
                    <p>Price: ${product.price}</p>
                    <p>Size: {product.size}</p>
                    <button onClick={() => handleDetailClick(product.id)}>Detail</button>
                </div>
            ))}
        </div>
    );
}

export default HomePage;
