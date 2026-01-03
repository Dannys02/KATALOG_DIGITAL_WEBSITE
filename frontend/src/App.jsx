import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import NavbarProduct from "./components/layout/NavbarProduct";
import Footer from "./components/layout/Footer";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/HomePage";
import AllProducts from "./pages/AllProducts";
import DetailProduct from "./pages/DetailProduct";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
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
                    <Route
                        path="/product/detail/id"
                        element={<DetailProduct />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
