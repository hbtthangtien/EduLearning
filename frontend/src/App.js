import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { getPublicRoutes } from "./routes/PublicRoutes";
import { getAdminRoutes } from "./routes/AdminRoutes";
import { getTutorRoutes } from "./routes/TutorRoutes";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            {" "}
            <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <div className="flex-grow mt-20">
                        <Routes>
                            {getPublicRoutes()}
                            {getAdminRoutes()}
                            {getTutorRoutes()}
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
