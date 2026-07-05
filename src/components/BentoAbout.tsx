

import React, { useState, useEffect, useRef } from "react";
import { Smile, Coffee, Clock, Heart, Code, Music, Play, Pause, Plus, Sparkles, MapPin, Terminal, ChevronRight, Command } from "lucide-react";
import { ThemePreset } from "../types";
import music from "@/src/assets/audio/background.mp3";
import localTimeImage from "@/src/assets/images/localtime.png";


interface BentoAboutProps {
  activeTheme: ThemePreset;
}

export default function BentoAbout({ activeTheme }: BentoAboutProps) {
  const audioRef = useRef(null);
  const [cups, setCups] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState("");
  const [showParticle, setShowParticle] = useState(false);
  const [selectedCmd, setSelectedCmd] = useState<string>("profile");
  const [terminalOutput, setTerminalOutput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Audio Mock Controls
  const audioMockControls = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  // Dhaka Local Time Tick (UTC +6)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Adjust to UTC+6 for Dhaka
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const dhakaTime = new Date(utc + 3600000 * 6);

      const hours = String(dhakaTime.getHours()).padStart(2, "0");
      const minutes = String(dhakaTime.getMinutes()).padStart(2, "0");
      const seconds = String(dhakaTime.getSeconds()).padStart(2, "0");
      const ampm = dhakaTime.getHours() >= 12 ? "PM" : "AM";

      setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddCoffee = () => {
    setCups((prev) => prev + 1);
    setShowParticle(true);
    setTimeout(() => setShowParticle(false), 800);
  };

  const COMMAND_CONTENTS: Record<string, string> = {
    profile: `## PROFILE.MD
> Name: Salman Farcy
> Role: Full-Stack Developer
> Focus: Web Apps, Scalable Server Engines, Interactive Frontends
> Mission: Crafting digital artifacts with premium pixel-perfection and robust backend mechanics. No shortcuts, just pure structural craftsmanship.`,
    stats: `{
  "uptime": "99.99%",
  "projects_shipped": 24,
  "bugs_slayed": 842,
  "coffee_conversion_ratio": "1 cup = 70 lines of robust code",
  "client_satisfaction": "100%",
  "current_location": "Dhaka, Bangladesh"
}`,
    hire: `## CONNECT WITH SALMAN
[AUTH SUCCESSFUL - SECURE CONNECTION]
Status: Available for contracts, consulting, & innovative full-time positions.
Email: salmanfarcy253@gmail.com
Response rate: Exceptional (< 4 hours)
Let's build something beautiful and high-performance.`,
    stack: `## SYSTEM_TECH_STACK.CFG
- Frontend: React.js, TypeScript, Next.js, TailwindCSS, Motion, Redux
- Backend: Node.js, Express, Go, REST & GraphQL APIs, Websockets
- Database: PostgreSQL, MongoDB, Firebase Firestore, Prisma, Drizzle
- Tools: Docker, Git, Linux, GCP, AWS, Vercel`
  };

  useEffect(() => {
    setIsTyping(true);
    let index = 0;
    const fullText = COMMAND_CONTENTS[selectedCmd] || "";
    setTerminalOutput("");

    const interval = setInterval(() => {
      setTerminalOutput((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 4);

    return () => clearInterval(interval);
  }, [selectedCmd]);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div
        className="absolute top-1/3 right-10 w-80 h-80 rounded-full mix-blend-screen filter blur-[130px] opacity-10"
        style={{ backgroundColor: activeTheme.primary }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center md:text-left mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white">
            About <span style={{ color: activeTheme.accent }}>Me</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r mt-3 mx-auto md:mx-0 rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${activeTheme.primary}, ${activeTheme.accent})` }} />
          <p className="text-zinc-400 text-sm mt-4 max-w-xl">
            I build fast, scalable, and user focused web applications with the MERN Stack. I'm committed to clean code, continuous growth, and delivering high-quality digital solutions.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1: My Coding Journey (Col span 2, row span 1) */}
          <div className="md:col-span-2 p-4 sm:p-8 rounded-3xl border glass-card bg-white/5 relative overflow-hidden" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-20" style={{ backgroundColor: activeTheme.primary }} />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-white/5 text-purple-300">
                <Code className="w-5 h-5" style={{ color: activeTheme.accent }} />
              </div>
              <h3 className="font-display text-lg font-bold text-white">My Coding Journey</h3>
            </div>

            <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
              <p>My journey into web development began in 2022 with a curiosity about how modern websites are built. What started with learning HTML, CSS, and JavaScript quickly grew into a passion for creating responsive, interactive, and user friendly web experiences. Every project has strengthened my problem solving mindset and deepened my understanding of modern frontend development.</p>

              <p>
                Today, I focus primarily on building clean, scalable interfaces with React.js, Next.js, Tailwind CSS, and Bootstrap, while continuously expanding my fullstack knowledge through Node.js, Express.js, MongoDB, PostgreSQL, and Prisma. I enjoy transforming ideas into polished digital products that combine thoughtful design, performance, and accessibility.
              </p>

              <p> 
                I believe great software is more than writing code it's about creating experiences people genuinely enjoy using. As a lifelong learner, I'm always exploring new technologies, improving my craft, and building projects that prepare me for the next challenge in my web development journey.
              </p>
            </div>
          </div>

          {/* Card 2: Personal Stats/Vibe Player (Col span 1, row span 1) */}
          <div className="p-4 sm:p-6 rounded-3xl border glass-card bg-white/5 flex flex-col justify-between" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 text-purple-300">
                    <Music className="w-5 h-5" style={{ color: activeTheme.primary }} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">Current Vibe</h3>
                </div>
                <span className="text-[10px] uppercase font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">Radio</span>
              </div>

              {/* Album Visual */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-black border border-white/10 flex items-center justify-center p-4">
                {/* Simulated Audio Waves */}
                <div className="flex items-end gap-1.5 h-12">
                  {[4, 10, 6, 12, 5, 9, 3, 11, 7, 5, 8, 4].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-full transition-all duration-300"
                      style={{
                        height: isPlaying ? `${h * 4}px` : "6px",
                        backgroundColor: activeTheme.accent,
                        animation: isPlaying ? `float ${1.5 + (i * 0.1)}s ease-in-out infinite` : "none"
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="font-medium text-white text-sm">Lofi Coding Session</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">ChilledCow Radio beats</div>
              </div>
            </div>

            {/* Audio Mock Controls */}
            <audio ref={audioRef} src={music} loop />
            <button
              onClick={() => audioMockControls()}
              className="mt-4 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-all flex items-center justify-center gap-2"
            >

              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Chillstream</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Listen in Ambient</span>
                </>
              )}
            </button>
          </div>

          {/* Card 3: Dhaka Clock Widget (Col span 1) */}
          <div className="p-4 md:p-6 rounded-3xl border border-white glass-card bg-white/5 flex flex-col justify-between bg-cover bg-center bg-no-repeat" style={{
              borderColor: "rgba(255,255,255,0.08)",
              backgroundImage: `url(${localTimeImage})`,
              backgroundSize: "150%",
            }}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/5">
                  <Clock className="w-5 h-5" style={{ color: activeTheme.accent }} />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Local Time</h3>
              </div>

              <div className="text-center py-6">
                <div className="font-mono text-3xl font-bold tracking-widest text-white drop-shadow-[0_2px_10px_rgba(192,132,252,0.25)]">
                  {time || "22:54:36 PM"}
                </div>
                <p className="text-zinc-500 text-xs font-mono mt-2 flex items-center justify-center gap-1.5">
                  <MapPin className="w-3 h-3 text-red-500" />
                  Dhaka, Bangladesh (GMT +6)
                </p>
              </div>
            </div>

            <div className="text-zinc-400 text-xs border-t border-white/20 pt-3 leading-relaxed">
              No matter where you are situated in the world, I am always ready to coordinate and chat remotely.
            </div>
          </div>


          {/* Card 4: Beyond the Screen / Hobbies (Col span 1) */}
          <div className="p-6 rounded-3xl border glass-card bg-white/5 flex flex-col justify-between" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-white/5">
                  <Heart className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">Beyond Coding</h3>
              </div>

              <ul className="space-y-3.5 text-zinc-300 text-sm font-sans">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.accent }} />
                  <span>⚽ Playing football with friends</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.accent }} />
                  <span>🎨 Digital painting & abstract sketches</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.accent }} />
                  <span>☕ Connoisseur of local milk tea (Dud Cha)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.accent }} />
                  <span>🎒 Exploring rural paths of Bangladesh</span>
                </li>
              </ul>
            </div>

            <div className="text-[10px] font-mono text-zinc-500 mt-4 uppercase">
              #Empathy #Creativity #Consistency
            </div>
          </div>

          {/* Card 5: Fuel / Coffee Meter Interactive (Col span 1) */}
          <div className="p-6 rounded-3xl border glass-card bg-white/5 flex flex-col justify-between relative overflow-hidden" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5">
                    <Coffee className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">Tea & Coffee Fuel</h3>
                </div>
                <span className="text-[10px] font-mono text-amber-400">TODAY</span>
              </div>

              <div className="flex items-center justify-center gap-3 py-4 relative">
                {showParticle && (
                  <span className="absolute text-xl animate-float font-bold pointer-events-none text-amber-300">
                    ☕ +1 Cup!
                  </span>
                )}
                <div className="text-center">
                  <span className="text-5xl font-bold text-white tracking-tight">{cups}</span>
                  <span className="text-zinc-500 text-sm font-mono ml-1">cups</span>
                </div>
              </div>

              <p className="text-zinc-400 text-xs text-center leading-relaxed">
                Liquid electricity running directly into code productivity. Want to refuel me?
              </p>
            </div>

            <button
              onClick={handleAddCoffee}
              className="mt-4 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-all flex items-center justify-center gap-1.5 group"
            >
              <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
              <span>Refuel Cup</span>
            </button>
          </div>

          {/* Card 6: Interactive Terminal Console (Full width) */}
          <div className="lg:col-span-3 md:col-span-2 p-6 rounded-3xl border glass-card bg-zinc-950/40 relative overflow-hidden" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[100px] opacity-10" style={{ backgroundColor: activeTheme.accent }} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5">
                  <Terminal className="w-5 h-5" style={{ color: activeTheme.primary }} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    Interactive Console <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-400 border border-white/5 uppercase">v2.4 Live</span>
                  </h3>
                  <p className="text-zinc-500 text-xs font-mono">Click files to query system state</p>
                </div>
              </div>

              {/* Terminal Tab switcher controls */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "profile", label: "profile.md" },
                  { id: "stats", label: "stats.json" },
                  { id: "stack", label: "tech_stack.cfg" },
                  { id: "hire", label: "hire_me.sh" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCmd(item.id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono border transition-all duration-300 active:scale-95 flex items-center gap-1.5"
                    style={{
                      backgroundColor: selectedCmd === item.id ? `${activeTheme.primary}15` : "rgba(255,255,255,0.02)",
                      borderColor: selectedCmd === item.id ? activeTheme.primary : "rgba(255,255,255,0.08)",
                      color: selectedCmd === item.id ? "white" : "#a1a1aa"
                    }}
                  >
                    <ChevronRight className="w-3 h-3 opacity-60" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Window Box */}
            <div className="rounded-2xl border border-white/10 bg-black/60 overflow-hidden font-mono text-xs text-zinc-300">
              {/* Header bar of window */}
              <div className="flex items-center justify-between bg-zinc-900/80 px-4 py-2.5 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
                </div>
                <span className="text-zinc-500 text-[10px] select-none">salman@farzy-dev:~</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">bash</span>
              </div>

              {/* Console Body */}
              <div className="p-4 sm:p-5 min-h-[160px] whitespace-pre-wrap leading-relaxed select-text">
                <div className="flex items-center gap-2 text-zinc-500 mb-2">
                  <span>Last login: {new Date().toLocaleDateString()} on ttys001</span>
                </div>

                <div className="flex items-center gap-2 text-zinc-400 mb-3">
                  <span style={{ color: activeTheme.accent }}>$</span>
                  <span className="text-white font-semibold">
                    {selectedCmd === "profile" && "cat profile.md"}
                    {selectedCmd === "stats" && "curl -s https://api.salman.dev/stats"}
                    {selectedCmd === "hire" && "ssh hire_me@salman.dev"}
                    {selectedCmd === "stack" && "npm run list-tech-stack"}
                  </span>
                </div>

                {/* Simulated typed response */}
                <div className="text-zinc-300 pl-2 border-l-2 border-white/5">
                  {terminalOutput}
                  {isTyping && (
                    <span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
