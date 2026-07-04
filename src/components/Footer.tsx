/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, Github, Linkedin, Twitter, Facebook, Send, Smile, Info, Heart, MessageSquare } from "lucide-react";
import { ThemePreset } from "../types";
import { PORTFOLIO_OWNER } from "../data";

interface FooterProps {
  activeTheme: ThemePreset;
}

interface CompactFeedback {
  name: string;
  emoji: string;
  message: string;
  date: string;
}

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
  scale: number;
  opacity: number;
}

const PRESET_FEEDBACKS: CompactFeedback[] = [
  { name: "Ada Lovelace", emoji: "🤯", message: "Incredibly elegant system playground flow!", date: "Just now" },
  { name: "Steve Jobs", emoji: "🎨", message: "Simple, beautiful, pixel-perfect glassmorphism.", date: "5m ago" },
  { name: "Satoshi", emoji: "🚀", message: "Decentralized state logic at its finest.", date: "1h ago" }
];

export default function Footer({ activeTheme }: FooterProps) {
  // Feedback states
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("✨");
  const [feedbacks, setFeedbacks] = useState<CompactFeedback[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [tickerIndex, setTickerIndex] = useState(0);

  // Particles state for interactive visual feedback bursts
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleId, setParticleId] = useState(0);

  // Load feedbacks on mount
  useEffect(() => {
    const saved = localStorage.getItem("salman_portfolio_feedbacks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Map old structure to compact feedback structure
        const mapped = parsed.map((item: any) => ({
          name: item.name || "Anonymous",
          emoji: item.emoji || "✨",
          message: item.message || "Loved the craft!",
          date: item.date || "Recently"
        }));
        setFeedbacks([...mapped, ...PRESET_FEEDBACKS]);
      } catch (e) {
        setFeedbacks(PRESET_FEEDBACKS);
      }
    } else {
      setFeedbacks(PRESET_FEEDBACKS);
    }
  }, []);

  // Ticker animation to rotate the displayed recent feedbacks dynamically
  useEffect(() => {
    if (feedbacks.length === 0) return;
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % feedbacks.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [feedbacks]);

  // Particle frame loop for custom HTML5 canvas-less elegant micro-bursts
  useEffect(() => {
    if (particles.length === 0) return;
    const frame = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev
          .map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            return {
              ...p,
              x: p.x + Math.cos(rad) * p.speed,
              y: p.y - p.speed * 1.5, // Float upwards
              opacity: p.opacity - 0.02,
              scale: p.scale * 0.98,
            };
          })
          .filter((p) => p.opacity > 0)
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [particles]);

  // Spawns delightful floating emojis from the action area
  const triggerEmojiBurst = (emoji: string) => {
    const count = 10;
    const newParticles: Particle[] = [];
    let currentId = particleId;

    for (let i = 0; i < count; i++) {
      currentId++;
      // Random arc: angles between 45 and 135 degrees
      const angle = 45 + Math.random() * 90;
      const speed = 2 + Math.random() * 4;
      const scale = 0.8 + Math.random() * 0.8;

      newParticles.push({
        id: currentId,
        emoji,
        x: 0, // Starts relative to container center
        y: 0,
        angle,
        speed,
        scale,
        opacity: 1,
      });
    }

    setParticleId(currentId);
    setParticles((prev) => [...prev, ...newParticles]);
  };

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
    triggerEmojiBurst(emoji);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    const newFeedback: CompactFeedback = {
      name: name.trim(),
      emoji: selectedEmoji,
      message: message.trim() || "Amazing work! Keep it up.",
      date: "Just now"
    };

    // Prepend to local storage
    const saved = localStorage.getItem("salman_portfolio_feedbacks");
    let savedList = [];
    if (saved) {
      try {
        savedList = JSON.parse(saved);
      } catch (err) {}
    }
    const updated = [newFeedback, ...savedList];
    localStorage.setItem("salman_portfolio_feedbacks", JSON.stringify(updated));

    // Update state list
    setFeedbacks([newFeedback, ...feedbacks.filter(f => f.date !== "Just now" && f.name !== name), ...savedList]);
    setTickerIndex(0); // Show user's feedback immediately in the live bubble

    // Burst celebration!
    triggerEmojiBurst(selectedEmoji);
    setTimeout(() => {
      triggerEmojiBurst("💖");
    }, 200);

    // Reset inputs
    setName("");
    setMessage("");
    setStatus("success");

    setTimeout(() => {
      setStatus("idle");
    }, 3500);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const currentTickerFeedback = feedbacks[tickerIndex];

  return (
    <footer className="relative border-t border-white/5 backdrop-blur-xl z-10 bg-[#07020d]/95 py-12 overflow-hidden">
      {/* Visual background lights */}
      <div
        className="absolute top-0 right-1/4 w-44 h-44 rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ backgroundColor: activeTheme.primary }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full blur-[90px] opacity-10 pointer-events-none"
        style={{ backgroundColor: activeTheme.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Row: Grid splits into Brand Info & Simple Interactive Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-10 border-b border-white/5">
          
          {/* Column 1: Brand & socials & Navigation (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-6.5 h-6.5 rounded-lg flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})`,
                    boxShadow: `0 0 12px ${activeTheme.primary}40`
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-black font-black" />
                </div>
                <span className="text-white font-display font-black tracking-tight text-xl">
                  {PORTFOLIO_OWNER.name}
                </span>
              </div>
              <p className="text-zinc-500 text-xs font-mono tracking-wide uppercase">
                {PORTFOLIO_OWNER.title}
              </p>
              <p className="text-zinc-400 text-sm max-w-md leading-relaxed font-sans">
                Building responsive distributed systems and highly interactive pixel-perfect user interfaces with React, Tailwind, and node architecture.
              </p>
            </div>

            {/* Quick Minimal Horizontal Navigation */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-zinc-400 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors relative"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Social profiles row */}
            <div className="flex gap-2.5 pt-1">
              <a
                href={PORTFOLIO_OWNER.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_OWNER.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_OWNER.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={PORTFOLIO_OWNER.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Compact Interactive Feedback Widget (Span 6) */}
          <div className="lg:col-span-6">
            <div className="p-5 sm:p-6 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md relative overflow-hidden">
              
              {/* Dynamic Scrolling Feedback Ticker Bubble (Highly interactive!) */}
              {currentTickerFeedback && (
                <div className="mb-4 bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-start gap-2.5 text-xs text-zinc-300 transition-all animate-fade-in relative">
                  <span className="text-lg leading-none shrink-0">{currentTickerFeedback.emoji}</span>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="font-bold text-zinc-200 text-[10px] flex items-center gap-1.5 font-mono">
                      {currentTickerFeedback.name}
                      <span className="text-[8px] font-normal text-zinc-500">{currentTickerFeedback.date}</span>
                    </p>
                    <p className="italic text-zinc-400 leading-normal truncate font-sans">
                      "{currentTickerFeedback.message}"
                    </p>
                  </div>
                  <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full animate-ping bg-purple-400" />
                </div>
              )}

              {/* Title & Emojis Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5" style={{ color: activeTheme.primary }} />
                  <span>Feedback on Me & My Portfolio</span>
                </span>
                
                {/* Micro Reactions Bar */}
                <div className="flex gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5 self-start">
                  {["🤯", "🚀", "✨", "🎨", "💖"].map((emo) => (
                    <button
                      key={emo}
                      type="button"
                      onClick={() => handleEmojiClick(emo)}
                      className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all active:scale-75 ${
                        selectedEmoji === emo ? "bg-white/10 text-white scale-110" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                      title={`Select ${emo}`}
                    >
                      {emo}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="space-y-3 relative">
                
                {/* Floating particle container scoped locally inside card! */}
                <div className="absolute top-1/2 left-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-20">
                  {particles.map((p) => (
                    <span
                      key={p.id}
                      className="absolute text-lg select-none pointer-events-none"
                      style={{
                        transform: `translate3d(${p.x}px, ${p.y}px, 0) scale(${p.scale})`,
                        opacity: p.opacity,
                        transition: "transform 16ms linear, opacity 16ms linear",
                      }}
                    >
                      {p.emoji}
                    </span>
                  ))}
                </div>

                {status === "success" ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-sans text-center">
                    ✨ Thank you! Your feedback has been published to the visitor board. 💖
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      {/* Name input */}
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name *"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-purple-400/50 text-white outline-none transition-all font-mono"
                        />
                      </div>
                      
                      {/* Message input */}
                      <div className="sm:col-span-8">
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Short feedback (e.g. Awesome UI!)"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-purple-400/50 text-white outline-none transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Submit Row */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-500">
                        <Info className="w-3 h-3 shrink-0" />
                        <span>Interactive emoji pops up on click!</span>
                      </div>
                      
                      <button
                        type="submit"
                        className="group flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold text-black transition-all active:scale-95 shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})`,
                        }}
                      >
                        <Send className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        <span>Send & Burst</span>
                      </button>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="text-[10px] text-red-400 font-mono text-right">
                    ⚠️ Please fill in your name first.
                  </div>
                )}
              </form>

            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyright & back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8">
          
          {/* Copyright notice */}
          <p className="text-zinc-500 text-xs text-center sm:text-left font-sans">
            &copy; {new Date().getFullYear()} <span className="text-zinc-300 font-semibold font-display">{PORTFOLIO_OWNER.name}</span>. All rights reserved.
          </p>

          {/* Design philosophy statement */}
          <p className="text-[10px] text-zinc-600 font-mono tracking-wider uppercase text-center sm:text-left">
            Designed with Minimalist Bento Grid Layouts
          </p>

        </div>

      </div>
    </footer>
  );
}
