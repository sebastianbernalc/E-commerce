import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <main className="main-container">
                {children}
            </main>
            <Footer />
            <ToastContainer /> 
        </React.Fragment>
    );
};

export default MainLayout;
