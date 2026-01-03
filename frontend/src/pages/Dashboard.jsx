import React, { useState } from "react";
import {
    LayoutDashboard,
    PlusCircle,
    Edit,
    Trash2,
    Eye,
    LogOut,
    Package,
    ShoppingBag,
    Users,
    BarChart3
} from "lucide-react";

const Dashboard = () => {
    const [activePage, setActivePage] = useState("dashboard");
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Kaos Premium",
            price: "Rp 149.000",
            category: "Pakaian",
            stock: 45
        },
        {
            id: 2,
            name: "Sneakers Sport",
            price: "Rp 549.000",
            category: "Sepatu",
            stock: 23
        },
        {
            id: 3,
            name: "Backpack Urban",
            price: "Rp 429.000",
            category: "Tas",
            stock: 17
        },
        {
            id: 4,
            name: "Jam Tangan",
            price: "Rp 899.000",
            category: "Aksesoris",
            stock: 8
        },
        {
            id: 5,
            name: "Parfum Luxury",
            price: "Rp 799.000",
            category: "Kecantikan",
            stock: 31
        }
    ]);

    const handleDeleteProduct = id => {
        if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    const handleAddProduct = () => {
        const newProduct = {
            id: products.length + 1,
            name: "Produk Baru",
            price: "Rp 0",
            category: "Pakaian",
            stock: 0
        };
        setProducts([...products, newProduct]);
        setActivePage("edit");
    };

    const renderContent = () => {
        switch (activePage) {
            case "tambah":
                return (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Tambah Produk Baru
                        </h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-white mb-2">
                                    Nama Produk
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">
                                    Harga
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">
                                    Kategori
                                </label>
                                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white">
                                    <option value="Pakaian">Pakaian</option>
                                    <option value="Sepatu">Sepatu</option>
                                    <option value="Tas">Tas</option>
                                    <option value="Aksesoris">Aksesoris</option>
                                    <option value="Kecantikan">
                                        Kecantikan
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white mb-2">
                                    Stok
                                </label>
                                <input
                                    type="number"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                                ></textarea>
                            </div>
                            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-8 rounded-lg">
                                Simpan Produk
                            </button>
                        </form>
                    </div>
                );

            case "edit":
                return (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Edit Produk
                        </h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-white mb-2">
                                    Nama Produk
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Kaos Premium"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">
                                    Harga
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Rp 149.000"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">
                                    Kategori
                                </label>
                                <select
                                    defaultValue="Pakaian"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                                >
                                    <option value="Pakaian">Pakaian</option>
                                    <option value="Sepatu">Sepatu</option>
                                    <option value="Tas">Tas</option>
                                    <option value="Aksesoris">Aksesoris</option>
                                    <option value="Kecantikan">
                                        Kecantikan
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white mb-2">
                                    Stok
                                </label>
                                <input
                                    type="number"
                                    defaultValue="45"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-8 rounded-lg">
                                    Update Produk
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActivePage("dashboard")}
                                    className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-8 rounded-lg border border-white/20"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                );

            case "detail":
                return (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Detail Produk
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-gray-400">
                                    Nama Produk
                                </span>
                                <span className="text-white">Kaos Premium</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-gray-400">Harga</span>
                                <span className="text-white">Rp 149.000</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-gray-400">Kategori</span>
                                <span className="text-white">Pakaian</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span className="text-gray-400">Stok</span>
                                <span className="text-white">45 unit</span>
                            </div>
                            <div className="flex justify-between pb-3">
                                <span className="text-gray-400">Status</span>
                                <span className="text-green-400">Tersedia</span>
                            </div>
                        </div>
                    </div>
                );

            default: // dashboard
                return (
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gradient-to-br from-blue-500/10 to-blue-900/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm">
                                            Total Produk
                                        </p>
                                        <p className="text-3xl font-bold text-white mt-2">
                                            {products.length}
                                        </p>
                                    </div>
                                    <Package className="w-10 h-10 text-blue-400" />
                                </div>
                            </div>
                        </div>

                        {/* Products Table */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-xl font-bold text-white">
                                    Daftar Produk
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left p-4 text-gray-400 font-medium">
                                                Nama Produk
                                            </th>
                                            <th className="text-left p-4 text-gray-400 font-medium">
                                                Harga
                                            </th>
                                            <th className="text-left p-4 text-gray-400 font-medium">
                                                Kategori
                                            </th>
                                            <th className="text-left p-4 text-gray-400 font-medium">
                                                Stok
                                            </th>
                                            <th className="text-left p-4 text-gray-400 font-medium">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr
                                                key={product.id}
                                                className="border-b border-white/5 hover:bg-white/5"
                                            >
                                                <td className="p-4 text-white">
                                                    {product.name}
                                                </td>
                                                <td className="p-4 text-white">
                                                    {product.price}
                                                </td>
                                                <td className="p-4">
                                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-white">
                                                    {product.stock}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                setActivePage(
                                                                    "detail"
                                                                )
                                                            }
                                                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setActivePage(
                                                                    "edit"
                                                                )
                                                            }
                                                            className="p-2 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg text-amber-400"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteProduct(
                                                                    product.id
                                                                )
                                                            }
                                                            className="p-2 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg text-rose-400"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900">
            {/* Header */}
            <div className="bg-black/30 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">
                        Dashboard Admin
                    </h1>
                    <button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActivePage("dashboard")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        activePage === "dashboard"
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => setActivePage("tambah")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        activePage === "tambah"
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    Tambah Produk
                                </button>
                                <button
                                    onClick={() => setActivePage("edit")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        activePage === "edit"
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    <Edit className="w-5 h-5" />
                                    Edit Produk
                                </button>
                                <button
                                    onClick={() => setActivePage("detail")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        activePage === "detail"
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    <Eye className="w-5 h-5" />
                                    Detail Produk
                                </button>
                            </nav>

                            {/* Add Product Button */}
                            <div className="mt-8">
                                <button
                                    onClick={handleAddProduct}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    Produk Baru
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
