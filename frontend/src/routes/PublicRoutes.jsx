import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroSection from "../layouts/HeroSection";

import Features from "../layouts/Features";
import ContactForm from "../components/ContactForm";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import TutorApplication from "../components/TutorApplication";
import TutorTypical from "../components/TutorTypical";
import TutorList from "../components/TutorList";
import CourseList from "../components/CourseList";
import BecomeTutorSection from "../layouts/BecomeTutorSection";
import StarSection from "../layouts/StarSection";

const PublicRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="mt-20">
                        <HeroSection />
                        <StarSection />
                        <TutorTypical />
                        <BecomeTutorSection />
                        <Features />
                    </div>
                }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/becometutor" element={<TutorApplication />} />
            <Route path="/tutors" element={<TutorList />} />
            <Route path="/courses" element={<CourseList />} />
        </Routes>
    );
};

export default PublicRoutes;
