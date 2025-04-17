import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8080/products");
        setProducts(result.data);
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:8080/product/${id}`);
        loadProducts();
    };

    return (
        <div className='container'>
            <div className='py-4'>
                <div className='product-grid'>
                    {products.map((product, index) => (
                        <div key={index} className='card'>
                            <div className='card-body'>
                                <div className='image-container'>
                                    {product.image ? (
                                        <img src={product.image} alt={product.productName} className='card-img-top' />
                                    ) : (
                                        <div className='no-image'>Фото нет</div>
                                    )}
                                </div>
                                <h5 className='card-title'>{product.productName}</h5>
                                <h6 className='card-subtitle mb-2 text-muted'>Цена: {product.price} руб.</h6>
                                <p className='card-text'>На складе: {product.stockQuantity}</p>
                                <div className='button-container'>
                                    <button className='btn btn-primary'>View</button>
                                    <Link className='btn btn-outline-primary' to={`/editproduct/${product.productId}`}>Edit</Link>
                                    <button className='btn btn-danger' onClick={() => deleteProduct(product.productId)}>Delete</button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
}