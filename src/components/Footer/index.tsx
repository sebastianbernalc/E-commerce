import styles from "./Footer.module.scss";
import { FaShop } from "react-icons/fa6";
import Image from "next/image";
import Tag from "../Tag/Tag";
import Icon from "../../../public/Icon/icon.webp";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.column}>
                    <div className={styles.logo}>
                        <Image className= {styles.icon_background}
                                src={Icon} 
                                alt="Icon" 
                                width={50}
                                height={50}
                        />
                        <h3>LEANSHOP</h3>
                    </div>
                    <div className={styles.info}>
                        <p>Customer Supports:</p>
                        <h1>(629) 555-0129</h1>
                    </div>
                    <div className={styles.info}>
                        <p>4517 Washington Ave.</p>
                        <p>Manchester, Kentucky 39495</p>
                    </div>
                    <div className={styles.info}>
                        <h1>info@kinbo.com</h1>
                    </div>
                </div>
                <div className={styles.column}>
                    <h3>TOP CATEGORY</h3>
                    <a href="/">Computar & Laptop</a>
                    <a href="/">SmartPhone</a>
                    <a href="/">Headphone</a>
                    <a href="/">Accesories</a>
                    <a href="/">Camera & Photo</a>
                    <a href="/">Tv & Homes</a>
                    <a href="/">Browse All Product</a>
                </div>
                <div className={styles.column}>
                    <h3>QUICK LINKS</h3>
                    
                        <a href="/">Show Product</a>
                        <a href="/">Shoping Cart</a>
                        <a href="/">Wishlist</a>
                        <a href="/">Compare</a>
                        <a href="/">Track Order</a>
                        <a href="/">Customer Help</a>
                        <a href="/">About Us</a>
            
                </div>
                <div className={styles.column}>
                    <h3>DOWNLOAD APP</h3>
                    <div className={styles.download}>
                        <a href="/">
                            <Image 
                                src="https://vectorseek.com/wp-content/uploads/2023/09/Get-It-On-Google-Play-badge-Logo-Vector.svg-.png" 
                                alt="Google Play" 
                                width={150} // Ancho deseado
                                height={50} // Altura deseada
                            />
                        </a>
                        <a href="/">
                            <Image 
                                src="https://vectorseek.com/wp-content/uploads/2023/09/Available-on-the-App-Store-Logo-Vector.svg-.png" 
                                alt="App Store" 
                                width={150} // Ancho deseado
                                height={50} // Altura deseada
                            />
                        </a>
                    </div>
                </div>

                <div className={styles.column}>
                    <h3>POPULAR TAG</h3>
                    <div className={styles.tagContainer}>
                        <Tag text="Game"></Tag>
                        <Tag text="Iphone"></Tag>
                        <Tag text="TV"></Tag>
                        <Tag text="Asus Laptops"></Tag>
                        <Tag text="Macbook"></Tag>
                        <Tag text="SSD"></Tag>
                        <Tag text="Graphics Card"></Tag>
                        <Tag text="Power Bank"></Tag>
                        <Tag text="Smart TV"></Tag>
                        <Tag text="Speaker"></Tag>
                        <Tag text="Tablet"></Tag>
                        <Tag text="Microwave"></Tag>
                        <Tag text="Samngsung"></Tag>
                    </div>
                </div>
                <div className={styles.sep} />
                <div className={styles.copyRight}>
                    <p>© {new Date().getFullYear()} LeanShop - All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;