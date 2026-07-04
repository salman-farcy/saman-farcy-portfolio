

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoAbout from "./components/BentoAbout";
import SkillsGrid from "./components/SkillsGrid";
import ExperienceEducation from "./components/ExperienceEducation";
import ProjectsSection from "./components/ProjectsSection";
import SystemArchitecturePlayground from "./components/SystemArchitecturePlayground";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { THEME_PRESETS } from "./data";
import { ThemePreset } from "./types";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Use Deep Orchid (the vibrant classic dark purple) as our default preset
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden bg-linear-to-b ${activeTheme.bgGradient} transition-colors duration-1000`}
    >
      {/* Decorative dynamic ambient background mesh overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/80 pointer-events-none mix-blend-multiply z-0" />

      {/* Glassmorphic customizable portfolio contents */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar activeTheme={activeTheme} onThemeChange={setActiveTheme} />

        {/* Hero Section containing Designation and Resume action */}
        <Hero activeTheme={activeTheme} />

        {/* Bento Grid About Me section */}
        <BentoAbout activeTheme={activeTheme} />

        {/* Skills visualization Section */}
        <SkillsGrid activeTheme={activeTheme} />

        {/* Projects Showcase Cards with detail-view modal overlays */}
        <ProjectsSection activeTheme={activeTheme} />

        {/* Education and Experience Timeline Section */}
        <ExperienceEducation activeTheme={activeTheme} />

        {/* Interactive Distributed Systems Sandbox */}
        <SystemArchitecturePlayground activeTheme={activeTheme} />

        {/* Contact direct credentials and submission form */}
        <ContactSection activeTheme={activeTheme} />

        {/* Presentation Footer */}
        <Footer activeTheme={activeTheme} />
      </div>

      {/* Dynamic Floating Back-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -6, 0]
            }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              y: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-[99999] flex items-center justify-center p-2.5 rounded-full border shadow-2xl text-white backdrop-blur-xl cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: "rgba(13, 7, 24, 0.85)",
              borderColor: isHovered ? activeTheme.primary : "rgba(255, 255, 255, 0.15)",
              boxShadow: isHovered
                ? `0 10px 30px -5px rgba(0,0,0,0.8), 0 0 15px 3px ${activeTheme.primary}55, 0 0 1px 1px rgba(255,255,255,0.1)`
                : "0 10px 30px -5px rgba(0,0,0,0.8), 0 0 1px 1px rgba(255,255,255,0.05)"
            }}
            aria-label="Scroll back to top"
            title="Scroll to Top"
          >
            <ArrowUp
              className="w-5 h-5 transition-colors duration-300"
              style={{ color: isHovered ? "#ffffff" : activeTheme.primary }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
