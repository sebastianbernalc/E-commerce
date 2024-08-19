import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Importa solo Montserrat
import Providers from "@/components/Providers";
import "./globals.scss";
import { Analytics } from '@vercel/analytics/react';

const montserrat = Montserrat({ subsets: ["latin"]}); // Define Montserrat

export const metadata: Metadata = {
    title: "LeanShop",
    description: "LeanShop is a simple e-commerce platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={montserrat.className}> {/* Aplica solo Montserrat */}
                <Providers>
                    {children}
                    <Analytics />
                </Providers>
            </body>
        </html>
    );
}
