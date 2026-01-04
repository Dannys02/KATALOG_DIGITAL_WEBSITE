import React, { useState, useEffect } from "react";
import * as api from "../api/productService";
import {
    LayoutDashboard,
    PlusCircle,
    Edit,
    Trash2,
    Eye,
    LogOut,
    Package,
    Image as ImageIcon,
    Loader2
} from "lucide-react";

const Dashboard = () => {
    const [activePage, setActivePage] = useState("dashboard");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        price: "",
        category_id: "1",
        stock: "",
        description: "",
        image: null
    });

    const categories = [
        { id: 1, name: "Pakaian" },
        { id: 2, name: "Sepatu" },
        { id: 3, name: "Tas" },
        { id: 4, name: "Aksesoris" },
        { id: 5, name: "Kecantikan" }
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.getProducts();
            setProducts(res.data);
        } catch (err) {
            console.error(
                "Gagal mengambil data:",
                err.response?.data || err.message
            );
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = e => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
            price: "",
            category_id: "1",
            stock: "",
            description: "",
            image: null
        });
    };

    const handleEditClick = product => {
        setFormData({
            id: product.id,
            name: product.name,
            // Hilangkan format Rp dan titik agar bisa masuk ke input number
            price: product.price.replace(/[^0-9]/g, ""),
            category_id:
                categories.find(c => c.name === product.category)?.id || "1",
            stock: product.stock || 0,
            description: product.description || "",
            image: null
        });
        setActivePage("edit");
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("category_id", formData.category_id);
        data.append("stock", formData.stock);
        data.append("description", formData.description || "");
        // Spek default agar database tidak null jika field required
        data.append(
            "specifications",
            JSON.stringify([{ name: "Kualitas", value: "Original" }])
        );

        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            if (activePage === "tambah") {
                await api.storeProduct(data);
            } else {
                await api.updateProduct(formData.id, data);
            }
            alert("Berhasil menyimpan produk!");
            resetForm();
            fetchProducts();
            setActivePage("dashboard");
        } catch (err) {
            console.error("DEBUG ERROR LENGKAP:", err.response?.data);

            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                const firstError = Object.values(errors)[0][0];
                alert("Gagal Simpan (Validasi): " + firstError);
            } else if (!err.response) {
                alert(
                    "Koneksi Terputus! Pastikan Server Laravel sudah 'php artisan serve'"
                );
            } else {
                alert(
                    "Error Server: " +
                        (err.response?.data?.message ||
                            "Terjadi kesalahan internal")
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async id => {
        if (window.confirm("Hapus produk ini?")) {
            try {
                await api.deleteProduct(id);
                fetchProducts();
            } catch (err) {
                alert("Gagal menghapus produk");
            }
        }
    };

    const renderContent = () => {
        if (loading && activePage === "dashboard") {
            return (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                </div>
            );
        }

        switch (activePage) {
            case "tambah":
            case "edit":
                return (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {activePage === "tambah"
                                ? "Tambah Produk"
                                : "Edit Produk"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">
                                        Nama Produk
                                    </label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        type="text"
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">
                                        Kategori
                                    </label>
                                    <select
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                                    >
                                        {categories.map(cat => (
                                            <option
                                                key={cat.id}
                                                value={cat.id}
                                                className="text-black"
                                            >
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">
                                        Harga (Angka saja)
                                    </label>
                                    <input
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        type="number"
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">
                                        Stok
                                    </label>
                                    <input
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        type="number"
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">
                                    Gambar Produk
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-white/10 rounded-lg border border-dashed border-white/30 flex items-center justify-center overflow-hidden">
                                        {formData.image instanceof File ? (
                                            <img
                                                src={URL.createObjectURL(
                                                    formData.image
                                                )}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="text-white/20" />
                                        )}
                                    </div>
                                    <input
                                        name="image"
                                        type="file"
                                        onChange={handleInputChange}
                                        className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">
                                    Deskripsi
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none"
                                ></textarea>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
                                >
                                    {loading ? "Menyimpan..." : "Perbarui Produk"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActivePage("dashboard");
                                        resetForm();
                                    }}
                                    className="bg-white/10 text-white py-3 px-8 rounded-lg border border-white/20"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                );
            case "detail":
                return (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-white">
                        <button
                            onClick={() => setActivePage("dashboard")}
                            className="mb-6 text-indigo-400 flex items-center gap-2"
                        >
                            ← Kembali
                        </button>
                        <div className="grid md:grid-cols-2 gap-8">
                            <img
                                src={selectedProduct?.image}
                                className="rounded-xl w-full object-cover h-64 border border-white/10"
                                alt=""
                            />
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold">
                                    {selectedProduct?.name}
                                </h2>
                                <p className="text-2xl text-indigo-400 font-bold">
                                    {selectedProduct?.price}
                                </p>
                                <div className="inline-block px-3 py-1 bg-white/10 rounded-lg text-sm">
                                    Kategori: {selectedProduct?.category}
                                </div>
                                <p className="text-gray-400 leading-relaxed">
                                    {selectedProduct?.description ||
                                        "Tidak ada deskripsi."}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-900/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                <p className="text-gray-400 text-sm">
                                    Total Produk
                                </p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {products.length}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center text-white">
                                <h3 className="text-xl font-bold">
                                    Daftar Produk
                                </h3>
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setActivePage("tambah");
                                    }}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                                >
                                    <PlusCircle className="w-4 h-4" /> Tambah
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-white">
                                    <thead>
                                        <tr className="border-b border-white/10 text-gray-400 text-sm">
                                            <th className="text-left p-4">
                                                Produk
                                            </th>
                                            <th className="text-left p-4">
                                                Harga
                                            </th>
                                            <th className="text-left p-4">
                                                Kategori
                                            </th>
                                            <th className="text-left p-4">
                                                Stok
                                            </th>
                                            <th className="text-center p-4">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr
                                                key={product.id}
                                                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                            >
                                                <td className="p-4 flex items-center gap-3">
                                                    <img
                                                        src={product.image}
                                                        className="w-10 h-10 rounded object-cover"
                                                        alt=""
                                                    />
                                                    {product.name}
                                                </td>
                                                <td className="p-4">
                                                    {product.price}
                                                </td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {product.stock}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedProduct(
                                                                    product
                                                                );
                                                                setActivePage(
                                                                    "detail"
                                                                );
                                                            }}
                                                            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleEditClick(
                                                                    product
                                                                )
                                                            }
                                                            className="p-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/40"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product.id
                                                                )
                                                            }
                                                            className="p-2 bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/40"
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
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="bg-black/40 border-b border-white/10 sticky top-0 z-50 backdrop-blur-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center text-white">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors">
                        <LogOut className="w-5 h-5" /> Keluar
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-64 space-y-2">
                        <button
                            onClick={() => setActivePage("dashboard")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activePage === "dashboard"
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                    : "text-gray-400 hover:bg-white/5"
                            }`}
                        >
                            <LayoutDashboard className="w-5 h-5" /> Dashboard
                        </button>
                        <button
                            onClick={() => {
                                resetForm();
                                setActivePage("tambah");
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activePage === "tambah"
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-400 hover:bg-white/5"
                            }`}
                        >
                            <PlusCircle className="w-5 h-5" /> Tambah Produk
                        </button>
                    </div>
                    <div className="flex-1">{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
