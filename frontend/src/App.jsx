import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import NavbarProduct from "./components/layout/NavbarProduct";
import Footer from "./components/layout/Footer";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/HomePage";
import AllProducts from "./pages/AllProducts";
import DetailProduct from "./pages/DetailProduct";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    return (
        <>
            <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white">
                <ScrollToTop />
                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                <Navbar />
                                <Home />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/product"
                        element={
                            <>
                                <NavbarProduct />
                                <AllProducts />
                                <Footer />
                            </>
                        }
                    />
                    <Route path="/product/:id" element={<DetailProduct />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
