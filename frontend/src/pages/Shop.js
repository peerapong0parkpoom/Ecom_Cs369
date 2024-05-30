import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shop.css';

function HomePage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    //api logic start here
    useEffect(() => {
        fetch('/api/v1/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleDetailClick = (id) => {
        console.log("this id show :" , id);
        navigate(`/product/${id}`);
    };

    return (
        <div className="marketplace">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <div><img src={product.image_url} alt={product.product_name} /></div>
                    <h3>{product.product_name}</h3>
                    <p>Price: ${product.price}</p>
                    <button onClick={() => handleDetailClick(product.product_id)}>Detail</button>
                </div>
            ))}
        </div>
    );
}

export default HomePage;