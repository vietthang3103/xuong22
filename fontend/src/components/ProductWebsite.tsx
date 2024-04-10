import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { IProduct } from '../interfaces/product';
import { Link } from 'react-router-dom';

const ProductWebsite = () => {
    const { data } = useQuery({
        queryKey: ['PRODUCTS'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/products`);
            return data.products;
        },
    });

    return (
        <div>
            {data?.map((product: IProduct, index: number) => (
                <section key={index} className="news">
                    <div className="container">
                        <div className="section-heading">
                            <h2 className="section-heading__title">New</h2>
                        </div>
                        <div className="section-body">
                            <div className="product-list">
                                <div className="product-item">
                                    <div className="product-image">
                                        <img src={product.image} className="product__thumbnail" />
                                        <span className="product-sale">30%</span>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product__name">
                                            <a className="product__link">{product.name}</a>
                                        </h3>
                                        <a className="product__category">{product.description}</a>
                                        <div className="product-price">
                                            <span className="product-price__new">{product.price}</span>
                                            <span className="product-price__old">{product.price}</span>
                                        </div>
                                    </div>
                                    <div className="product-actions">
                                        <Link
                                            to={`products/${product._id}`}
                                            className="btn product-action__quickview">
                                            Quick View
                                        </Link>
                                        <div className="product-actions-more">
                                            <span className="product-action__share">Share</span>
                                            <span className="product-action__compare">Compare</span>
                                            <span className="product-action__like">Like</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}

export default ProductWebsite;