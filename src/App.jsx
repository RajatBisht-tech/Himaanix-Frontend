
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";


import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import MenShoesPage from "./pages/MenShoesPage.jsx";
import WomenShoesPage from "./pages/WomenShoesPage.jsx";
import MenWatchesPage from "./pages/MenWatchesPage.jsx";
import WomenWatchesPage from "./pages/WomenWatchesPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import OrderTrackingPage from "./pages/OrderTrackingPage.jsx";
import About from "./pages/About.jsx";
import Shipping from "./pages/Shipping.jsx";
import Contact from "./pages/Contact.jsx";
import Returns from "./pages/Returns.jsx";
import Refund from "./pages/Refund.jsx"
import Terms from "./pages/TermsConditions.jsx"
import Careers from "./pages/Careers.jsx";
import Sustainability from "./pages/Sustainability.jsx";
import Blog from "./pages/Blog.jsx";
import AdminOrdersPage from "./pages/AdminOrdersPage.jsx";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default function App() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-900">
            <ScrollToTop />
            <Header />

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/shoes/men" element={<MenShoesPage />} />
                    <Route path="/shoes/women" element={<WomenShoesPage />} />
                    <Route path="/shoes/:gender/:slug" element={<ProductPage />} />
                    <Route path="/watches/men" element={<MenWatchesPage />} />
                    <Route path="/watches/women" element={<WomenWatchesPage />} />
                    <Route path="/watches/:watchGender/:slug" element={<ProductPage />} />
                    <Route path="/product/:slug" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/orders/:id/tracking" element={<OrderTrackingPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/About" element={<About/>}/>
                    <Route path="/Shipping" element={<Shipping/>}/>
                    <Route path="/Contact" element={<Contact/>}/>
                    <Route path="/Returns" element={<Returns/>}/>
                   <Route path="/refund-policy" element={<Refund/>}/>
                   <Route path="/Terms" element={<Terms/>}/>
                   <Route path="/careers" element={<Careers/>}/> 
                   <Route path="/sustainability" element={<Sustainability/>} />
                   <Route path="/blog/:slug" element={<Blog/>} />
                   <Route path="/blog" element={<Blog/>} />
                   <Route path="/admin" element={<AdminOrdersPage />} />
                   <Route path="/admin/orders" element={<AdminOrdersPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}
