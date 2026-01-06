import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import * as api from "../api/productService";
import ProductSkeleton from "../components/skeletons/ProductSkeleton";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const activeCategory = params.get("category");
    const searchQ = params.get("search")?.toLowerCase() || "";

    const filteredProducts = products.filter(product => {
        const matchCategory = activeCategory
            ? product.category.toLowerCase() === activeCategory.toLowerCase()
            : true;
        const matchSearch = product.name.toLowerCase().includes(searchQ);

        return matchCategory && matchSearch;
    });

    useEffect(() => {
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
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchProducts();
    }, [activeCategory]);

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
                return "bg-gray-500/20 text-gray-300 border-gray-500/30";
        }
    };

    return (
        <section className="pt-32 pb-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
                            Semua{" "}
                            <span className="text-indigo-400"> Produk </span>{" "}
                            Digital
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Temukan koleksi produk digital kami dari berbagai
                        kategori
                    </p>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <ProductSkeleton
                        count={searchQ || activeCategory ? 2 : 8}
                    />
                ) : filteredProducts.length > 0 ? (
                    <div className="fade-in grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                            >
                                {/* Gambar Produk */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Konten Card */}
                                <div className="p-4">
                                    {/* Nama Produk */}
                                    <h3 className="text-md font-bold text-white mb-2 line-clamp-1">
                                        {product.name}
                                    </h3>

                                    {/* Harga Produk */}
                                    <div className="mb-4">
                                        <p className="text-sm md:text-lg font-bold text-white">
                                            {product.price}
                                        </p>
                                    </div>

                                    {/* Kategori Produk */}
                                    <div className="mb-6">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                                                product.category
                                            )}`}
                                        >
                                            {product.category}
                                        </span>
                                    </div>

                                    {/* Tombol Action */}
                                    <div
                                        className="flex flex-col-reverse
                                md:flex-row gap-3"
                                    >
                                        {/* Tombol Lihat Detail */}
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="flex-1 text-center bg-white/10 hover:bg-white/20
                  text-white font-medium py-3 rounded-full border
                  border-white/20
                  hover:border-white/30 transition-all duration-300"
                                        >
                                            Lihat Detail
                                        </Link>

                                        {/* Tombol Beli */}
                                        {/*                                    <button
                                        className="flex-1 bg-gradient-to-r from-indigo-600
                  to-purple-600 hover:from-indigo-500 hover:to-purple-500
                  text-white font-medium py-3 rounded-full transition-all
                  duration-300 hover:scale-[1.05]"
                                    >
                                        Beli
                                    </button>*/}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-white/5 inline-block p-6 rounded-full mb-4">
                            <Search className="w-12 h-12 text-white/20" />
                        </div>
                        <h2 className="text-2xl font-semibold text-white">
                            Produk tidak tersedia
                        </h2>
                        <p className="text-gray-400 mt-2">
                            Tidak ditemukan "{searchQ}" di kategori
                            <span> {activeCategory || " semua"} </span>
                        </p>
                        <Link
                            to="/product"
                            className="group mt-6 inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300"
                        >
                            <span>Lihat Semua Produk</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </Link>
                    </div>
                )}

                {/* Info Jumlah Produk */}
                <div className="mt-12 text-center">
                    <p
                        className={`${
                            loading ? "hidden" : "block"
                        } text-gray-400`}
                    >
                        {filteredProducts.length === 0 ? (
                            "Tidak ada produk yang ditampilkan"
                        ) : (
                            <>
                                Menampilkan <b>{filteredProducts.length}</b>{" "}
                                dari
                                <b> {products.length} </b> produk katalog
                                digital
                            </>
                        )}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AllProducts;
