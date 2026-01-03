import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Back = () => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
        >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Kembali</span>
        </button>
    );
};

export default Back;
