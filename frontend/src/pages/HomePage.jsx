import React, { useState, useEffect } from 'react';
import Hero from "../components/section/Hero";
import Category from "../components/section/Category";
import Contact from "../components/section/Contact";
import HeroSkeleton from "../components/skeletons/HeroSkeleton";
import CategorySkeleton from "../components/skeletons/CategorySkeleton";
import ContactSkeleton from "../components/skeletons/ContactSkeleton";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulasi mengambil data dari API
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <>
                <HeroSkeleton />
                <CategorySkeleton />
                <ContactSkeleton />
            </>
        );
    }

    return (
        <>
            <Hero />
            <Category />
            <Contact />
        </>
    );
};

export default Home;
