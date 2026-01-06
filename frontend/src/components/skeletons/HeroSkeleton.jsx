import Skeleton from "react-loading-skeleton";

const HeroSkeleton = () => {
    const baseColor = "#1e1b4b"; // indigo-950
    const highlightColor = "#312e81"; // indigo-900

    return (
        <section className="py-24 flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-4xl mx-auto w-full">
                {/* Badge Skeleton */}
                <div className="mb-8 flex justify-center">
                    <Skeleton
                        width={200}
                        height={36}
                        borderRadius={9999}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </div>

                {/* Heading Skeleton (Upgrade Skill Digital Anda) */}
                <div className="mb-6">
                    <Skeleton
                        width="70%"
                        height={60}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                        className="md:h-16 lg:h-20"
                    />
                    <div className="mt-2">
                        <Skeleton
                            width="50%"
                            height={60}
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                            className="md:h-16 lg:h-20"
                        />
                    </div>
                </div>

                {/* Paragraph Skeleton */}
                <div className="mb-10 max-w-3xl mx-auto">
                    <Skeleton
                        count={2}
                        width="90%"
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </div>

                {/* Grid 3 Kolom Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[1, 2, 3].map(i => (
                        <div
                            key={i}
                            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                        >
                            <Skeleton
                                circle
                                width={48}
                                height={48}
                                className="mb-4"
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                            <Skeleton
                                width="60%"
                                height={24}
                                className="mb-2"
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                            <Skeleton
                                count={2}
                                width="100%"
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                        </div>
                    ))}
                </div>

                {/* Button Group Skeleton */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Skeleton
                        width={180}
                        height={56}
                        borderRadius={9999}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton
                        width={180}
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

export default HeroSkeleton;
