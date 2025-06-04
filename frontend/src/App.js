import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow mt-20">
                    <PublicRoutes />
                    <AdminRoutes />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;
