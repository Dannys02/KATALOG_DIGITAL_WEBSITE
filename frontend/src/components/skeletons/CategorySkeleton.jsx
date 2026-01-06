import Skeleton from "react-loading-skeleton";

const CategorySkeleton = () => {
    const baseColor = "#1e1b4b"; // Indigo 950
    const highlightColor = "#312e81"; // Indigo 900

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                {/* Header Section Skeleton */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <Skeleton 
                            width={160} 
                            height={36} 
                            borderRadius={9999} 
                            baseColor={baseColor} 
                            highlightColor={highlightColor} 
                        />
                    </div>
                    <div className="flex justify-center mb-6">
                        <Skeleton 
                            width={250} 
                            height={48} 
                            baseColor={baseColor} 
                            highlightColor={highlightColor} 
                        />
                    </div>
                    <div className="flex justify-center">
                        <Skeleton 
                            width="60%" 
                            height={20} 
                            baseColor={baseColor} 
                            highlightColor={highlightColor} 
                        />
                    </div>
                </div>

                {/* Categories Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div 
                            key={item} 
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                        >
                            {/* Icon Box Skeleton */}
                            <div className="mb-6">
                                <Skeleton 
                                    width={64} 
                                    height={64} 
                                    borderRadius={16} 
                                    baseColor={baseColor} 
                                    highlightColor={highlightColor} 
                                />
                            </div>

                            {/* Title & Description */}
                            <Skeleton 
                                width="50%" 
                                height={28} 
                                className="mb-3" 
                                baseColor={baseColor} 
                                highlightColor={highlightColor} 
                            />
                            <Skeleton 
                                count={2} 
                                width="100%" 
                                className="mb-6" 
                                baseColor={baseColor} 
                                highlightColor={highlightColor} 
                            />

                            {/* Footer (Badge & Arrow) */}
                            <div className="flex items-center justify-between">
                                <Skeleton 
                                    width={80} 
                                    height={24} 
                                    borderRadius={9999} 
                                    baseColor={baseColor} 
                                    highlightColor={highlightColor} 
                                />
                                <Skeleton 
                                    circle 
                                    width={24} 
                                    height={24} 
                                    baseColor={baseColor} 
                                    highlightColor={highlightColor} 
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button Bottom Skeleton */}
                <div className="text-center mt-16 flex justify-center">
                    <Skeleton 
                        width={220} 
                        height={56} 
                        borderRadius={9999} 
                        baseColor={baseColor} 
                        highlightColor={highlightColor} 
                    />
                </div>
            </div>
        </section>
    );
};

export default CategorySkeleton;
