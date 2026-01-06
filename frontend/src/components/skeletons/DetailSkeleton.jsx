import Skeleton from "react-loading-skeleton";

const DetailSkeleton = () => {
    const baseColor = "#1e1b4b"; // Indigo 950
    const highlightColor = "#312e81"; // Indigo 900

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Kolom Kiri: Gambar Besar */}
            <div>
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-square md:aspect-auto">
                    <Skeleton height={500} baseColor={baseColor} highlightColor={highlightColor} className="w-full h-full" />
                </div>
            </div>

            {/* Kolom Kanan: Detail Info */}
            <div>
                {/* Judul Produk */}
                <Skeleton width="80%" height={40} className="mb-4" baseColor={baseColor} highlightColor={highlightColor} />
                
                {/* Harga */}
                <div className="mb-6">
                    <Skeleton width="40%" height={36} baseColor={baseColor} highlightColor={highlightColor} />
                </div>

                {/* Badge Kategori */}
                <div className="mb-8">
                    <Skeleton width={120} height={40} borderRadius={8} baseColor={baseColor} highlightColor={highlightColor} />
                </div>

                {/* Deskripsi */}
                <div className="mb-8">
                    <Skeleton count={3} width="100%" baseColor={baseColor} highlightColor={highlightColor} />
                    <Skeleton width="60%" baseColor={baseColor} highlightColor={highlightColor} />
                </div>

                {/* Spesifikasi Section */}
                <div className="mb-12">
                    <Skeleton width="30%" height={32} className="mb-6" baseColor={baseColor} highlightColor={highlightColor} />
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex border-b border-white/10 pb-4">
                                <div className="w-32">
                                    <Skeleton width="60%" baseColor={baseColor} highlightColor={highlightColor} />
                                </div>
                                <div className="flex-1">
                                    <Skeleton width="40%" baseColor={baseColor} highlightColor={highlightColor} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tombol Beli */}
                <div>
                    <Skeleton width="100%" height={56} borderRadius={9999} baseColor={baseColor} highlightColor={highlightColor} />
                </div>
            </div>
        </div>
    );
};

export default DetailSkeleton;
