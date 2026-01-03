import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/section/Hero";
import Category from "../components/section/Category";
import Contact from "../components/section/Contact";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Category />
            <Contact />
            <Footer />
        </>
    );
};

export default Home;
