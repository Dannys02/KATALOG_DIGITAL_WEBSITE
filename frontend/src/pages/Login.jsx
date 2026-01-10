import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    // Sesuaikan URL dengan backend Laravel kamu
    const API_URL = "http://localhost:8000/api";

    // 1. AUTO-REDIRECT jika sudah login
    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (token) {
            // Cek keabsahan token ke server
            axios
                .get(`${API_URL}/user`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(() => navigate("/dashboard"))
                .catch(() => {
                    // Jika token expired atau dihapus di server, bersihkan lokal
                    localStorage.removeItem("admin_token");
                });
        }
    }, [navigate]);

    if (loading)
        return (
            <div
                className="min-h-screen flex justify-center
    items-center"
            >
                <span>Loading...</span>
            </div>
        );

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 2. LOGIKA LOGIN
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/login`, {
                email: formData.email,
                password: formData.password
            });

            // Simpan token di localStorage (ini bertindak seperti 'cookie' permanen)
            localStorage.setItem("admin_token", response.data.token);

            // Berhasil! Langsung lempar ke dashboard
            navigate("/dashboard");
        } catch (error) {
            // Tangani error jika email/password salah
            const message =
                error.response?.data?.message ||
                "Login gagal, periksa koneksi Anda";
            alert(message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Admin Login
                        </span>
                    </h1>
                    <p className="text-indigo-200">
                        Masuk untuk mengelola website
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-indigo-900/50">
                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Email Input */}
                        <div className="mb-6">
                            <label
                                className="block text-indigo-200 text-sm font-medium mb-2"
                                htmlFor="email"
                            >
                                Email Admin
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-indigo-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-3 bg-gray-900/70 border border-indigo-800/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                    placeholder="admin@email.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="mb-8">
                            <label
                                className="block text-indigo-200 text-sm font-medium mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg
                                        className="h-5 w-5 text-indigo-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-3 bg-gray-900/70 border border-indigo-800/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? "Memverifikasi..." : "Masuk Sekarang"}
                        </button>
                    </form>
                </div>

                {/* Background Decoration */}
                <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-900/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-800/10 rounded-full blur-3xl"></div>
                </div>

                {/* Footer */}
                <div className="mt-10 text-center">
                    <p className="text-indigo-300/70 text-sm">
                        © 2026 Admin Panel. Secure Access.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
