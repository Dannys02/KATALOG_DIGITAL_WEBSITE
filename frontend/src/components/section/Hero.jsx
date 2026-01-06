import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

const Home = () => {
    const scrollToSection = sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="beranda"
            className="fade-in py-24 flex flex-col items-center justify-center px-4 text-center"
        >
            <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
                    <Sparkles className="w-4 h-4 text-indigo-300" />
                    <span className="text-sm font-medium text-indigo-200">
                        Katalog Digital Premium
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                    <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
                        Upgrade Skill
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                        Digital Anda
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Kelas dan produk premium yang fokus pada
                    <span className="text-indigo-300 font-medium">
                        {" "}
                        hasil
                    </span>{" "}
                    nyata, bukan
                    <span className="text-purple-300 font-medium">
                        {" "}
                        janji
                    </span>{" "}
                    kosong
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div
                        className="group bg-white/5 backdrop-blur-sm rounded-xl
                    p-6 border border-white/10 border-indigo-500/20
                    hover:border-indigo-400/40 hover:shadow-indigo-500/10
                    hover:shadow-2xl
                    hover:scale-[1.02] cursor-pointer  transition-all
                    duration-300"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/20 rounded-lg mb-4">
                            <Shield className="w-6 h-6 text-indigo-300" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            Aman & Terpercaya
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Transaksi aman dengan garansi produk digital
                        </p>
                    </div>

                    <div
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 border-indigo-500/20
                    hover:border-indigo-400/40 hover:shadow-indigo-500/10
                    hover:shadow-2xl
                    hover:scale-[1.02] cursor-pointer  transition-all
                    duration-300"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mb-4">
                            <Zap className="w-6 h-6 text-purple-300" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            Akses Instant
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Dapatkan produk langsung setelah pembayaran
                        </p>
                    </div>

                    <div
                        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 border-indigo-500/20
                    hover:border-indigo-400/40 hover:shadow-indigo-500/10
                    hover:shadow-2xl
                    hover:scale-[1.02] cursor-pointer  transition-all
                    duration-300"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mb-4">
                            <Sparkles className="w-6 h-6 text-blue-300" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            Kualitas Premium
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Produk digital dengan standar kualitas tertinggi
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/product"
                        className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Lihat Produk
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>

                    <button
                        onClick={() => scrollToSection("kontak")}
                        className="group px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Hubungi Kami
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Home;
