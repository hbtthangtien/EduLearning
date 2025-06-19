import React from "react";
import { Route } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import TutorApplication from "../components/TutorApplication";
import TutorList from "../components/TutorList";
import CourseList from "../components/CourseList";
import CourseDetail from "../components/CourseDetail";
import TutorDetail from "../components/TutorDetail";
import HomePage from "../layouts/HomePage";
import EnrollCourse from "../components/EnrollCourse";

export const getPublicRoutes = () => (
    <>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/becometutor" element={<TutorApplication />} />
        <Route path="/tutors" element={<TutorList />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course-detail/:id" element={<CourseDetail />} />
        <Route path="/tutor-detail/:id" element={<TutorDetail />} />
        <Route path="/enroll/:id" element={<EnrollCourse />} />
    </>
);
