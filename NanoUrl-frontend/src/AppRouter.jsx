
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ShortenUrlPage from "./components/ShortenUrlPage.jsx";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./components/LandingPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import DashboardLayout from "./Dashboard/DashboardLayout.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { Toaster } from "react-hot-toast";

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

const AppRouter = () => {
    return (
    <>
      <Navbar />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            zIndex: 9999,
          },
        }}
      />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/:url" element={<ShortenUrlPage />} />
        <Route path="/error" element={ <ErrorPage />} />
        <Route path="*" element={ <ErrorPage message="Sorry, the page you are looking for does not exist."/> } />
      </Routes>
    </>
    );
}

export default AppRouter;

export const SubDomainRouter = () => {
    return (
        <Routes>
            <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    );
}