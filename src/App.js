import React from 'react'
import { AuthProvider } from './AuthContext';
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Home,
    Product,
    Products,
    AboutPage,
    ContactPage,
    Cart,
    Login,
    Register,
    Checkout,
    PageNotFound,
} from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
    return (

        <>
         <AuthProvider>
            <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/product" element={<Products />} />
                            <Route path="/product/:id" element={<Product />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="*" element={<PageNotFound />} />
                            <Route path="/product/*" element={<PageNotFound />} />
                        </Routes>
                <Toaster />
            </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App