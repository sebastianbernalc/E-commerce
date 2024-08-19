import Link from "next/link";
import Icon from "../../../public/Icon/icon.webp";
import { FiShoppingCart } from "react-icons/fi";
import styles from "./Navbar.module.scss";
import Image from "next/image";

const Navbar = () => {
    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <div className={styles.brand}>
                        <Image className= {styles.icon_background}
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
                        <Link href="/cart">
                            <FiShoppingCart size={28} />
                        </Link>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;