import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Back from "../components/UI/Back";
import DetailSkeleton from "../components/skeletons/DetailSkeleton";
import * as api from "../api/productService";
import { X, Send } from "lucide-react";

const DetailProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const { id } = useParams();

    // State untuk form pembeli
    const [buyer, setBuyer] = useState({
        nama: "",
        alamat: "",
        catatan: ""
    });

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await api.getProducts();
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => setLoading(false), 1000);
            }
        };
        fetchProducts();
    }, [id]);

    const product = products.find(item => item.id === Number(id));

    const getCategoryColor = category => {
        const colors = {
            Pakaian: "bg-blue-500/20 text-blue-300 border-blue-500/30",
            Sepatu: "bg-purple-500/20 text-purple-300 border-purple-500/30",
            Tas: "bg-amber-500/20 text-amber-300 border-amber-500/30"
        };
        return (
            colors[category] ||
            "bg-gray-500/20 text-gray-300 border-gray-500/30"
        );
    };

    // Fungsi Generate Pesan
    const generateMessage = () => {
        const specs =
            product.specifications
                ?.map(s => `- ${s.name}: ${s.value}`)
                .join("\n") || "";
        return (
            `Halo Admin, saya mau pesan:\n\n` +
            `Produk: ${product.name}\n` +
            `${specs}\n` +
            `Harga: ${product.price}\n\n` +
            `--- Data Pembeli ---\n` +
            `Nama: ${buyer.nama}\n` +
            `Alamat: ${buyer.alamat}\n` +
            `Catatan: ${buyer.catatan || "-"}\n\n` +
            `Mohon info total harga + ongkirnya. Terima kasih!`
        );
    };

    const sendToWA = () => {
        const url = `https://wa.me/6285645837298?text=${encodeURIComponent(
            generateMessage()
        )}`;
        window.open(url, "_blank");
    };

    const sendToEmail = () => {
        const url = `mailto:webdannys@gmail.com?subject=Pesanan: ${
            product.name
        }&body=${encodeURIComponent(generateMessage())}`;
        window.location.href = url;
    };

    return (
        <section className="pb-20 bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900 min-h-screen">
            <div className="container mx-auto px-4 text-white">
                <div className="py-6">
                    <Back />
                </div>
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <DetailSkeleton />
                    ) : product ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="rounded-2xl overflow-hidden border border-white/10">
                                <img
                                    src={product.image}
                                    className="w-full object-cover"
                                    alt=""
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-3xl font-bold mb-6">
                                    {product.price}
                                </p>
                                <span
                                    className={`inline-block px-4 py-2 rounded-lg border ${getCategoryColor(
                                        product.category
                                    )} mb-8`}
                                >
                                    {product.category}
                                </span>
                                <p className="text-gray-300 text-lg mb-8">
                                    {product.description}
                                </p>

                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2 text-white">
                                        Spesifikasi
                                    </h2>
                                    <div className="space-y-4 text-white">
                                        {product.specifications?.length > 0 ? (
                                            product.specifications.map(
                                                (spec, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex border-b border-white/5 pb-2 justify-between"
                                                    >
                                                        <span className="text-gray-400">
                                                            {spec.name}
                                                        </span>
                                                        <span className="font-medium">
                                                            {spec.value}
                                                        </span>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p className="text-gray-500 italic">
                                                Tidak ada spesifikasi khusus.
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowOrderForm(true)}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-4 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-indigo-600/20"
                                >
                                    Beli Sekarang
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 text-2xl">
                            Produk Tidak Ditemukan
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL FORM PEMESANAN */}
            {showOrderForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl fade-in text-white">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <h3 className="text-xl font-bold">
                                Form Pemesanan
                            </h3>
                            <button
                                onClick={() => setShowOrderForm(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X />
                            </button>
                        </div>
                        <div className="p-6 space-y-4 text-white">
                            <div>
                                <label className="text-xs text-gray-400 uppercase tracking-wider">
                                    Produk
                                </label>
                                <p className="font-bold text-indigo-400">
                                    {product.name} ({product.price})
                                </p>
                            </div>
                            <div className="space-y-3">
                                <input
                                    placeholder="Nama Lengkap"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors"
                                    onChange={e =>
                                        setBuyer({
                                            ...buyer,
                                            nama: e.target.value
                                        })
                                    }
                                />
                                <textarea
                                    placeholder="Alamat Pengiriman"
                                    rows="3"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors text-white"
                                    onChange={e =>
                                        setBuyer({
                                            ...buyer,
                                            alamat: e.target.value
                                        })
                                    }
                                ></textarea>
                                <input
                                    placeholder="Catatan (opsional: Ukuran/Warna)"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-colors"
                                    onChange={e =>
                                        setBuyer({
                                            ...buyer,
                                            catatan: e.target.value
                                        })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <button
                                    onClick={sendToWA}
                                    disabled={!buyer.nama || !buyer.alamat}
                                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors"
                                >
                                    WhatsApp
                                </button>
                                <button
                                    onClick={sendToEmail}
                                    disabled={!buyer.nama || !buyer.alamat}
                                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors"
                                >
                                    Email
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-500 text-center">
                                Pesanan akan diteruskan ke aplikasi terkait
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default DetailProduct;
