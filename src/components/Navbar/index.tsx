"use client";

import React from "react";
import { useAppStore } from "../../store";
import Link from "next/link";
import Icon from "../../../public/Icon/icon.webp";
import { FiShoppingCart } from "react-icons/fi";
import styles from "./Navbar.module.scss";
import Image from "next/image";

const Navbar = () => {
    const { cart } = useAppStore();

    // Calcula la cantidad total de artículos en el carrito
    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <div className={styles.brand}>
                        <Image
                            className={styles.icon_background}
                            src={Icon}
                            alt="Icon"
                            width={50}
                            height={50}
                        />
                        <Link href="/Home" className={styles.brandName}>
                            LeanShop
                        </Link>
                    </div>
                    <div className={styles.card}>
                        <Link href="/cart" className={styles.cart_link}>
                            <FiShoppingCart size={28} />
                            {totalItems > 0 && (
                                <div className={styles.cart_count}>
                                    {totalItems}
                                </div>
                            )}
                        </Link>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;
