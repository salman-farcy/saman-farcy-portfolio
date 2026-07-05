/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { EDUCATION_DATA, EXPERIENCE_DATA } from "../data";
import { ThemePreset } from "../types";

interface ExperienceEducationProps {
  activeTheme: ThemePreset;
}

export default function ExperienceEducation({ activeTheme }: ExperienceEducationProps) {
  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      {/* Background radial gradient blur */}
      <div
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full mix-blend-screen filter blur-[140px] opacity-10 pointer-events-none"
        style={{ backgroundColor: activeTheme.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center md:text-left mb-14">
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white">
            My <span style={{ color: activeTheme.accent }}>Journey</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r mt-3 mx-auto md:mx-0 rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${activeTheme.primary}, ${activeTheme.accent})` }} />
          <p className="text-zinc-400 text-sm mt-4 max-w-xl">
            My career trajectory and educational qualifications, tracking growth and milestones.
          </p>
        </div>

        {/* Journey Timeline Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Professional Experience Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-white/5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10" style={{ color: activeTheme.primary }}>
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Experience</h3>
            </div>

            <div className="relative border-l-2 pl-6 ml-4 space-y-10" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing Node Dot on Timeline */}
                  <span
                    className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-zinc-950 transition-all duration-300 group-hover:scale-125"
                    style={{
                      backgroundColor: activeTheme.accent,
                      boxShadow: `0 0 10px ${activeTheme.accent}`
                    }}
                  />

                  {/* Experience Card */}
                  <div
                    className="p-5 rounded-2xl border bg-white/5 glass-card animated-glass-border"
                    style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                      <div>
                        <h4 className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                          {exp.role}
                        </h4>
                        <p className="text-xs text-zinc-400 font-medium font-sans mt-0.5">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-zinc-500">
                          <MapPin className="w-2.5 h-2.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed list-none pl-0">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" style={{ color: activeTheme.primary }} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-white/5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10" style={{ color: activeTheme.accent }}>
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Education</h3>
            </div>

            <div className="relative border-l-2 pl-6 ml-4 space-y-10" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing Node Dot on Timeline */}
                  <span
                    className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-zinc-950 transition-all duration-300 group-hover:scale-125"
                    style={{
                      backgroundColor: activeTheme.primary,
                      boxShadow: `0 0 10px ${activeTheme.primary}`
                    }}
                  />

                  {/* Education Card */}
                  <div
                    className="p-5 rounded-2xl border bg-white/5 glass-card animated-glass-border"
                    style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3.5">
                      <div>
                        <h4 className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors leading-snug">
                          {edu.degree}
                        </h4>
                        <p className="text-xs text-zinc-400 font-medium font-sans mt-0.5">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          <Calendar className="w-3 h-3" />
                          {edu.period}
                        </span>
                        {edu.result && (
                          <span
                            className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: `${activeTheme.primary}15`,
                              color: activeTheme.primary
                            }}
                          >
                            {edu.result}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans pt-1">
                      {edu.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
