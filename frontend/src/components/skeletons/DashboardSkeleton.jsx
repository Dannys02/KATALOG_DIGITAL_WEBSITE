import Skeleton from "react-loading-skeleton";

const DashboardSkeleton = () => {
    const baseColor = "#1a1a1a"; // Warna dasar gelap untuk dashboard
    const highlightColor = "#262626";

    return (
        <div className="space-y-8">
            {/* Stats Card Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <Skeleton
                        width="40%"
                        height={16}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton
                        width="20%"
                        height={32}
                        className="mt-2"
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                {/* Table Header Skeleton */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <Skeleton
                        width={120}
                        height={24}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton
                        width={100}
                        height={36}
                        borderRadius={8}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </div>

                {/* Table Rows Skeleton */}
                <div className="p-4 space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-4 border-b border-white/5"
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <Skeleton
                                    width={40}
                                    height={40}
                                    borderRadius={4}
                                    baseColor={baseColor}
                                    highlightColor={highlightColor}
                                />
                                <Skeleton
                                    width="50%"
                                    height={20}
                                    baseColor={baseColor}
                                    highlightColor={highlightColor}
                                />
                            </div>
                            <div className="hidden md:block flex-1 px-4">
                                <Skeleton
                                    width="60%"
                                    height={20}
                                    baseColor={baseColor}
                                    highlightColor={highlightColor}
                                />
                            </div>
                            <div className="hidden md:block w-32 px-4">
                                <Skeleton
                                    width="80%"
                                    height={20}
                                    baseColor={baseColor}
                                    highlightColor={highlightColor}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton
                                    width={32}
                                    height={32}
                                    borderRadius={8}
                                    baseColor={baseColor}
                                    highlightColor={highlightColor}
                                />
                                <Skeleton
                                    width={32}
                                    height={32}
                                    borderRadius={8}
                                    baseColor={baseColor}
                                    highlightColor={highlightColor}
                                />
                                <Skeleton
                                    width={32}
                                    height={32}
                                    borderRadius={8}
                                    baseColor={baseColor}
                                    highlightColor={highlightColor}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
