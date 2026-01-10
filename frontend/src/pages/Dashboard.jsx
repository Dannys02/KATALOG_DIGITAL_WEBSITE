import React, { useState, useEffect } from "react";
import * as api from "../api/productService";
import {
    LayoutDashboard,
    PlusCircle,
    Edit,
    Trash2,
    Eye,
    LogOut,
    Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

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
        specifications: [{ name: "", value: "" }],
        image: null
    });

    const navigate = useNavigate();

    const addSpecField = () => {
        setFormData({
            ...formData,
            specifications: [...formData.specifications, { name: "", value: "" }]
        });
    };

    const removeSpecField = (index) => {
        const newSpecs = formData.specifications.filter((_, i) => i !== index);
        setFormData({ ...formData, specifications: newSpecs.length ? newSpecs : [{ name: "", value: "" }] });
    };

    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...formData.specifications];
        newSpecs[index][field] = value;
        setFormData({ ...formData, specifications: newSpecs });
    };

    const categories = [
        { id: 1, name: "Pakaian" },
        { id: 2, name: "Sepatu" },
        { id: 3, name: "Tas" },
        { id: 4, name: "Aksesoris" },
        { id: 5, name: "Kecantikan" }
    ];

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.getProducts();
            setProducts(res.data);
        } catch (err) { console.error("Error:", err); }
        finally { setTimeout(() => setLoading(false), 1000); }
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
            id: "", name: "", price: "", category_id: "1",
            stock: "", description: "", specifications: [{ name: "", value: "" }], image: null
        });
    };

    const handleEditClick = product => {
        setFormData({
            id: product.id,
            name: product.name,
            price: product.price.replace(/[^0-9]/g, ""),
            category_id: categories.find(c => c.name === product.category)?.id || "1",
            stock: product.stock || 0,
            description: product.description || "",
            specifications: product.specifications && product.specifications.length > 0 
                ? product.specifications : [{ name: "", value: "" }],
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
        data.append("specifications", JSON.stringify(formData.specifications));

        if (formData.image) data.append("image", formData.image);

        try {
            if (activePage === "tambah") await api.storeProduct(data);
            else await api.updateProduct(formData.id, data);
            alert("Berhasil!");
            resetForm(); fetchProducts(); setActivePage("dashboard");
        } catch (err) { alert("Gagal!"); }
        finally { setLoading(false); }
    };

    const handleDelete = async id => {
        if (window.confirm("Hapus?")) {
            try { await api.deleteProduct(id); fetchProducts(); }
            catch (err) { alert("Gagal!"); }
        }
    };

    const renderContent = () => {
        if (loading && activePage === "dashboard") return <DashboardSkeleton />;

        switch (activePage) {
            case "tambah":
            case "edit":
                return (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {activePage === "tambah" ? "Tambah Produk" : "Edit Produk"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6 text-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Nama Produk</label>
                                    <input name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Kategori</label>
                                    <select name="category_id" value={formData.category_id} onChange={handleInputChange} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3">
                                        {categories.map(cat => <option key={cat.id} value={cat.id} className="text-black">{cat.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Harga</label>
                                    <input name="price" value={formData.price} onChange={handleInputChange} type="number" required className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Stok</label>
                                    <input name="stock" value={formData.stock} onChange={handleInputChange} type="number" required className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Gambar</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-white/10 rounded-lg border border-dashed border-white/30 flex items-center justify-center overflow-hidden">
                                        {formData.image ? <img src={URL.createObjectURL(formData.image)} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="text-white/20" />}
                                    </div>
                                    <input name="image" type="file" onChange={handleInputChange} className="text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Deskripsi</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none"></textarea>
                            </div>

                            {/* BAGIAN SPEK */}
                            <div className="space-y-4 border-t border-white/10 pt-4">
                                <label className="block text-gray-400 text-sm">Spesifikasi</label>
                                {formData.specifications.map((spec, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <input placeholder="Nama" value={spec.name} onChange={(e) => handleSpecChange(index, "name", e.target.value)} className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none" />
                                        <input placeholder="Nilai" value={spec.value} onChange={(e) => handleSpecChange(index, "value", e.target.value)} className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none" />
                                        <button type="button" onClick={() => removeSpecField(index)} className="text-rose-500 p-2"><Trash2 size={18}/></button>
                                    </div>
                                ))}
                                <button type="button" onClick={addSpecField} className="text-indigo-400 text-xs flex items-center gap-1"><PlusCircle size={14}/> Tambah Baris</button>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" disabled={loading} className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:scale-105 transition-transform disabled:opacity-50">
                                    {loading ? "Proses..." : "Simpan"}
                                </button>
                                <button type="button" onClick={() => { setActivePage("dashboard"); resetForm(); }} className="bg-white/10 text-white py-3 px-8 rounded-lg">Batal</button>
                            </div>
                        </form>
                    </div>
                );
            case "detail":
                return (
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-white">
                        <button onClick={() => setActivePage("dashboard")} className="mb-6 text-indigo-400">← Kembali</button>
                        <div className="grid md:grid-cols-2 gap-8">
                            <img src={selectedProduct?.image} className="rounded-xl w-full h-fit border border-white/10" alt="" />
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold">{selectedProduct?.name}</h2>
                                <p className="text-2xl text-indigo-400 font-bold">{selectedProduct?.price}</p>
                                <p className="text-gray-400">{selectedProduct?.description}</p>
                                <div className="pt-4 border-t border-white/10">
                                    <h4 className="font-bold mb-2">Spesifikasi:</h4>
                                    {selectedProduct?.specifications?.map((s, i) => (
                                        <div key={i} className="text-sm py-1 border-b border-white/5 flex justify-between">
                                            <span className="text-gray-400">{s.name}</span>
                                            <span>{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="space-y-6">
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center text-white">
                                <h3 className="text-xl font-bold">Daftar Produk</h3>
                                <button onClick={() => { resetForm(); setActivePage("tambah"); }} className="bg-indigo-600 px-4 py-2 rounded-lg flex items-center gap-2 text-sm"><PlusCircle size={16}/> Tambah</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-white text-left">
                                    <thead><tr className="text-gray-400 border-b border-white/10"><th className="p-4">Produk</th><th className="p-4">Harga</th><th className="p-4">Aksi</th></tr></thead>
                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                                                <td className="p-4 flex items-center gap-3"><img src={p.image} className="w-10 h-10 rounded object-cover" alt="" />{p.name}</td>
                                                <td className="p-4">{p.price}</td>
                                                <td className="p-4 flex gap-2">
                                                    <button onClick={() => { setSelectedProduct(p); setActivePage("detail"); }} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Eye size={16}/></button>
                                                    <button onClick={() => handleEditClick(p)} className="p-2 bg-amber-500/20 text-amber-400 rounded-lg"><Edit size={16}/></button>
                                                    <button onClick={() => handleDelete(p.id)} className="p-2 bg-rose-500/20 text-rose-400 rounded-lg"><Trash2 size={16}/></button>
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
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Admin Panel</h1>
                    <button onClick={() => navigate("/login")} className="flex items-center gap-2 text-gray-400"><LogOut size={20}/> Keluar</button>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
                <div className="lg:w-64 space-y-2">
                    <button onClick={() => setActivePage("dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === "dashboard" ? "bg-indigo-600" : "text-gray-400"}`}><LayoutDashboard size={20}/> Dashboard</button>
                    <button onClick={() => { resetForm(); setActivePage("tambah"); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activePage === "tambah" ? "bg-indigo-600" : "text-gray-400"}`}><PlusCircle size={20}/> Tambah Produk</button>
                </div>
                <div className="flex-1">{renderContent()}</div>
            </div>
        </div>
    );
};

export default Dashboard;
