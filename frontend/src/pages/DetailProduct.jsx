import React from "react";
import Back from "../components/UI/Back";

const DetailProduct = () => {
    const product = {
        name: "Kaos Polos Premium",
        price: "Rp 75.000",
        category: "Pakaian",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    };

    return (
        <section className="pb-20 bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900">
            <div className="container mx-auto px-4">
                <div className="py-12">
                    <Back className="py-10" />
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                            {/* Nama Produk */}
                            <h1 className="text-4xl font-bold text-white mb-4">
                                {product.name}
                            </h1>

                            {/* Harga Produk */}
                            <div className="mb-6">
                                <p className="text-3xl font-bold text-white">
                                    {product.price}
                                </p>
                            </div>

                            {/* Kategori Produk */}
                            <div className="mb-8">
                                <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30">
                                    {product.category}
                                </span>
                            </div>

                            {/* Deskripsi singkat */}
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
                                    {product.specifications.map(
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
                                    )}
                                </div>
                            </div>

                            {/* Tombol Hubungi via WhatsApp */}
                            <div>
                                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl text-lg transition-all duration-300 hover:scale-[1.02]">
                                    HUBUNGI VIA WHATSAPP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailProduct;
