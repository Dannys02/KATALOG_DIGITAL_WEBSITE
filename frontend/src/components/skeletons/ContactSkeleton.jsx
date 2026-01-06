import Skeleton from "react-loading-skeleton";

const ContactSkeleton = () => {
    const baseColor = "#1e1b4b"; // Indigo 950
    const highlightColor = "#312e81"; // Indigo 900

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                {/* Header Section Skeleton */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <Skeleton width={160} height={36} borderRadius={9999} baseColor={baseColor} highlightColor={highlightColor} />
                    </div>
                    <div className="flex justify-center mb-6">
                        <Skeleton width={300} height={48} baseColor={baseColor} highlightColor={highlightColor} className="md:w-[450px]" />
                    </div>
                    <div className="flex justify-center">
                        <Skeleton width="60%" height={20} baseColor={baseColor} highlightColor={highlightColor} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Left Side: Contact Info Skeleton */}
                    <div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <Skeleton width="50%" height={32} className="mb-8" baseColor={baseColor} highlightColor={highlightColor} />
                            
                            <div className="space-y-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                                        <Skeleton width={48} height={48} borderRadius={12} baseColor={baseColor} highlightColor={highlightColor} />
                                        <div className="flex-1">
                                            <Skeleton width="40%" height={20} className="mb-2" baseColor={baseColor} highlightColor={highlightColor} />
                                            <Skeleton width="70%" height={16} baseColor={baseColor} highlightColor={highlightColor} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form Skeleton */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <Skeleton width="40%" height={32} className="mb-8" baseColor={baseColor} highlightColor={highlightColor} />
                        
                        <div className="space-y-6">
                            {/* Name Input */}
                            <div>
                                <Skeleton width={120} height={20} className="mb-2" baseColor={baseColor} highlightColor={highlightColor} />
                                <Skeleton height={48} borderRadius={12} baseColor={baseColor} highlightColor={highlightColor} />
                            </div>

                            {/* Email & Phone Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Skeleton width={80} height={20} className="mb-2" baseColor={baseColor} highlightColor={highlightColor} />
                                    <Skeleton height={48} borderRadius={12} baseColor={baseColor} highlightColor={highlightColor} />
                                </div>
                                <div>
                                    <Skeleton width={130} height={20} className="mb-2" baseColor={baseColor} highlightColor={highlightColor} />
                                    <Skeleton height={48} borderRadius={12} baseColor={baseColor} highlightColor={highlightColor} />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <Skeleton width={100} height={20} className="mb-2" baseColor={baseColor} highlightColor={highlightColor} />
                                <Skeleton height={48} borderRadius={12} baseColor={baseColor} highlightColor={highlightColor} />
                            </div>

                            {/* Message */}
                            <div>
                                <Skeleton width={80} height={20} className="mb-2" baseColor={baseColor} highlightColor={highlightColor} />
                                <Skeleton height={140} borderRadius={12} baseColor={baseColor} highlightColor={highlightColor} />
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Skeleton width="100%" height={56} borderRadius={12} baseColor={baseColor} highlightColor={highlightColor} />
                                <Skeleton width="100%" height={56} borderRadius={12} baseColor={baseColor} highlightColor={highlightColor} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSkeleton;
