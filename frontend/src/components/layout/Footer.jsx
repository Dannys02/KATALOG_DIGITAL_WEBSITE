const Footer = () => {
    return (
        <footer className="py-8 border-t border-white/10">
            <div className="container mx-auto px-4 text-center">
                <div className="text-2xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        DannysStore
                    </span>
                </div>
                <p className="text-gray-400">
                    © {new Date().getFullYear()} DannysStore. Seluruh hak cipta
                    dilindungi.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
