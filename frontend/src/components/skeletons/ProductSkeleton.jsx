import Skeleton from "react-loading-skeleton";

const ProductSkeleton = ({ count = 4 }) => {
    const baseColor = "#1e1b4b"; // Indigo 950
    const highlightColor = "#312e81"; // Indigo 900

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
                >
                    {/* Skeleton Gambar */}
                    <div className="h-48">
                        <Skeleton
                            height="100%"
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
                    </div>

                    {/* Konten Card */}
                    <div className="p-4">
                        {/* Nama Produk */}
                        <Skeleton
                            width="80%"
                            height={20}
                            className="mb-2"
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />

                        {/* Harga */}
                        <div className="mb-4">
                            <Skeleton
                                width="40%"
                                height={24}
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                        </div>

                        {/* Badge Kategori */}
                        <div className="mb-6">
                            <Skeleton
                                width={100}
                                height={28}
                                borderRadius={9999}
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                        </div>

                        {/* Tombol */}
                        <div className="flex flex-col-reverse md:flex-row gap-3">
                            <Skeleton
                                width="100%"
                                height={48}
                                borderRadius={9999}
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductSkeleton;
