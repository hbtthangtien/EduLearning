import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Features from "./Features";
import StarSection from "./StarSection";
import BecomeTutorSection from "./BecomeTutorSection";
import TutorTypical from "./TutorTypical";
import logo from "../assest/background.jpg";
import ChatbotWidget from "../components/ChatboxWidget";

const HomePage = () => {
    return (
        <div
            className="h-full min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${logo})`, zIndex: -1 }}
        >
            <Navbar />
            <HeroSection />
            <Features />
            <StarSection />
            <BecomeTutorSection />
            <TutorTypical />
            <ChatbotWidget />
        </div>
    );
};

export default HomePage;
