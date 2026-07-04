/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Eye, Github, ExternalLink, X, Cpu, Star, ShieldAlert, Sparkles, Search, Filter, Compass, Heart, ArrowUpRight, MessageSquare, Send, Smile, ThumbsUp, Check, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS_DATA } from "../data";
import { Project, ThemePreset } from "../types";

interface ProjectFeedback {
  id: string;
  name: string;
  rating: number;
  tag: string;
  comment: string;
  date: string;
}

const PRESET_PROJECT_FEEDBACKS: Record<string, ProjectFeedback[]> = {
  zenspace: [
    { id: "z1", name: "Sarah Connor", rating: 5, tag: "Calming UI 🧘", comment: "The Web Audio engine is incredibly stable! Love the responsive ripple rhythm.", date: "Just now" },
    { id: "z2", name: "Nikola Tesla", rating: 5, tag: "Perfect Breathing Loop", comment: "Highly resonant cycles. Extremely precise frequency synchronization.", date: "1h ago" }
  ],
  novashop: [
    { id: "n1", name: "Marcus Aurelius", rating: 5, tag: "Very Sleek Glass ✨", comment: "The responsive checkout depth grids convey a true luxury workspace mood.", date: "Just now" },
    { id: "n2", name: "Coco Chanel", rating: 5, tag: "High Premium Feel", comment: "Impeccable font selections and gorgeous spacing contrast.", date: "2h ago" }
  ],
  taskflow: [
    { id: "t1", name: "Grace Hopper", rating: 5, tag: "Loved Bento Drag/Drop 🍱", comment: "Surgical state dispatching on drag. High performance grid re-renders!", date: "Just now" },
    { id: "t2", name: "John von Neumann", rating: 4, tag: "Cool D3 Gauges", comment: "Very clean mathematical visualization. Excellent responsive layouts.", date: "3h ago" }
  ]
};

const PROJECT_QUICK_TAGS: Record<string, string[]> = {
  zenspace: ["Calming UI 🧘", "Perfect Breathing Loop", "Stress Chart looks Great", "Need Spotify Sync"],
  novashop: ["Very Sleek Glass ✨", "Cool Keycap Previews", "Smooth Checkout Flow", "High Premium Feel"],
  taskflow: ["Loved Bento Drag/Drop 🍱", "Cool D3 Gauges", "Awesome Dark Theme", "Add Calendar view"]
};

interface ProjectsSectionProps {
  activeTheme: ThemePreset;
}

