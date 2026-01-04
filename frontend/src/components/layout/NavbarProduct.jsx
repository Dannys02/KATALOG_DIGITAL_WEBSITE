import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../UI/Back";
import { Search } from "lucide-react";

const NavbarProduct = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = e => {
        const value = e.target.value;
        setSearch(value);

        // Gunakan { replace: true } agar tidak memenuhi histori browser
        if (value) {
            navigate(`?search=${value}`, { replace: true });
        } else {
            // Jika kosong, hapus query search dari URL
            navigate(window.location.pathname, { replace: true });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Tombol Kembali */}
                    <Back />
                    {/* Search Bar */}
                    <div className="flex-1 max-w-md mx-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input
                                type="text"
                                placeholder="Cari produk..."
                                onChange={handleSearch}
                                value={search}
                                className="w-full bg-white/10 border border-white/20 rounded-full pl-12 pr-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarProduct;
