/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, MessageSquare, Send, CheckCircle2, User, AlertCircle, Copy, Check } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";
import { ThemePreset } from "../types";

interface ContactSectionProps {
  activeTheme: ThemePreset;
}

export default function ContactSection({ activeTheme }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submittedName, setSubmittedName] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(PORTFOLIO_OWNER.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("sending");
    setSubmittedName(formData.name);

    // Simulate sending network latency
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset after success visualization
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }, 1800);
  };

  const handleApplyTemplate = (type: "hire" | "consult" | "hello") => {
    if (type === "hire") {
      setFormData({
        name: formData.name || "Interviewer / Recruiter",
        email: formData.email,
        subject: "Web App Development Project Inquiry",
        message: "Hi Salman, I saw your immersive premium portfolio blueprints and would love to discuss a project with you. What is your current availability for a new build?"
      });
    } else if (type === "consult") {
      setFormData({
        name: formData.name,
        email: formData.email,
        subject: "UI/UX & Frontend Performance Consultation",
        message: "Hi Salman, I need some professional architectural consultation regarding high-performance glassmorphic styling, animation rendering on mobile devices, or code modularity."
      });
    } else {
      setFormData({
        name: formData.name,
        email: formData.email,
        subject: "Just wanted to say Hello!",
        message: "Hey Salman, absolutely gorgeous portfolio! The interactive spotlight tracking, real-time gauges, and dynamic theme switching are outstanding. Keep up the high-end craftsmanship!"
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-grid-pattern">
      {/* Decorative Orbs */}
      <div
        className="absolute top-1/2 left-10 w-72 h-72 rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none animate-float"
        style={{ backgroundColor: activeTheme.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center md:text-left mb-14">
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white">
            Get In <span style={{ color: activeTheme.accent }}>Touch</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r mt-3 mx-auto md:mx-0 rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${activeTheme.primary}, ${activeTheme.accent})` }} />
          <p className="text-zinc-400 text-sm mt-4 max-w-xl">
            Have a project idea, question, or just want to say hello? Drop a line below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details Cards (Col span 5) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct Email Card */}
            <div
              className="p-5 rounded-2xl border bg-white/5 glass-card animated-glass-border relative overflow-hidden"
              style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
            >
              <div className="flex items-center justify-between gap-4">
                <a
                  href={`mailto:${PORTFOLIO_OWNER.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" style={{ color: activeTheme.primary }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Email Me</div>
                    <div className="text-sm sm:text-base font-semibold text-white break-all group-hover:text-purple-300 transition-colors">{PORTFOLIO_OWNER.email}</div>
                  </div>
                </a>

                {/* Instant copy button */}
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all active:scale-95"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
              </div>

              {/* Copy confirmation toast overlay inside the card */}
              {copiedEmail && (
                <div className="absolute inset-x-0 bottom-0 bg-emerald-950/80 border-t border-emerald-500/20 py-1.5 px-4 flex items-center justify-between text-[10px] font-mono text-emerald-300 animate-slide-up">
                  <span>EMAIL COPIED TO CLIPBOARD!</span>
                  <span>READY TO PASTE</span>
                </div>
              )}
            </div>

            {/* Direct Phone Card */}
            <a
              href={`tel:${PORTFOLIO_OWNER.phone}`}
              className="block p-5 rounded-2xl border bg-white/5 glass-card animated-glass-border group relative overflow-hidden"
              style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" style={{ color: activeTheme.accent }} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Call Me Directly</div>
                  <div className="text-sm sm:text-base font-semibold text-white">{PORTFOLIO_OWNER.phone}</div>
                </div>
              </div>
            </a>

            {/* Direct WhatsApp Card */}
            <a
              href={PORTFOLIO_OWNER.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-2xl border bg-white/5 glass-card animated-glass-border group relative overflow-hidden"
              style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 group-hover:text-white transition-all">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Chat on WhatsApp</div>
                  <div className="text-sm sm:text-base font-semibold text-white">Open Live WhatsApp Chat</div>
                </div>
              </div>
            </a>

            {/* Availability Indicator */}
            <div className="p-5 rounded-2xl border bg-zinc-950/40 animate-pulse" style={{ borderColor: "rgba(255, 255, 255, 0.04)", animationDuration: "8s" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-zinc-300">Remote Work Availability</h4>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Open for remote roles, contract development, and custom UI design consultation globally. Let's arrange a call!
              </p>
            </div>

          </div>

          {/* Contact Interactive Form (Col span 7) */}
          <div className="lg:col-span-7">
            <div
              className="p-6 sm:p-8 rounded-3xl border bg-zinc-950/40 backdrop-blur-md relative overflow-hidden"
              style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-15" style={{ backgroundColor: activeTheme.primary }} />

              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-2">
                    <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{submittedName}</span>! Your message was delivered successfully. Salman will review it and reply as soon as possible.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* UX prefill templates header */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Need a Quick Prefill Template?</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate("hire")}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-zinc-500 transition-all uppercase font-semibold active:scale-95"
                      >
                        💼 Hire Salman
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate("consult")}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-zinc-500 transition-all uppercase font-semibold active:scale-95"
                      >
                        ⚡ Consultation
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyTemplate("hello")}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-zinc-500 transition-all uppercase font-semibold active:scale-95"
                      >
                        👋 Praise Portfolio
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    
                    {/* Name & Email inputs side-by-side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:bg-white/10 text-white text-sm outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Your Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:bg-white/10 text-white text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Project Partnership / Freelance Inquiry"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:bg-white/10 text-white text-sm outline-none transition-all"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your message here..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-400 focus:bg-white/10 text-white text-sm outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Form state response messages */}
                    {status === "error" && (
                      <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Please fill in all required fields (Name, Email, Message) correctly.</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-black text-xs sm:text-sm transition-all duration-300 active:scale-95 disabled:opacity-85 cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})`,
                        boxShadow: `0 4px 15px -4px ${activeTheme.primary}`
                      }}
                    >
                      {status === "sending" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                  </form>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

