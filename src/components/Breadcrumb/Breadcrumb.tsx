// components/Breadcrumb.tsx

import React from "react";
import Link from "next/link";
import styles from "./Breadcrumb.module.scss"; // Crea un archivo de estilos si es necesario

interface BreadcrumbProps {
    paths: { label: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
    return (
        <nav className={styles.breadcrumb}>
            {paths.map((path, index) => (
                <React.Fragment key={path.href}>
                    {index > 0 && <span> &gt; </span>}
                    <Link href={path.href} className={styles.breadcrumb_link}>
                        {path.label}
                    </Link>
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
