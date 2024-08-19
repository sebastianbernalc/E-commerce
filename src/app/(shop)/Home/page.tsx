"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAppStore } from "../../../store"; // Importa el store Zustand
import styles from "./Homepage.module.scss";
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Usa `useRouter` de 'next/navigation'
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { toast } from 'react-toastify'; // Importa toast

interface Product {
    id: string;
    name: string;
    price: number;
    discount: number;
    rating: number;
    reviews_number: number;
    summary: string;
    image: string;
}

const Homepage = () => {
    const router = useRouter();
    const { setProducts, addToCart } = useAppStore(); // Accede a la función para establecer productos y agregar al carrito en el store

    const { data, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    useEffect(() => {
        if (data) {
            setProducts(data); // Guarda los productos en el store cuando se obtienen correctamente
        }
    }, [data, setProducts]);

    if (error) return <p>Error loading products</p>;

    const featuredProduct = data?.[0];
    const productList = data?.slice(1);

    const handleViewDetails = (id: string) => {
        console.log(`Viewing product details for product ID: ${id}`);
        router.push(`/product/${id}`);
    };

    const handleAddToCart = (product: Product) => {
        addToCart(product, 1); 
        toast.success('Item added to cart'); 
    };

    return (
        <div className={styles.images_list}>
            {featuredProduct && (
                <div className={styles.higher_image}>
                    <div className={styles.image_main}>
                        {featuredProduct.discount > 0 && (
                            <span className={styles.tag}>
                                {featuredProduct.discount}% OFF
                            </span>
                        )}
                        <Image src={featuredProduct.image} alt={featuredProduct.name} width={280} height={268} />
                        <div className={styles.icon_overlay}>
                            <div className={styles.icon}><FaHeart /></div>
                            <div className={styles.icon} onClick={() => handleAddToCart(featuredProduct)}>
                                <FaShoppingCart />
                            </div>
                            <div className={styles.icon} onClick={() => handleViewDetails(featuredProduct.id)}>
                                <FaEye />
                            </div>
                        </div>
                    </div>
                    <div className={styles.rating}>★★★★★ ({featuredProduct.reviews_number.toLocaleString()})</div>
                    <h3>{featuredProduct.name}</h3>
                    <p>
                        {featuredProduct.discount > 0 && (
                            <>
                                <span className={styles.discounted_price}>
                                    ${((featuredProduct.price * (1 - featuredProduct.discount / 100)).toFixed(2))}
                                </span>
                                <span className={styles.original_price}>
                                    ${featuredProduct.price}
                                </span>
                            </>
                        )}
                        {featuredProduct.discount <= 0 && (
                            <span>
                                ${featuredProduct.price}
                            </span>
                        )}
                    </p>
                    <p>Descripcion: {featuredProduct.summary}</p>
                    <button className={styles.buy_button} onClick={() => handleAddToCart(featuredProduct)}>
                        <MdOutlineLocalGroceryStore style={{ marginRight: '5px' }} /> ADD TO CART
                    </button>
                </div>
            )}
            <div className={styles.product_list}>
                {productList?.map((product: Product) => (
                    <div className={styles.product} key={product.id}>
                        <div className={styles.image_product}>
                            {product.discount > 0 && (
                                <span className={styles.tag}>
                                    {product.discount}% OFF
                                </span>
                            )}
                            <Image src={product.image} alt={product.name} width={190} height={190} />
                            <div className={styles.icon_overlay}>
                                <div className={styles.icon}><FaHeart /></div>
                                <div className={styles.icon} onClick={() => handleAddToCart(product)}>
                                    <FaShoppingCart />
                                </div>
                                <div className={styles.icon} onClick={() => handleViewDetails(product.id)}>
                                    <FaEye />
                                </div>
                            </div>
                        </div>
                        <h3>{product.name}</h3>
                        <p>
                            {product.discount > 0 && (
                                <>
                                    <span className={styles.discounted_price}>
                                        ${((product.price * (1 - product.discount / 100)).toFixed(2))}
                                    </span>
                                    <span className={styles.original_price}>
                                        ${product.price}
                                    </span>
                                </>
                            )}
                            {product.discount <= 0 && (
                                <span>
                                    ${product.price}
                                </span>
                            )}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;

async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await axios.get('/api/products');
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch products");
    }
}
