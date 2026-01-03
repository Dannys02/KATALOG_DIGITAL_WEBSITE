import React from "react";
import { useParams } from "react-router-dom";
import Back from "../components/UI/Back";

const products = [
    // Pakaian (3 produk)
    {
        id: 1,
        name: "Kaos Premium Digital",
        price: "Rp 149.000",
        category: "Pakaian",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    {
        id: 2,
        name: "Kemeja Formal Digital",
        price: "Rp 299.000",
        category: "Pakaian",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    {
        id: 3,
        name: "Jaket Casual Digital",
        price: "Rp 399.000",
        category: "Pakaian",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    // Sepatu (3 produk)
    {
        id: 4,
        name: "Sneakers Sport Digital",
        price: "Rp 549.000",
        category: "Sepatu",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    {
        id: 5,
        name: "Sepatu Formal Digital",
        price: "Rp 699.000",
        category: "Sepatu",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    {
        id: 6,
        name: "Sandal Premium Digital",
        price: "Rp 249.000",
        category: "Sepatu",
        image: "https://images.unsplash.com/photo-1588117260148-b47818741c74?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    // Tas (3 produk)
    {
        id: 7,
        name: "Backpack Urban Digital",
        price: "Rp 429.000",
        category: "Tas",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    {
        id: 8,
        name: "Tas Ransel Premium",
        price: "Rp 379.000",
        category: "Tas",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    {
        id: 9,
        name: "Clutch Malam Digital",
        price: "Rp 279.000",
        category: "Tas",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    // Aksesoris (3 produk)
    {
        id: 10,
        name: "Jam Tangan Digital",
        price: "Rp 899.000",
        category: "Aksesoris",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    {
        id: 11,
        name: "Kalung Emas Digital",
        price: "Rp 1.299.000",
        category: "Aksesoris",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    {
        id: 12,
        name: "Cincin Premium Digital",
        price: "Rp 599.000",
        category: "Aksesoris",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    // Kecantikan (3 produk)
    {
        id: 13,
        name: "Parfum Luxury Digital",
        price: "Rp 799.000",
        category: "Kecantikan",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    {
        id: 14,
        name: "Skincare Set Digital",
        price: "Rp 1.499.000",
        category: "Kecantikan",
        image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    },
    {
        id: 15,
        name: "Makeup Kit Digital",
        price: "Rp 999.000",
        category: "Kecantikan",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
        description:
            "Kaos premium dengan bahan berkualitas tinggi, nyaman digunakan sehari-hari dan cocok untuk berbagai aktivitas.",
        specifications: [
            { name: "Bahan", value: "Katun Combed 30s" },
            { name: "Ukuran", value: "S, M, L, XL" }
        ]
    }
];

const DetailProduct = () => {
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

    const { id } = useParams();

    const product = products.find(item => item.id === Number(id));

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
                                <span
                                    className={`inline-block px-4 py-2 rounded-lg ${getCategoryColor(
                                        product.category
                                    )} `}
                                >
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
                                <button
                                    className="w-full bg-gradient-to-r from-indigo-600
                  to-purple-600 hover:from-indigo-500 hover:to-purple-500
                  text-white font-medium py-3 rounded-full transition-all
                  duration-300 hover:scale-[1.05]"
                                >
                                    Beli Sekarang
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
