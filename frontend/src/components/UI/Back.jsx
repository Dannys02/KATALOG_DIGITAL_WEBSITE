import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Back = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        // Jika ada histori (bukan entri pertama), maka kembali ke belakang
        // Jika tidak ada (user langsung buka link ini), arahkan ke home atau daftar produk
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };
    return (
        <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
        >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Kembali</span>
        </button>
    );
};

export default Back;
