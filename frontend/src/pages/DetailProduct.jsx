import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Back from "../components/UI/Back";
import DetailSkeleton from "../components/skeletons/DetailSkeleton";
import * as api from "../api/productService";

const DetailProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await api.getProducts();
                setProducts(res.data);
            } catch (err) {
                console.error("Gagal ambil data:", err);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchProducts();
    }, [id]);

    const product = products.find(item => item.id === Number(id));

    const getCategoryColor = category => {
        switch (category) {
            case "Pakaian":
                return "bg-blue-500/20 text-blue-300 border-blue-500/30";
            case "Sepatu":
                return "bg-purple-500/20 text-purple-300 border-purple-500/30";
            case "Tas":
                return "bg-amber-500/20 text-amber-300 border-amber-500/30";
            case "Aksesoris":
                return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
            case "Kecantikan":
                return "bg-rose-500/20 text-rose-300 border-rose-500/30";
            default:
                return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
        }
    };

    return (
        <section className="pb-20 bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="py-6">
                    <Back className="py-10" />
                </div>

                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <DetailSkeleton />
                    ) : product ? (
                        <div className="fade-in grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Gambar Produk Besar */}
                            <div>
                                <div className="rounded-2xl overflow-hidden border border-white/10">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>

                            {/* Detail Produk */}
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-4">
                                    {product.name}
                                </h1>

                                <div className="mb-6">
                                    <p className="text-3xl font-bold text-white">
                                        {product.price}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <span
                                        className={`inline-block px-4 py-2 rounded-lg border ${getCategoryColor(
                                            product.category
                                        )}`}
                                    >
                                        {product.category}
                                    </span>
                                </div>

                                <div className="mb-8">
                                    <p className="text-gray-300 text-lg">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Spesifikasi */}
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-white mb-6">
                                        Spesifikasi
                                    </h2>
                                    <div className="space-y-4">
                                        {/* Tampilkan data mentah tanpa JSON.parse dulu biar nggak lag/error kalau formatnya beda */}
                                        {product.specifications &&
                                        Array.isArray(
                                            product.specifications
                                        ) ? (
                                            product.specifications.map(
                                                (spec, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex border-b border-white/10 pb-4"
                                                    >
                                                        <div className="w-32">
                                                            <span className="text-gray-400">
                                                                {spec.name}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-white">
                                                                {spec.value}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <p className="text-gray-500 italic text-sm">
                                                Spesifikasi tidak tersedia dalam
                                                format array
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-full transition-all duration-300 hover:scale-[1.05]">
                                        Beli Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 text-white">
                            <h2 className="text-2xl">Produk Tidak Ditemukan</h2>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DetailProduct;
