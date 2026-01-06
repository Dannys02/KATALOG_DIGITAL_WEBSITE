import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Shirt,
    Footprints,
    ShoppingBag,
    Gem,
    Sparkles,
    ArrowRight,
    TrendingUp
} from "lucide-react";

const Category = () => {
    const categories = [
        {
            id: 1,
            name: "Pakaian",
            icon: Shirt,
            description: "Koleksi fashion digital untuk semua gaya",
            colorStyles:
                "from-blue-500/10 to-blue-900/5 border-blue-500/20 hover:border-blue-400/40 hover:shadow-blue-500/10",
            iconStyles:
                "bg-blue-500/20 group-hover:bg-blue-500/30 text-blue-400",
            arrowColor: "text-blue-400"
        },
        {
            id: 2,
            name: "Sepatu",
            icon: Footprints,
            description: "Model terbaru untuk setiap kesempatan",
            colorStyles:
                "from-purple-500/10 to-purple-900/5 border-purple-500/20 hover:border-purple-400/40 hover:shadow-purple-500/10",
            iconStyles:
                "bg-purple-500/20 group-hover:bg-purple-500/30 text-purple-400",
            arrowColor: "text-purple-400"
        },
        {
            id: 3,
            name: "Tas",
            icon: ShoppingBag,
            description: "Koleksi tas digital premium",
            badge: "Limited",
            colorStyles:
                "from-amber-500/10 to-amber-900/5 border-amber-500/20 hover:border-amber-400/40 hover:shadow-amber-500/10",
            iconStyles:
                "bg-amber-500/20 group-hover:bg-amber-500/30 text-amber-400",
            badgeStyles: "bg-amber-500/20 text-amber-300 border-amber-500/30",
            arrowColor: "text-amber-400"
        },
        {
            id: 4,
            name: "Aksesoris",
            icon: Gem,
            description: "Pelengkap gaya yang sempurna",
            badge: "Premium",
            colorStyles:
                "from-emerald-500/10 to-emerald-900/5 border-emerald-500/20 hover:border-emerald-400/40 hover:shadow-emerald-500/10",
            iconStyles:
                "bg-emerald-500/20 group-hover:bg-emerald-500/30 text-emerald-400",
            badgeStyles:
                "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
            arrowColor: "text-emerald-400"
        },
        {
            id: 5,
            name: "Kecantikan",
            icon: Sparkles,
            description: "Produk kecantikan digital eksklusif",
            badge: "Trending",
            colorStyles:
                "from-rose-500/10 to-rose-900/5 border-rose-500/20 hover:border-rose-400/40 hover:shadow-rose-500/10",
            iconStyles:
                "bg-rose-500/20 group-hover:bg-rose-500/30 text-rose-400",
            badgeStyles: "bg-rose-500/20 text-rose-300 border-rose-500/30",
            arrowColor: "text-rose-400"
        }
    ];

    return (
        <section id="kategori" className="fade-in py-20">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
                        <Sparkles className="w-4 h-4 text-indigo-300" />
                        <span className="text-sm font-medium text-indigo-200">
                            Jelajahi Kategori
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
                            Kategori
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Temukan koleksi digital eksklusif dalam berbagai
                        kategori pilihan
                    </p>
                </div>

                {/* Categories Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8
        mx-auto"
                >
                    {categories.map(cat => {
                        const IconComponent = cat.icon;
                        return (
                            <div
                                key={cat.id}
                                className={`group bg-gradient-to-br backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer 
                ${cat.colorStyles} 
                ${
                    cat.isFullWidth
                        ? "lg:col-span-3 lg:max-w-xl lg:mx-auto"
                        : ""
                }`}
                            >
                                <div
                                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 ${cat.iconStyles}`}
                                >
                                    <IconComponent className="w-8 h-8" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {cat.name}
                                </h3>
                                <p className="text-gray-300 mb-6">
                                    {cat.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {cat.badge && (
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full border ${cat.badgeStyles}`}
                                            >
                                                {cat.badge}
                                            </span>
                                        )}
                                    </div>
                                    <Link to={`/product?category=${cat.name}`}>
                                        <ArrowRight
                                            className={`w-5 h-5 ${cat.arrowColor} group-hover:translate-x-2 transition-transform duration-300`}
                                        />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View All Categories Button */}
                <div className="text-center mt-16">
                    <Link
                        to="/product"
                        className="group inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-full px-8 py-4 text-lg font-medium transition-all duration-300"
                    >
                        <span>Lihat Semua Produk</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Category;