export default function ProjectsSection({ activeTheme }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [projectLikes, setProjectLikes] = useState<Record<string, number>>({
    zenspace: 48,
    novashop: 64,
    taskflow: 53
  });
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});

  // Mouse coordinate refs for premium spotlight tracking
  const [coords, setCoords] = useState<Record<string, { x: number; y: number }>>({});

  // Hover project feedback popup states
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [projFeedbackName, setProjFeedbackName] = useState("");
  const [projFeedbackComment, setProjFeedbackComment] = useState("");
  const [projFeedbackRating, setProjFeedbackRating] = useState(5);
  const [projFeedbackTag, setProjFeedbackTag] = useState("");
  const [projFeedbacks, setProjFeedbacks] = useState<Record<string, ProjectFeedback[]>>({});
  const [projStatus, setProjStatus] = useState<"idle" | "success" | "error">("idle");
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentImageIndex(0);
    setShowFeedbackPopup(false);
    setProjFeedbackName("");
    setProjFeedbackComment("");
    setProjFeedbackRating(5);
    setProjFeedbackTag("");
    setProjStatus("idle");
  }, [selectedProject?.id]);

  // Load existing project feedbacks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("salman_projects_reviews");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const combined: Record<string, ProjectFeedback[]> = {};
        Object.keys(PRESET_PROJECT_FEEDBACKS).forEach((key) => {
          const localList = parsed[key] || [];
          // Filter duplicates just in case
          const filteredLocal = localList.filter(
            (localItem: any) => !PRESET_PROJECT_FEEDBACKS[key].some((preset) => preset.name === localItem.name)
          );
          combined[key] = [...filteredLocal, ...PRESET_PROJECT_FEEDBACKS[key]];
        });
        setProjFeedbacks(combined);
      } catch (err) {
        setProjFeedbacks(PRESET_PROJECT_FEEDBACKS);
      }
    } else {
      setProjFeedbacks(PRESET_PROJECT_FEEDBACKS);
    }
  }, []);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setShowFeedbackPopup(true);
  };

  const handleMouseLeave = () => {
    // If user has entered some text, do not close on mouse leave to prevent losing user inputs
    if (projFeedbackName.trim() !== "" || projFeedbackComment.trim() !== "") {
      return;
    }

    // Check if the currently focused element is inside our feedback form container
    const activeEl = typeof document !== "undefined" ? document.activeElement : null;
    if (activeEl && activeEl.closest && activeEl.closest(".feedback-form-container")) {
      return;
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setShowFeedbackPopup(false);
    }, 350);
  };

  const handleProjFeedbackSubmit = (projectId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!projFeedbackName.trim()) {
      setProjStatus("error");
      setTimeout(() => setProjStatus("idle"), 3000);
      return;
    }

    const defaultTags = PROJECT_QUICK_TAGS[projectId] || ["High Quality"];
    const finalTag = projFeedbackTag || defaultTags[0];

    const newReview: ProjectFeedback = {
      id: `review-${Date.now()}`,
      name: projFeedbackName.trim(),
      rating: projFeedbackRating,
      tag: finalTag,
      comment: projFeedbackComment.trim() || "Excellent design and robust code blueprint!",
      date: "Just now"
    };

    // Save to local storage
    const saved = localStorage.getItem("salman_projects_reviews");
    let currentSaved: Record<string, ProjectFeedback[]> = {};
    if (saved) {
      try {
        currentSaved = JSON.parse(saved);
      } catch (err) {}
    }
    const currentProjSaved = currentSaved[projectId] || [];
    const updatedProjSaved = [newReview, ...currentProjSaved];
    const newAllSaved = {
      ...currentSaved,
      [projectId]: updatedProjSaved
    };
    localStorage.setItem("salman_projects_reviews", JSON.stringify(newAllSaved));

    // Update state
    setProjFeedbacks((prev) => ({
      ...prev,
      [projectId]: [newReview, ...(prev[projectId] || []).filter(f => f.date !== "Just now" || f.name !== newReview.name)]
    }));

    setProjStatus("success");
    setProjFeedbackName("");
    setProjFeedbackComment("");
    setProjFeedbackRating(5);
    setProjFeedbackTag("");

    setTimeout(() => {
      setProjStatus("idle");
    }, 3500);
  };

  const handleMouseMove = (projectId: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords((prev) => ({
      ...prev,
      [projectId]: { x, y }
    }));
  };

  const handleLike = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedProjects[projectId]) {
      setProjectLikes((prev) => ({ ...prev, [projectId]: prev[projectId] - 1 }));
      setLikedProjects((prev) => ({ ...prev, [projectId]: false }));
    } else {
      setProjectLikes((prev) => ({ ...prev, [projectId]: prev[projectId] + 1 }));
      setLikedProjects((prev) => ({ ...prev, [projectId]: true }));
    }
  };

  // Get all unique tech tags for filter pills
  const allTags = ["all", "React 19", "Tailwind CSS", "Motion", "Vite"];

  // Filter projects based on query and selected filter tag
  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === "all") return matchesSearch;
    const matchesFilter = project.techStack.some(t => t.toLowerCase() === activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <section id="projects" className={`py-24 relative overflow-hidden bg-zinc-950/20 ${selectedProject ? "z-[99999]" : "z-10"}`}>
      {/* Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ backgroundColor: activeTheme.primary }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="text-center md:text-left">
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white">
              Featured <span style={{ color: activeTheme.accent }}>Projects</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r mt-3 mx-auto md:mx-0 rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${activeTheme.primary}, ${activeTheme.accent})` }} />
            <p className="text-zinc-400 text-sm mt-4 max-w-xl">
              A deep-dive showcase of my top web engineering applications and visual UI systems. Crafted with robust system design and clean architectures.
            </p>
          </div>

          {/* Premium Search & Filter Bar */}
          <div className="w-full lg:max-w-md space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or stacks..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs font-mono"
                >
                  Clear
                </button>
              )}
            </div>
            
            {/* Tag Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className="px-3 py-1 rounded-lg text-[10px] font-mono border transition-all uppercase font-bold active:scale-95"
                  style={{
                    backgroundColor: activeFilter === tag ? `${activeTheme.primary}15` : "rgba(255, 255, 255, 0.02)",
                    borderColor: activeFilter === tag ? activeTheme.primary : "rgba(255, 255, 255, 0.06)",
                    color: activeFilter === tag ? "white" : "#a1a1aa"
                  }}
                >
                  {tag === "all" ? "SHOW ALL" : tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const currentCoord = coords[project.id] || { x: 0, y: 0 };
              const isLiked = likedProjects[project.id] || false;
              
              return (
                <div
                  key={project.id}
                  onMouseMove={(e) => handleMouseMove(project.id, e)}
                  className="flex flex-col h-full rounded-2xl border bg-zinc-950/40 overflow-hidden relative group transition-all duration-300 hover:translate-y-[-4px] select-none cursor-pointer"
                  style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Spotlight Hover Glow Overlay */}
                  <div
                    className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{
                      inset: "-1px",
                      background: `radial-gradient(400px circle at ${currentCoord.x}px ${currentCoord.y}px, ${activeTheme.primary}15, transparent 80%)`,
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      zIndex: 1
                    }}
                  />

                  {/* Project Image Panel */}
                  <div className="relative aspect-video overflow-hidden border-b border-white/5 z-0">
                    <img
                      src={project.image}
                      alt={project.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Visual Glassmorphic Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <div className="flex flex-col items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs shadow-xl active:scale-95 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Blueprint</span>
                        </button>
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Click card to learn more</span>
                      </div>
                    </div>

                    {/* Floating Corner Metrics */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-300">Production Ready</span>
                    </div>

                    {/* Like button on top corner */}
                    <button
                      onClick={(e) => handleLike(project.id, e)}
                      className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-zinc-400 hover:text-white transition-all active:scale-90"
                    >
                      <Heart 
                        className={`w-3.5 h-3.5 transition-colors ${isLiked ? "fill-rose-500 text-rose-500" : "text-zinc-400"}`} 
                      />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4 relative z-10">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-zinc-200 transition-colors">
                          {project.name}
                        </h3>
                        <span className="text-[10px] uppercase font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          {project.techStack[0]}
                        </span>
                      </div>
                      <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Tech Badges with hover accent */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md text-zinc-300 bg-white/5 border border-white/5 transition-all group-hover:border-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 text-zinc-500">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Heart Counter & Call-To-Action Footer Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center gap-1 text-zinc-500 font-mono text-[10px]">
                        <Heart className="w-3 h-3 text-rose-500/80 fill-rose-500/20" />
                        <span>{projectLikes[project.id]} Upvotes</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs font-mono font-semibold text-zinc-400 group-hover:text-white transition-colors">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ color: activeTheme.accent }} />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 rounded-3xl border border-white/5 bg-zinc-900/10 backdrop-blur-sm">
            <Compass className="w-10 h-10 mx-auto text-zinc-600 mb-3 animate-spin" style={{ animationDuration: "12s" }} />
            <h3 className="font-display text-lg font-bold text-white mb-1">No blueprints match your filter</h3>
            <p className="text-zinc-500 text-xs font-mono">Try searching with a different technology keyword</p>
          </div>
        )}

        {/* Dynamic Project Details Modal Overlay */}
        {selectedProject && (
          <div className="fixed inset-0 z-[99999] flex items-start sm:items-center justify-center p-4 pt-20 sm:p-6 bg-black/80 backdrop-blur-md">
            {/* Modal Closer Mask */}
            <div
              className="absolute inset-0"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Card */}
            <div
              className="relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-2xl max-h-[85vh] sm:max-h-[90vh] mt-2 sm:mt-0 z-10 flex flex-col"
              style={{
                backgroundColor: "rgba(13, 7, 24, 0.98)",
                borderColor: "rgba(255, 255, 255, 0.1)"
              }}
            >
              {/* Love React button next to close button */}
              <button
                onClick={(e) => handleLike(selectedProject.id, e)}
                className={`absolute top-4 right-16 z-20 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border transition-all cursor-pointer ${
                  likedProjects[selectedProject.id] 
                    ? "border-pink-500/50 text-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.3)] scale-105" 
                    : "border-white/10 text-zinc-400 hover:text-pink-400"
                }`}
                aria-label="Love this project"
              >
                <Heart className={`w-3.5 h-3.5 transition-transform active:scale-125 ${likedProjects[selectedProject.id] ? "fill-pink-500 text-pink-500" : ""}`} />
                <span className="text-[10px] font-mono font-bold leading-none">{projectLikes[selectedProject.id] || 0}</span>
              </button>

              {/* Header Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close details"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto project-modal-scrollbar select-text">
                {/* Image banner & Dynamic Slider */}
                {(() => {
                  const projectImages = selectedProject.images && selectedProject.images.length > 0 
                    ? selectedProject.images 
                    : [selectedProject.image];
                  
                  const prevSlide = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
                  };

                  const nextSlide = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
                  };

                  return (
                    <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 group/slider">
                      {/* Image Slides */}
                      <div className="absolute inset-0 w-full h-full bg-black">
                        {projectImages.map((imgSrc, idx) => (
                          <img
                            key={imgSrc + idx}
                            src={imgSrc}
                            alt={`${selectedProject.name} screenshot ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                              currentImageIndex === idx ? "opacity-100 z-0 scale-100" : "opacity-0 pointer-events-none scale-105"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Gradient Overlays */}
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
                      
                      {/* Left and Right Arrow Navigation Controls (Positioned separately side-by-side on the bottom right) */}
                      {projectImages.length > 1 && (
                        <div className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={prevSlide}
                            className="flex items-center justify-center p-2 rounded-full bg-black/60 hover:bg-black/85 border border-white/10 text-white/80 hover:text-white transition-all active:scale-90 select-none cursor-pointer backdrop-blur-md"
                            aria-label="Previous slide"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={nextSlide}
                            className="flex items-center justify-center p-2 rounded-full bg-black/60 hover:bg-black/85 border border-white/10 text-white/80 hover:text-white transition-all active:scale-90 select-none cursor-pointer backdrop-blur-md"
                            aria-label="Next slide"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* Indicators Bar: Small Minimalist Pill dots */}
                      {projectImages.length > 1 && (
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                          {projectImages.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(i);
                              }}
                              className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                                currentImageIndex === i ? "bg-purple-400 w-3.5" : "bg-white/40 hover:bg-white/60"
                              }`}
                              aria-label={`Go to slide ${i + 1}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Title badge overlay */}
                      <div className="absolute bottom-4 left-6 z-10 max-w-[calc(100%-110px)] sm:max-w-[calc(100%-140px)]">
                        <span className="text-[10px] font-mono uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/30 text-purple-300 mb-1 inline-block">
                          Project Detail • Slide {currentImageIndex + 1} of {projectImages.length}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow-md leading-tight">
                          {selectedProject.name}
                        </h3>
                      </div>
                    </div>
                  );
                })()}

                {/* Detail Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Technology Stack block */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-wider">
                      <Cpu className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
                      <span>Technology Stack Used</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono font-semibold px-3 py-1 rounded-lg text-white"
                          style={{
                            backgroundColor: `${activeTheme.primary}15`,
                            border: `1px solid ${activeTheme.primary}30`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Main Description */}
                  <div className="space-y-2">
                    <h4 className="font-display text-sm font-bold text-zinc-200">About the Project</h4>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Roadblocks & Challenges Faced */}
                  <div className="p-4.5 rounded-2xl border bg-red-500/5 border-red-500/10 space-y-2">
                    <div className="flex items-center gap-2 text-red-400 font-display text-xs font-bold uppercase tracking-wider">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Challenges Faced</span>
                    </div>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {selectedProject.challenges}
                    </p>
                  </div>

                  {/* Improvements & Future Plans */}
                  <div className="p-4.5 rounded-2xl border bg-purple-500/5 border-purple-500/10 space-y-2">
                    <div className="flex items-center gap-2 text-purple-400 font-display text-xs font-bold uppercase tracking-wider" style={{ color: activeTheme.primary }}>
                      <Sparkles className="w-4 h-4" />
                      <span>Future Plans & Improvements</span>
                    </div>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {selectedProject.improvements}
                    </p>
                  </div>

                </div>
              </div>

              {/* Fixed Bottom Action Bar */}
              <div className="p-2 sm:p-2.5 border-t border-white/10 bg-zinc-950/95 backdrop-blur-md relative z-30">
                <div className="flex flex-col sm:flex-row gap-1.5">
                  {/* Explore Live Site */}
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg font-bold text-black text-[11px] active:scale-95 transition-all cursor-pointer shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})`,
                      boxShadow: `0 3px 10px -4px ${activeTheme.primary}`
                    }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Explore Live Site</span>
                  </a>

                  {/* GitHub Client Repo */}
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[11px] active:scale-95 transition-all cursor-pointer"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub Client Repo</span>
                  </a>

                  {/* Interactive Project Feedback Trigger Button */}
                  <div 
                    className="flex-1 relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setShowFeedbackPopup(!showFeedbackPopup)}
                      className="w-full flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/15 border border-purple-500/20 text-purple-300 font-bold text-[11px] transition-all duration-300 relative overflow-hidden group active:scale-[0.99]"
                    >
                      <Sparkles className="w-3 h-3 text-purple-400 group-hover:animate-spin" />
                      <span className="font-sans">Rate & Feedback</span>
                      {showFeedbackPopup ? (
                        <X className="w-3 h-3 ml-0.5 text-zinc-400" />
                      ) : (
                        <Smile className="w-3 h-3 ml-0.5 text-purple-400" />
                      )}
                    </button>

                    {/* Floating Hover Project Feedback Popup Card */}
                    {showFeedbackPopup && (
                      <div 
                        className="feedback-form-container absolute bottom-full left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 mb-4 w-[280px] sm:w-[380px] p-5 rounded-2xl border shadow-2xl z-50 bg-zinc-950 border-white/10 backdrop-blur-xl animate-slide-up flex flex-col space-y-4 max-h-[350px] overflow-y-auto project-modal-scrollbar"
                        style={{
                          boxShadow: "0 20px 50px -10px rgba(0,0,0,0.9), 0 0 1px 2px rgba(255,255,255,0.05)"
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Interactive Stars Row */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                          <span className="text-[10px] sm:text-xs font-mono text-zinc-300 uppercase tracking-widest flex items-center gap-1.5">
                            <Smile className="w-3.5 h-3.5 text-purple-400" />
                            <span>Feedback on {selectedProject.name}</span>
                          </span>
                          
                          {/* Interactive Stars */}
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((starVal) => {
                              const isLit = (hoveredRating !== null ? hoveredRating : projFeedbackRating) >= starVal;
                              return (
                                <button
                                  key={starVal}
                                  type="button"
                                  onMouseEnter={() => setHoveredRating(starVal)}
                                  onMouseLeave={() => setHoveredRating(null)}
                                  onClick={() => setProjFeedbackRating(starVal)}
                                  className="p-0.5 transition-transform active:scale-75 cursor-pointer"
                                >
                                  <Star 
                                    className={`w-3.5 h-3.5 sm:w-4 h-4 transition-all duration-150 ${
                                      isLit ? "fill-yellow-400 text-yellow-400 scale-110 drop-shadow-[0_0_6px_rgba(250,204,21,0.4)]" : "text-zinc-600 hover:text-zinc-400"
                                    }`} 
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {projStatus === "success" ? (
                          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-sans text-center">
                            ✨ Review submitted! Your feedback has been listed in the project feed. 💖
                          </div>
                        ) : (
                          <form onSubmit={(e) => handleProjFeedbackSubmit(selectedProject.id, e)} className="space-y-3">
                            
                            {/* Project Relevant Quick Tags Select */}
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Select Quick Audit Tag:</span>
                              <div className="flex flex-wrap gap-1 max-h-[60px] overflow-y-auto">
                                {(PROJECT_QUICK_TAGS[selectedProject.id] || []).map((tag) => {
                                  const isSelected = projFeedbackTag === tag;
                                  return (
                                    <button
                                      key={tag}
                                      type="button"
                                      onClick={() => setProjFeedbackTag(tag)}
                                      className={`px-1.5 py-0.5 rounded text-[9px] font-sans transition-all border ${
                                        isSelected
                                          ? "bg-purple-500/20 text-purple-200 border-purple-500/50 font-semibold"
                                          : "bg-white/5 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10"
                                      }`}
                                    >
                                      {tag}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Inputs Row */}
                            <div className="space-y-2">
                              <input
                                type="text"
                                required
                                value={projFeedbackName}
                                onChange={(e) => setProjFeedbackName(e.target.value)}
                                placeholder="Your Name *"
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-purple-500/40 font-mono"
                              />
                              <input
                                type="text"
                                value={projFeedbackComment}
                                onChange={(e) => setProjFeedbackComment(e.target.value)}
                                placeholder="Short review (e.g. Flawless UI design!)"
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-purple-500/40 font-sans"
                              />
                            </div>

                            {projStatus === "error" && (
                              <div className="text-[9px] text-red-400 font-mono">
                                ⚠️ Please enter your Name before submitting.
                              </div>
                            )}

                            {/* Submit Action */}
                            <button
                              type="submit"
                              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-black transition-all active:scale-[0.98] cursor-pointer uppercase tracking-wider"
                              style={{
                                background: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})`
                              }}
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Publish Project Review</span>
                            </button>
                          </form>
                        )}

                        {/* Recent Reviews Specifically for this Project */}
                        <div className="border-t border-white/5 pt-2 space-y-1.5">
                          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Recent Project Audits</div>
                          <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1 select-none audit-feed-scrollbar">
                            {(projFeedbacks[selectedProject.id] || []).length === 0 ? (
                              <div className="text-[9px] text-zinc-600 font-sans py-1 text-center">
                                No public reviews for this project. Be the first to leave one!
                              </div>
                            ) : (
                              (projFeedbacks[selectedProject.id] || []).map((review) => (
                                <div key={review.id} className="p-2 rounded-lg bg-white/5 border border-white/5 text-[10px] text-zinc-300">
                                  <div className="flex justify-between items-center mb-0.5">
                                    <span className="font-bold text-[9px] text-zinc-200 font-mono leading-none">{review.name}</span>
                                    <div className="flex items-center gap-1">
                                      <span className="text-[8px] font-semibold text-purple-400 px-1 py-0.2 rounded bg-purple-500/15 border border-purple-500/10 scale-90">
                                        {review.tag}
                                      </span>
                                      <div className="flex text-yellow-400">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                          <Star key={i} className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <p className="italic text-zinc-400 text-[9px] leading-snug font-sans">
                                    "{review.comment}"
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}

