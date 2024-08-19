import React from "react";
import styles from "./Tag.module.scss"; // Asegúrate de tener un archivo de estilos correspondiente

type TagProps = {
    text: string;
};

const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <span className={styles.tag}>
            {text}
        </span>
    );
};

export default Tag;
