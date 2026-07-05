

import React, { useState, useEffect } from "react";
import { Download, Youtube, Github, Linkedin, Twitter, Facebook, ArrowRight, CheckCircle2, ArrowUpRight, Terminal, Cpu, Sparkles, Activity, Check } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";
import { ThemePreset } from "../types";
import Typewriter from "./Typewriter";
import ResumeDownloadButton from "./common/ResumeDownloadButton";


interface HeroProps {
  activeTheme: ThemePreset;
}

export default function Hero({ activeTheme }: HeroProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [photoMode, setPhotoMode] = useState<"photo" | "hud" | "ping">("photo");
  const [pingCount, setPingCount] = useState(0);
  const [isPinging, setIsPinging] = useState(false);

  const [headingOneComplete, setHeadingOneComplete] = useState(false);
  const [headingTwoComplete, setHeadingTwoComplete] = useState(false);
  const [subheadingComplete, setSubheadingComplete] = useState(false);

  const triggerPing = () => {
    setIsPinging(true);
    setPingCount((prev) => prev + 1);
    setTimeout(() => setIsPinging(false), 800);
  };

  const handleDownload = () => {
    if (downloading || downloadComplete) return;
    setDownloading(true);

    // Simulate a beautiful modern resume download pipeline
    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);


      // Reset complete notification after 4 seconds
      setTimeout(() => {
        setDownloadComplete(false);
      }, 4000);
    }, 1500);
  };

  const handleExploreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Background Floating Orbs */}
      <div
        className="absolute top-1/4 left-10 w-72 h-72 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float"
        style={{ backgroundColor: activeTheme.primary }}
      />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full mix-blend-screen filter blur-[150px] opacity-15 animate-pulse-slow"
        style={{ backgroundColor: activeTheme.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Intro Information */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 order-2 lg:order-1">
            {/* Status Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeTheme.accent }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activeTheme.accent }} />
              </span>
              <span>Available for Hire & Collaboration</span>
            </div>

            {/* Title / Designation */}
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: activeTheme.accent }}>
                // Salman Farcy Portfolio
              </p>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] tracking-tighter text-white min-h-[6.5rem] sm:min-h-[9rem] md:min-h-[11rem] lg:min-h-[11.5rem]">
                <Typewriter
                  text="FULL-STACK"
                  delay={100}
                  speed={80}
                  onComplete={() => setHeadingOneComplete(true)}
                  cursorColor={activeTheme.accent}
                />
                <br />
                {headingOneComplete && (
                  <span className="bg-gradient-to-r bg-clip-text text-transparent inline-block cursor-default" style={{ backgroundImage: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})` }}>
                    <Typewriter
                      text="DEVELOPER."
                      speed={60}
                      onComplete={() => setHeadingTwoComplete(true)}
                      cursorColor={activeTheme.primary}
                    />
                  </span>
                )}
              </h1>
              <h2 className="font-display text-sm sm:text-base md:text-lg font-medium tracking-wide text-zinc-300 min-h-[1.5rem] sm:min-h-[1.75rem]">
                {headingTwoComplete && (
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-1.5">
                    <span>{PORTFOLIO_OWNER.name} •</span>
                    <span style={{ color: activeTheme.accent }} className="font-semibold">
                      <Typewriter
                        texts={[
                          "Full Stack Developer.",
                          "UI/UX Craftsman",
                          "Creative Thinker",
                          "React & Node Specialist"
                        ]}
                        speed={30}
                        deleteSpeed={25}
                        pauseDelay={2200}
                        loop={true}
                        cursorColor={activeTheme.accent}
                        onComplete={() => setSubheadingComplete(true)}
                      />
                    </span>
                  </div>
                )}
              </h2>
            </div>

            {/* Subtitle */}
            <p className={`text-zinc-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans transition-all duration-700 ${headingTwoComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              {PORTFOLIO_OWNER.subTitle}
            </p>

            {/* Resume Button & Explore CTA */}
            <div className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 transition-all duration-700 delay-200 ${headingTwoComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              {/* Resume Downlode Button */}
              <ResumeDownloadButton activeTheme={activeTheme} downloadComplete={downloadComplete} downloading={downloading} handleDownload={handleDownload} />


              <button
                onClick={handleExploreClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all duration-300 hover:border-white/25 active:scale-95"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Social Links */}
            <div className={`flex items-center justify-center lg:justify-start gap-3 pt-6 transition-all duration-700 delay-400 ${headingTwoComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mr-2">Connect:</span>
              {[
                { icon: Github, link: PORTFOLIO_OWNER.socials.github, label: "GitHub" },
                { icon: Linkedin, link: PORTFOLIO_OWNER.socials.linkedin, label: "LinkedIn" },
                { icon: Youtube, link: PORTFOLIO_OWNER.socials.youtube, label: "Youtube" },
                { icon: Twitter, link: PORTFOLIO_OWNER.socials.twitter, label: "Twitter" },
                { icon: Facebook, link: PORTFOLIO_OWNER.socials.facebook, label: "Facebook" }
              ].map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    href={soc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/8 hover:border-white/20 text-zinc-400 hover:text-white transition-all hover:-translate-y-1 hover:bg-white/10 relative group"
                    aria-label={soc.label}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-950 border border-white/10 text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {soc.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Interactive Profile Photo frame / Bento Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 gap-4">

            {/* Interactive Tab Switcher above the Avatar */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-zinc-900/80 border border-white/5 backdrop-blur-md">
              {[
                { id: "photo", label: "Portrait", icon: Sparkles },
                { id: "hud", label: "Sys Specs", icon: Cpu },
                { id: "ping", label: "Ping Dev", icon: Terminal }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPhotoMode(tab.id as any)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 active:scale-95"
                    style={{
                      backgroundColor: photoMode === tab.id ? `${activeTheme.primary}15` : "transparent",
                      color: photoMode === tab.id ? "white" : "#71717a",
                      border: photoMode === tab.id ? `1px solid ${activeTheme.primary}40` : "1px solid transparent"
                    }}
                  >
                    <IconComponent className="w-3.5 h-3.5" style={{ color: photoMode === tab.id ? activeTheme.accent : undefined }} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative group max-w-[320px] sm:max-w-2xl w-full aspect-square">
              {/* Outer decorative neon spinning glowing border */}
              <div
                className="absolute inset-0 rounded-3xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent}, ${activeTheme.primary})`
                }}
              />
              <div
                className="absolute -inset-1.5 rounded-2xl opacity-30 group-hover:opacity-60 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})`
                }}
              />

              {/* Central container */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/40 backdrop-blur-md flex flex-col justify-between">

                {/* Cyber HUD Corner Brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity" style={{ borderColor: activeTheme.accent }} />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity" style={{ borderColor: activeTheme.accent }} />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity" style={{ borderColor: activeTheme.accent }} />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity" style={{ borderColor: activeTheme.accent }} />

                {/* Radar sweep laser animation line */}
                <div
                  className="absolute left-0 right-0 h-[2px] opacity-20 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, transparent, ${activeTheme.accent}, transparent)`,
                    animation: "radar-sweep 4s infinite linear"
                  }}
                />

                {/* Mode 1: Photo View */}
                {photoMode === "photo" && (
                  <div className="relative w-full h-full">
                    <img
                      src={PORTFOLIO_OWNER.avatar}
                      alt={PORTFOLIO_OWNER.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />

                    {/* Glowing status dot overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-300">Active Now</span>
                    </div>

                    {/* Glassmorphic floating card in photo */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white font-display">{PORTFOLIO_OWNER.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">Located: Dhaka, BD</div>
                      </div>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 border border-white/10 text-white"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 2: System Specs HUD */}
                {photoMode === "hud" && (
                  <div className="p-6 h-full flex flex-col justify-between font-mono text-xs text-zinc-300">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-500">// ENGINE SPEC</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-bold">Online</span>
                      </div>

                      <div className="space-y-3 pt-1">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Architecture:</span>
                          <span className="text-white font-medium">ESM + TypeScript</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">FPS Target:</span>
                          <span className="text-white font-medium">60 FPS (Hardware Accel)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Lighthouse Score:</span>
                          <span className="text-emerald-400 font-medium font-bold">99/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Deploy Status:</span>
                          <span className="text-white font-medium">Cloud Run v1.0.8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Primary Core:</span>
                          <span className="text-white font-medium">React + Next + Node</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/5">
                        <Activity className="w-4 h-4" style={{ color: activeTheme.accent }} />
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase font-semibold">Development Health</div>
                        <div className="text-white font-semibold text-xs">A Grade &bull; Verified Build</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 3: Ping Developer Interface */}
                {photoMode === "ping" && (
                  <div className="p-6 h-full flex flex-col justify-between text-center relative overflow-hidden">

                    {/* Simulated Ripple Radar Ring if active */}
                    {isPinging && (
                      <div
                        className="absolute inset-0 rounded-3xl animate-ping border-2 opacity-40 pointer-events-none"
                        style={{ borderColor: activeTheme.accent }}
                      />
                    )}

                    <div className="space-y-3 pt-4">
                      <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-white/5 border border-white/10" style={{ color: activeTheme.accent }}>
                        <Terminal className="w-5 h-5" />
                      </div>
                      <h4 className="font-display text-base font-bold text-white">Ping Salman's Portal</h4>
                      <p className="text-zinc-400 text-xs font-sans max-w-[200px] mx-auto">
                        Send a direct client ping to verify this portfolio connection.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Counter badge */}
                      <div className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/5 rounded-xl py-1.5 px-3 max-w-[150px] mx-auto">
                        Signals Sent: <span className="text-white font-bold" style={{ color: activeTheme.accent }}>{pingCount}</span>
                      </div>

                      <button
                        onClick={triggerPing}
                        className="w-full relative group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs text-white transition-all duration-300 active:scale-95 border hover:brightness-110"
                        style={{
                          background: `linear-gradient(135deg, ${activeTheme.primary}30, ${activeTheme.accent}30)`,
                          borderColor: activeTheme.primary
                        }}
                      >
                        {isPinging ? (
                          <>
                            <Activity className="w-3.5 h-3.5 animate-bounce" />
                            <span>TRANSMITTING SIGNAL...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>SEND SIGNAL PING</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
