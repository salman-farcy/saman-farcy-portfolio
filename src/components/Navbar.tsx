import React, { useState, useEffect } from "react";
import { Menu, X, Settings, Sparkles, Check } from "lucide-react";
import { THEME_PRESETS } from "../data";
import { ThemePreset } from "../types";

interface NavbarProps {
  activeTheme: ThemePreset;
  onThemeChange: (theme: ThemePreset) => void;
}

export default function Navbar({ activeTheme, onThemeChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    // { name: "Sandbox", href: "#architecture-sandbox" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? `${activeTheme.glassBg} ${activeTheme.glassBorder} backdrop-blur-md py-4 shadow-lg`
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-2 font-display text-xl sm:text-2xl font-bold text-white tracking-wider group"
          >
            <div
              className="w-8 lg:w-12 h-8 lg:h-12 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-20"
              style={{
                background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})`
              }}
            >
              {/* <Sparkles className="w-4 h-4 text-black font-bold" /> */}
              <span>SF</span>
            </div>
            <span>
              SALMAN <span style={{ color: activeTheme.accent }}>FARCY</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-6 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white transition-colors duration-200 relative group"
              >
                {link.name}
                <span
                  className="absolute bottom-1 left-4 right-4 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                  style={{ backgroundColor: activeTheme.accent }}
                />
              </a>
            ))}
          </nav>

          {/* Theme Customizer & Actions */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-all"
                title="Customize Theme"
              >
                <Settings className="w-3.5 h-3.5 animate-spin-slow" />
                <span className="hidden sm:inline">Theme</span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: activeTheme.primary }}
                />
              </button>

              {/* Theme Dropdown */}
              {showThemePicker && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowThemePicker(false)}
                  />
                  <div
                    className="absolute right-0 mt-3 w-56 rounded-2xl border backdrop-blur-xl p-3 shadow-2xl z-20"
                    style={{
                      backgroundColor: "rgba(13, 7, 24, 0.95)",
                      borderColor: "rgba(255, 255, 255, 0.12)"
                    }}
                  >
                    <div className="text-[10px] uppercase tracking-wider font-mono text-zinc-500 px-2 pb-2 mb-2 border-b border-white/5">
                      Select Theme Accent
                    </div>
                    <div className="space-y-1">
                      {THEME_PRESETS.map((preset) => {
                        const isSelected = preset.id === activeTheme.id;
                        return (
                          <button
                            key={preset.id}
                            onClick={() => {
                              onThemeChange(preset);
                              setShowThemePicker(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-xl transition-all text-left text-xs ${
                              isSelected
                                ? "bg-white/10 text-white"
                                : "hover:bg-white/5 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: preset.primary }}
                                />
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: preset.accent }}
                                />
                              </div>
                              <span className="font-medium">{preset.name}</span>
                            </div>
                            {isSelected && (
                              <Check
                                className="w-3.5 h-3.5"
                                style={{ color: activeTheme.accent }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Overlay and Menu) */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 top-[72px] bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="fixed top-[72px] left-0 right-0 z-40 md:hidden border-b transition-all duration-300 ease-out"
            style={{
              backgroundColor: "rgba(13, 7, 24, 0.98)",
              borderColor: "rgba(255, 255, 255, 0.08)"
            }}
          >
            <nav className="flex flex-col px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-base font-medium text-zinc-300 hover:text-white py-2 transition-colors border-b border-white/5 flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <span
                    className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: activeTheme.accent }}
                  />
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
