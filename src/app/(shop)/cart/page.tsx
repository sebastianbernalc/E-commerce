"use client";

import React from "react";
import Image from "next/image";
import { useAppStore } from "../../../store";
import styles from "./CartPage.module.scss";
import { TiDeleteOutline } from "react-icons/ti";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Icon from "../../../../public/Icon/icon.webp";

const CartPage = () => {
    const { removeFromCart, cart, incrementCount, decrementCount } = useAppStore();

    const handleRemoveFromCart = (productId: string) => {
        removeFromCart(productId);
    };

    const handleIncrementCount = (productId: string) => {
        incrementCount(productId);
    };

    const handleDecrementCount = (productId: string) => {
        decrementCount(productId);
    };

    // Calcula el sub-total con el precio original
    const originalSubTotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity ?? 0)), 0);

    // Calcula el sub-total con el descuento aplicado
    const discountedSubTotal = cart.reduce((acc, item) => {
        const discountedPrice = item.discount > 0
            ? (item.price * (1 - item.discount / 100))
            : item.price;
        return acc + (discountedPrice * (item.quantity ?? 0));
    }, 0);

    const discount = originalSubTotal - discountedSubTotal; // Calcula el descuento total aplicado
    const total = discountedSubTotal; // Total después de aplicar el descuento
    const breadcrumbPaths = [
        { label: "Home", href: "/" },
        { label: "Cart", href: "/cart" }
    ];

    return (
        <div>
            <Breadcrumb paths={breadcrumbPaths} />
            <div className={styles.container}>
                {cart.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <Image src={Icon} alt="Empty Cart" className={styles.emptyCartImage} height={350} width={350} />
                        <p className={styles.emptyCartText}>
                            Your cart is empty. Add products to your cart from the home page.
                        </p>
                    </div>

                ) : (
                    <div className={styles.cards}>
                        {cart.length === 0 ? (
                            <div className={styles.empty_cart}>
                                <Image src={Icon} alt="Empty Cart" width={200} height={200} />
                                <h2>Your cart is empty</h2>
                                <p>Add products to your cart from the home page.</p>
                            </div>
                        ) : (
                            <>
                                <div className={styles.main_card}>
                                    <h1>Shopping Cart</h1>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr className={styles.columns_div}>
                                                <th>Products</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item) => {
                                                const quantity = item.quantity ?? 0;
                                                const discountedPrice = item.discount > 0
                                                    ? (item.price * (1 - item.discount / 100)).toFixed(2)
                                                    : item.price.toFixed(2);

                                                return (
                                                    <tr key={item.id} className={styles.product_row}>
                                                        <td className={styles.products_info}>
                                                            <TiDeleteOutline className={styles.bottom_delete} onClick={() => handleRemoveFromCart(item.id)} />
                                                            <Image src={item.image} alt={item.name} width={50} height={50} />
                                                            <span style={{ marginLeft: "10px" }}>{item.name}</span>
                                                        </td>
                                                        <td className={styles.price_item}>
                                                            <span>
                                                                {item.discount > 0 && (
                                                                    <>
                                                                        <span className={styles.discounted_price}>
                                                                            ${((item.price * (1 - item.discount / 100)).toFixed(2))}
                                                                        </span>
                                                                        <span className={styles.original_price}>
                                                                            ${item.price}
                                                                        </span>
                                                                    </>
                                                                )}
                                                                {item.discount <= 0 && (
                                                                    <span>
                                                                        ${item.price}
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </td>
                                                        <td className={styles.item_count}>
                                                            <button className={styles.count_button} onClick={() => handleDecrementCount(item.id)}>-</button>
                                                            <span className={styles.count_display}>{quantity}</span>
                                                            <button className={styles.count_button} onClick={() => handleIncrementCount(item.id)}>+</button>
                                                        </td>
                                                        <td className={styles.subtotal_item}>
                                                            <span>
                                                                {item.discount > 0 ? (
                                                                    <>
                                                                        <span className={styles.discounted_price}>
                                                                            ${((item.price * (1 - item.discount / 100)).toFixed(2))}
                                                                        </span>
                                                                    </>
                                                                ) : (
                                                                    <span>
                                                                        ${item.price.toFixed(2)}
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.card_totals}>
                                    <h1>Card Totals</h1>
                                    <div className={styles.info_total}>
                                        <div className={styles.info_item}>
                                            <p className={styles.label}>Sub-total (Original):</p>
                                            <p className={styles.value}>${originalSubTotal.toFixed(2)}</p>
                                        </div>
                                        <div className={styles.info_item}>
                                            <p className={styles.label}>Discount:</p>
                                            <p className={styles.value}>-${discount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className={styles.separator}></div>
                                    <p className={styles.total}>Total: ${total.toFixed(2)}</p>
                                    <button className={styles.checkout_button}>PROCEED TO CHECKOUT →</button>
                                </div>
                            </>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default CartPage;
