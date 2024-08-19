"use client";

import React from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./ProductDetail.module.scss";
import { useAppStore } from "../../../../store";
import { Product } from "../../../../store";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { toast } from 'react-toastify'; // Importa `toast` de `react-toastify`

type ProductDetailProps = {
    params: {
        id: string;
    };
};

const fetchProductById = async (id: string) => {
    try {
        const response = await axios.get(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw new Error("Failed to fetch product details");
    }
};

const ProductDetail = ({ params }: ProductDetailProps) => {
    const { id } = params;
    const [product, setProduct] = React.useState<Product | null>(null);
    const { addToCart, cart } = useAppStore();
    
    const productInCart = cart.find(item => item.id === id);
    const [localCount, setLocalCount] = React.useState<number>(productInCart?.quantity || 1);

    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await fetchProductById(id);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id]);

    React.useEffect(() => {
        setLocalCount(productInCart?.quantity || 1);
    }, [productInCart]);

    const handleIncrementCount = () => {
        setLocalCount(prevCount => Math.min(prevCount + 1, 10));
    };

    const handleDecrementCount = () => {
        setLocalCount(prevCount => Math.max(prevCount - 1, 1));
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, localCount);
            toast.success(`${product.name} added to cart!`); // Muestra una notificación de éxito
        }
    };

    if (!product) return null;

    return (
        <div className={styles.product_detail}>
            <div className={styles.image_section}>
                <Image src={product.image} alt={product.name} width={400} height={400} />
            </div>
            <div className={styles.details_section}>
                <p className={styles.rating}>⭐ {product.rating} ({product.reviews_number.toLocaleString()} User feedback)</p>
                <h1>{product.name}</h1>
                <p className={styles.price}>
                    {product.discount > 0 ? (
                        <>
                            <span className={styles.discounted_price}>
                                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                            {" "}
                            <span className={styles.original_price}>${product.price}</span>
                            {" "}
                            <span className={styles.tag}>
                                {product.discount}% OFF
                            </span>
                        </>
                    ) : (
                        <span>${product.price}</span>
                    )}
                </p>

                <p>{product.summary}</p>
                
                <div className={styles.action_buttons}>
                    <div className={styles.item_count}>
                        <button className={styles.count_button} onClick={handleDecrementCount}>-</button>
                        <span className={styles.count_display}>{localCount}</span>
                        <button className={styles.count_button} onClick={handleIncrementCount}>+</button>
                    </div>
                    <button className={styles.add_to_cart} onClick={handleAddToCart}>
                        <MdOutlineLocalGroceryStore style={{ marginRight: '8px' }} />
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
