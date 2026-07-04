/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Code2, Shield, Wind, Sparkles, BarChart, Server, Database, Flame, 
  Cpu, GitBranch, Figma, Box, Cloud, Settings, Award, Heart, 
  CheckCircle2, ThumbsUp, Check, HelpCircle, X, ChevronRight, UserCheck 
} from "lucide-react";
import { SKILLS_DATA } from "../data";
import { ThemePreset } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface SkillsGridProps {
  activeTheme: ThemePreset;
}

interface SkillDetail {
  topics: string[];
  question: string;
  answer: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

// Complete master dictionary mapping for each of the 20 technical skills
const SKILL_DETAILS_MAP: Record<string, SkillDetail> = {
  "React 19": {
    topics: ["Concurrent Rendering & Fibers", "Server Components Architecture", "Suspense Boundaries & Hydration", "useActionState & useOptimistic", "use() Hook API for Promises"],
    question: "How do Server Components and Client Components share data in React 19?",
    answer: "Server Components execute solely on the server, generating static JSX or serialized props passed down to client-side components. For dynamic mutations, Client Components trigger Server Actions (async RPC functions) which return fresh data and trigger re-renders seamlessly without writing REST endpoints.",
    difficulty: "Expert"
  },
  "Next.js": {
    topics: ["App Router Directory layout", "Server Actions (RPC mechanics)", "Route Handlers & Edge Runtime", "Incremental Static Regeneration", "Middleware Guarding & Routing"],
    question: "What is the difference between Server Actions and API Route Handlers in Next.js?",
    answer: "Server Actions are direct, type-safe RPC endpoints defined inside actions.ts or marked with 'use server', removing fetch/Axios boilerplate. Route Handlers are traditional REST endpoints (e.g. at route.ts) that return standard JSON, ideal for external integrations.",
    difficulty: "Expert"
  },
  "TypeScript": {
    topics: ["Advanced Generics & Constraints", "Discriminated Union Types", "Mapped & Conditional Types", "Strict Compilation Configurations", "Custom Type Guards & Assertions"],
    question: "What are Discriminated Unions and why are they extremely useful in state management?",
    answer: "A discriminated union combines multiple distinct interfaces sharing a single literal tag property (e.g., status: 'loading' | 'success' | 'error'). TypeScript's compiler reads this literal inside conditional statements to narrow down type definitions safely, guaranteeing complete runtime correctness.",
    difficulty: "Advanced"
  },
  "Tailwind CSS": {
    topics: ["Configuring Custom Theme Extensions", "Arbitrary Variants & Modifiers", "Responsive Flexbox & Grid layouts", "Custom Animations & Keyframes", "Container Queries & Dark Mode hooks"],
    question: "How does Tailwind CSS purge and optimize production bundles?",
    answer: "Tailwind doesn't ship a monolithic stylesheet. Instead, it utilizes a static scanner that reads your HTML, JSX, and TSX files for active class names during build time. It then compiles a single, ultra-minified CSS stylesheet containing only the classes actively referenced.",
    difficulty: "Advanced"
  },
  "Framer Motion": {
    topics: ["Spring-physics Animation Curves", "Gesture-based event handlers", "AnimatePresence exit transitions", "Layout orchestration & staggers", "Cinematic scroll-linked progress"],
    question: "How does AnimatePresence orchestrate exit transitions for unmounting components?",
    answer: "AnimatePresence intercepts React's default unmounting lifecycle. It retains the targeted component in the DOM temporarily, triggers the animation specified in the exit prop, and safely unmounts the actual DOM node only after the animation completes.",
    difficulty: "Advanced"
  },
  "D3.js": {
    topics: ["Data Binding (Enter-Update-Exit)", "Coordinate Projection Scales", "Custom SVG Path generators", "Force-directed physics layouts", "Zoom, Pan & Click interactive hooks"],
    question: "What is the fundamental philosophy of D3.js's data-to-DOM bindings?",
    answer: "D3.js maps datasets directly to SVG/HTML attributes using mathematical projections (scales). Instead of rendering elements manually, you write declarative joins (d3.select) that bind elements to arrays, scaling dimensions, colors, and coordinates fluidly.",
    difficulty: "Expert"
  },
  "Recharts": {
    topics: ["Composite business graph layers", "ResponsiveContainer scaling grids", "Interactive Custom SVG Tooltips", "Area, Line & Bar combinations", "Legend & Grid styling extensions"],
    question: "How do you handle chart responsiveness without causing layout reflow issues?",
    answer: "Recharts provides a ResponsiveContainer helper that leverages a ResizeObserver to track parent DOM bounds dynamically. By storing width/height dynamically in a state or ref rather than static pixel properties, the chart recalculates coordinates cleanly on resize.",
    difficulty: "Intermediate"
  },
  "Node.js": {
    topics: ["Asynchronous Event Loop internals", "Buffer streams & Pipe mechanisms", "Cluster module CPU clustering", "Child Processes & Worker threads", "EventEmitters & Promises systems"],
    question: "How does Node.js handle concurrent connections efficiently despite being single-threaded?",
    answer: "Node.js relies on an event-driven, non-blocking I/O model. High-latency operations (like database queries or file reads) are delegated to the underlying OS kernel or Node's thread pool (libuv). When done, a callback is queued, allowing the single main thread to service incoming requests continuously.",
    difficulty: "Advanced"
  },
  "Express": {
    topics: ["Route routing modularity", "Global error interceptor handlers", "Session Token auth middlewares", "Rate limiting IP policies", "CORS policy configurations"],
    question: "Why is the registration order of Express middlewares critical?",
    answer: "Express processes requests sequentially through a linked pipeline of functions. If a route handler is registered before a global auth middleware, that route will be exposed without authentication. Error handlers must be registered dead last to intercept thrown exceptions.",
    difficulty: "Intermediate"
  },
  "PostgreSQL": {
    topics: ["Database index optimizations", "Relational constraints & cascades", "ACID compliance transactional trees", "Common Table Expressions (CTEs)", "High-speed JSONB unstructured queries"],
    question: "When is it appropriate to use JSONB columns instead of fully structured relational tables?",
    answer: "JSONB is perfect for semi-structured, highly dynamic attributes like user configurations, system settings, or rapid external metadata logs where schema requirements evolve. However, structured columns with foreign keys must be used for core relational integrity to leverage indices.",
    difficulty: "Advanced"
  },
  "Prisma (ORM)": {
    topics: ["Schema definitions & relations", "Type-safe DB Client generators", "Automated DB migration sequences", "Database seeding scripts", "Relational query optimizations"],
    question: "How does Prisma solve the N+1 query problem commonly faced in ORMs?",
    answer: "Prisma mitigates N+1 issues by batching multiple queries under the hood and offering type-safe relational retrieval APIs via 'include' and 'select' parameters. This enables clean nested joins instead of multiple sequential queries.",
    difficulty: "Advanced"
  },
  "Cloud Firestore": {
    topics: ["Document-collection structures", "Real-time query snapshot streams", "Offline document cache pools", "Custom single/composite index rules", "Firestore Security Rules design"],
    question: "How do Firestore security rules protect collection reads at the database level?",
    answer: "Firestore security rules validate incoming read and write requests server-side. For instance, 'allow read: if request.auth != null && resource.data.ownerId == request.auth.uid' checks user authorization and filters out malicious attempts to fetch others' data.",
    difficulty: "Intermediate"
  },
  "Firebase Auth": {
    topics: ["OAuth third-party credentials", "JSON Web Token (JWT) handshakes", "Session persistence strategies", "Custom user roles & security claims", "Multi-factor authentication locks"],
    question: "What are Custom Claims in Firebase Auth and when should you use them?",
    answer: "Custom Claims are key-value objects injected into a user's signed JWT token (e.g., { role: 'admin' }). This metadata can be read securely by Firestore security rules and backend API endpoints, facilitating high-speed, secure RBAC routing.",
    difficulty: "Advanced"
  },
  "RESTful APIs": {
    topics: ["HTTP status code conventions", "Standardized JSON payload models", "Rate-limiting gateway rules", "CORS headers & Origin validation", "Swagger / OpenAPI documentation"],
    question: "What defines an idempotent HTTP request method in RESTful APIs?",
    answer: "An idempotent operation produces the exact same resource state regardless of how many times it is repeated. GET, PUT, and DELETE are idempotent (calling DELETE on resource 5 twice results in it being gone), whereas POST is not (it creates new resources every call).",
    difficulty: "Intermediate"
  },
  "Git": {
    topics: ["Branch rebasing vs merging", "Git Stash storage trees", "Reflog checkout recovery", "Pre-commit hook automated checks", "Cherry-pick specific commit blocks"],
    question: "What is the critical difference between 'git merge' and 'git rebase'?",
    answer: "git merge preserves the exact chronological history of all commits, generating an explicit merge commit to stitch branches together. git rebase rewrites the commit history, applying your commits on top of the target branch's head to maintain a clean linear timeline.",
    difficulty: "Intermediate"
  },
  "GitHub Actions": {
    topics: ["Virtual runner environments", "Dependency step caching mechanisms", "Secret environmental keys vault", "Matrix pipelines testing layout", "Artifact storage & container release"],
    question: "How do matrix strategies optimize continuous integration pipelines?",
    answer: "Matrix configurations allow a single job definition to run in parallel configurations across different operating systems (Linux, macOS) and node versions. This dramatically decreases execution times and guarantees cross-platform coverage.",
    difficulty: "Advanced"
  },
  "Figma": {
    topics: ["Dynamic Auto-Layout systems", "Component properties & variants", "Typography scale styles", "Interactive visual prototypes", "Design tokens for developers"],
    question: "What is Auto-Layout in Figma and how does it map to code?",
    answer: "Auto-Layout is a feature that allows frames to grow or shrink dynamically as their contents change. It maps directly to CSS Flexbox, configuring direction, gaps, padding, and alignment properties in a high-fidelity visual UI.",
    difficulty: "Intermediate"
  },
  "Docker": {
    topics: ["Multi-stage build Dockerfiles", "Volume mounting configurations", "Port redirection setups", "Layer caching build speedups", "Docker Compose multi-container grids"],
    question: "Why are Multi-stage builds recommended for building production Docker images?",
    answer: "Multi-stage builds utilize temporary heavy images to compile source code (e.g. running build tools). Then, only the final compiled assets are copied into a clean, lightweight runner image. This drastically minimizes the final image size and closes security holes.",
    difficulty: "Advanced"
  },
  "Vercel": {
    topics: ["Edge Network serverless functions", "Dynamic CDN content caching", "Git branch preview sandboxes", "Domain routing configuration files", "Automated Image optimizations"],
    question: "What is the main benefit of Vercel's preview deployment pipeline?",
    answer: "Vercel integrates directly with Git providers, spawning a unique, isolated production-ready sandbox deployment for every commit pushed to a feature branch. This makes collaborative testing and QA reviews incredibly easy.",
    difficulty: "Intermediate"
  },
  "Cloud Run": {
    topics: ["Container-based serverless runtimes", "Autoscaling triggers (including zero)", "VPC VPC-connector routes", "Secret Manager secret mounting", "Traffic splitting & canary releases"],
    question: "How does Cloud Run achieve scaling to zero and why is it cost-effective?",
    answer: "Cloud Run monitors incoming HTTP requests. When traffic completely halts for a specified grace period, it terminates all container instances. This eliminates server operating costs entirely, ensuring you only pay for CPU cycles while processing active requests.",
    difficulty: "Advanced"
  }
};

// Icon helper to map strings from data to Lucide Components
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Code2": return Code2;
    case "Shield": return Shield;
    case "Wind": return Wind;
    case "Sparkles": return Sparkles;
    case "BarChart": return BarChart;
    case "Server": return Server;
    case "Database": return Database;
    case "Flame": return Flame;
    case "Cpu": return Cpu;
    case "GitBranch": return GitBranch;
    case "Figma": return Figma;
    case "Box": return Box;
    case "Cloud": return Cloud;
    default: return Settings;
  }
};

export default function SkillsGrid({ activeTheme }: SkillsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);
  const [mobileSkillName, setMobileSkillName] = useState<string>("React 19");
  
  // State to track dynamic left alignment and the hover target's width to prevent viewport clipping
  const [popoverOffset, setPopoverOffset] = useState<number>(0);
  const [cardWidth, setCardWidth] = useState<number>(0);

  // Keep track of timeouts to prevent popovers from flickering when moving mouse from tile to popover
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Recruiter interaction states
  const [endorsements, setEndorsements] = useState<Record<string, number>>({});
  const [userEndorsed, setUserEndorsed] = useState<Record<string, boolean>>({});
  const [satisfiedSkills, setSatisfiedSkills] = useState<Record<string, boolean>>({});
  const [revealedQuiz, setRevealedQuiz] = useState<Record<string, boolean>>({});
  const [toggledTopics, setToggledTopics] = useState<Record<string, Record<string, boolean>>>({});

  // Load endorsements and interactions on mount
  useEffect(() => {
    // Endorsements
    const storedEndorsements = localStorage.getItem("salman_portfolio_skill_endorsements");
    if (storedEndorsements) {
      setEndorsements(JSON.parse(storedEndorsements));
    } else {
      // Seed initial base endorsements (realistic numbers)
      const initial: Record<string, number> = {};
      Object.keys(SKILL_DETAILS_MAP).forEach((name, i) => {
        initial[name] = 15 + (i * 4 % 9) + (name.length % 6);
      });
      setEndorsements(initial);
    }

    // User endorsed
    const storedUserEndorsed = localStorage.getItem("salman_portfolio_user_endorsed");
    if (storedUserEndorsed) {
      setUserEndorsed(JSON.parse(storedUserEndorsed));
    }

    // Satisfied challenges
    const storedSatisfied = localStorage.getItem("salman_portfolio_satisfied_challenges");
    if (storedSatisfied) {
      setSatisfiedSkills(JSON.parse(storedSatisfied));
    }

    // Toggled topics
    const storedTopics = localStorage.getItem("salman_portfolio_toggled_topics");
    if (storedTopics) {
      setToggledTopics(JSON.parse(storedTopics));
    }
  }, []);

  const handleEndorse = (skillName: string) => {
    const alreadyEndorsed = userEndorsed[skillName];
    const updatedUserEndorsed = { ...userEndorsed, [skillName]: !alreadyEndorsed };
    setUserEndorsed(updatedUserEndorsed);
    localStorage.setItem("salman_portfolio_user_endorsed", JSON.stringify(updatedUserEndorsed));

    const updatedEndorsements = {
      ...endorsements,
      [skillName]: (endorsements[skillName] || 0) + (alreadyEndorsed ? -1 : 1)
    };
    setEndorsements(updatedEndorsements);
    localStorage.setItem("salman_portfolio_skill_endorsements", JSON.stringify(updatedEndorsements));
  };

  const handleToggleTopic = (skillName: string, topic: string) => {
    const skillTopics = toggledTopics[skillName] || {};
    const updatedTopics = {
      ...toggledTopics,
      [skillName]: {
        ...skillTopics,
        [topic]: !skillTopics[topic]
      }
    };
    setToggledTopics(updatedTopics);
    localStorage.setItem("salman_portfolio_toggled_topics", JSON.stringify(updatedTopics));
  };

  const handleToggleSatisfied = (skillName: string) => {
    const current = satisfiedSkills[skillName];
    const updated = { ...satisfiedSkills, [skillName]: !current };
    setSatisfiedSkills(updated);
    localStorage.setItem("salman_portfolio_satisfied_challenges", JSON.stringify(updated));
  };

  const handleMouseEnterSkill = (skillName: string, event: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return; // Prevent hover activation on mobile and tablet devices

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredSkill(skillName);

    // Calculate alignment relative to the viewport bounds
    const rect = event.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    // Constant width of our popover on desktop (320px)
    const popoverWidth = 320; 
    
    // Default: centered under the skill card
    let leftOffset = -popoverWidth / 2 + rect.width / 2;
    
    // Clamp to at least 16px from the left edge
    const popoverLeftOnScreen = rect.left + leftOffset;
    if (popoverLeftOnScreen < 16) {
      leftOffset = 16 - rect.left;
    } else {
      // Clamp to at least 16px from the right edge
      const popoverRightOnScreen = rect.left + leftOffset + popoverWidth;
      if (popoverRightOnScreen > viewportWidth - 16) {
        leftOffset = (viewportWidth - 16) - rect.left - popoverWidth;
      }
    }

    setPopoverOffset(leftOffset);
    setCardWidth(rect.width);
  };

  const handleMouseLeaveSkill = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSkill(null);
    }, 200); // 200ms grace period to allow transition to the popover itself
  };

  const handleMouseEnterPopover = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleSkillClick = (skillName: string) => {
    if (window.innerWidth < 1024) {
      setMobileSkillName(skillName);
      setIsMobileModalOpen(true);
    }
  };

  const categories = ["All", ...SKILLS_DATA.map((cat) => cat.category)];

  const filteredSkills = selectedCategory === "All"
    ? SKILLS_DATA
    : SKILLS_DATA.filter((cat) => cat.category === selectedCategory);

  // Reusable sub-topic mastery list with checkbox
  const renderTopicList = (skillName: string, topics: string[]) => {
    const skillTopics = toggledTopics[skillName] || {};
    return (
      <div className="space-y-2.5">
        <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
          Core Concepts & Topics
        </h4>
        <div className="grid gap-1.5">
          {topics.map((topic) => {
            const isChecked = !!skillTopics[topic];
            return (
              <button
                key={topic}
                onClick={() => handleToggleTopic(skillName, topic)}
                className="flex items-center gap-2.5 p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-left text-[11px] transition-all duration-300 hover:bg-white/[0.06] group/topic cursor-pointer"
              >
                <div 
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${
                    isChecked 
                      ? "bg-purple-500 border-purple-500 text-white" 
                      : "border-white/20 text-transparent group-hover/topic:border-purple-400"
                  }`}
                  style={{
                    backgroundColor: isChecked ? activeTheme.primary : undefined,
                    borderColor: isChecked ? activeTheme.primary : undefined
                  }}
                >
                  <Check className="w-2.5 h-2.5" strokeWidth={3} />
                </div>
                <span className={`font-sans leading-snug transition-colors duration-300 ${isChecked ? "text-zinc-200" : "text-zinc-400 group-hover/topic:text-zinc-200"}`}>
                  {topic}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Reusable Mastery inspector console JSX (styled as compact hovering card / modal)
  const renderInspectorConsole = (skillName: string, isModal: boolean = false) => {
    const isEndorsed = !!userEndorsed[skillName];
    const isQuizRevealed = !!revealedQuiz[skillName];
    const isSatisfied = !!satisfiedSkills[skillName];
    const currentEndorseCount = endorsements[skillName] || 0;

    const details = SKILL_DETAILS_MAP[skillName] || {
      topics: ["General Concepts", "Optimizations", "Framework patterns", "Modern tooling"],
      question: "What is your main strategy with this tool?",
      answer: "Leveraging its optimal capabilities, strict configuration paradigms, and production-grade design methodologies to craft modular, high-performing code.",
      difficulty: "Advanced"
    };

    // Find meta
    let skillMeta: { name: string; level: number; iconName: string; tooltip?: string } = { name: skillName, level: 90, iconName: "Code2", tooltip: "" };
    SKILLS_DATA.forEach((categoryGroup) => {
      const found = categoryGroup.skills.find(s => s.name === skillName);
      if (found) {
        skillMeta = found;
      }
    });

    const ActiveSkillIcon = getIcon(skillMeta.iconName);

    return (
      <div className="space-y-4 text-left">
        
        {/* Header Info */}
        <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 flex-shrink-0">
              <ActiveSkillIcon className="w-5 h-5" style={{ color: activeTheme.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-display font-bold text-sm text-white tracking-tight">{skillName}</h3>
                <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                  {details.difficulty}
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 mt-0.5">Proficiency: {skillMeta.level}%</p>
            </div>
          </div>

          {isModal && (
            <button 
              onClick={() => setIsMobileModalOpen(false)}
              className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dynamic description info */}
        {skillMeta.tooltip && (
          <p className="text-[11px] text-zinc-300 leading-relaxed bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-lg italic">
            "{skillMeta.tooltip}"
          </p>
        )}

        {/* Sub-topics Checklist */}
        {renderTopicList(skillName, details.topics)}

        {/* Recruiter Challenge */}
        <div className="p-3 rounded-xl border bg-zinc-950/50 relative overflow-hidden" style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}>
          <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-purple-300 mb-1.5" style={{ color: activeTheme.accent }}>
            <span className="w-1 h-2.5 rounded-full" style={{ backgroundColor: activeTheme.accent }} />
            Recruiter Tech Challenge
          </div>

          <h5 className="font-sans font-medium text-[11px] text-zinc-200 mb-2 leading-snug">
            {details.question}
          </h5>

          <AnimatePresence mode="wait">
            {!isQuizRevealed ? (
              <button
                onClick={() => setRevealedQuiz({ ...revealedQuiz, [skillName]: true })}
                className="w-full py-1.5 px-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white font-mono text-[10px] font-semibold flex items-center justify-center gap-1 transition-all group/verify cursor-pointer"
              >
                Reveal Explanation
                <ChevronRight className="w-3 h-3 group-hover/verify:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <motion.div
                key="reveal-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2.5"
              >
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-white/5 font-mono text-[10px] leading-normal text-zinc-300 select-all whitespace-pre-line max-h-36 overflow-y-auto">
                  {details.answer}
                </div>

                {/* Answer Feedback Option */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <span className="text-[9px] text-zinc-500 font-mono">Satisfied with the depth?</span>
                  <button
                    onClick={() => handleToggleSatisfied(skillName)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono transition-all border cursor-pointer ${
                      isSatisfied 
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white"
                    }`}
                  >
                    <ThumbsUp className={`w-2.5 h-2.5 ${isSatisfied ? "fill-emerald-400" : ""}`} />
                    {isSatisfied ? "Verified & Satisfied" : "Looks solid!"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recruiter live endorsement action */}
        <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
          <div className="flex-1">
            <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider">Endorse Salman</span>
            <div className="flex items-center gap-1 mt-0.5">
              <UserCheck className="w-3 h-3 text-zinc-400" />
              <span className="text-[10px] font-bold text-zinc-200">
                {currentEndorseCount} endorsements
              </span>
            </div>
          </div>

          <button
            onClick={() => handleEndorse(skillName)}
            className={`px-3 py-2 rounded-lg text-[10px] font-semibold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              isEndorsed 
                ? "bg-purple-600 border-purple-500 text-white shadow-lg" 
                : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-zinc-300 hover:text-white"
            }`}
            style={{
              backgroundColor: isEndorsed ? activeTheme.primary : undefined,
              borderColor: isEndorsed ? activeTheme.accent : undefined,
              boxShadow: isEndorsed ? `0 0 10px ${activeTheme.primary}33` : undefined
            }}
          >
            <Heart className={`w-3 h-3 transition-all ${isEndorsed ? "fill-white text-white scale-110" : "text-zinc-400 group-hover:text-white"}`} />
            {isEndorsed ? "Endorsed!" : "Endorse"}
          </button>
        </div>
        
      </div>
    );
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-zinc-950/20">
      {/* Dynamic light visual */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[160px] opacity-10 pointer-events-none"
        style={{ backgroundColor: activeTheme.primary }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white">
            My <span style={{ color: activeTheme.accent }}>Skills</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r mt-3 mx-auto md:mx-0 rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${activeTheme.primary}, ${activeTheme.accent})` }} />
          <p className="text-zinc-400 text-sm mt-4 max-w-xl">
            A graphic layout of my technical tools, capabilities, and software mastery. Hover cards on desktop to interact with core concepts, challenges, and live endorsements.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-full text-[11px] font-mono border transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "text-black font-semibold border-transparent"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              style={{
                background: selectedCategory === cat
                  ? `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})`
                  : undefined,
                boxShadow: selectedCategory === cat
                  ? `0 4px 15px -4px ${activeTheme.primary}`
                  : undefined
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Unified Full Width Skills Grid Layout */}
        <div className="space-y-10">
          {filteredSkills.map((catGroup) => (
            <div key={catGroup.category} className="space-y-4">
              
              {/* Category Subheading */}
              {selectedCategory === "All" && (
                <div className="flex items-center gap-2 px-1">
                  <span className="w-1 h-3 rounded-full" style={{ backgroundColor: activeTheme.accent }} />
                  <h3 className="font-display text-[11px] uppercase tracking-widest font-bold text-zinc-400">
                    {catGroup.category}
                  </h3>
                </div>
              )}

              {/* Skills Grid containing modular items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {catGroup.skills.map((skill) => {
                  const IconComponent = getIcon(skill.iconName);
                  const isSkillHovered = hoveredSkill === skill.name;
                  const hasUserEndorsed = !!userEndorsed[skill.name];

                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={(e) => handleMouseEnterSkill(skill.name, e)}
                      onMouseLeave={handleMouseLeaveSkill}
                      onClick={() => handleSkillClick(skill.name)}
                      className="p-3.5 rounded-xl border glass-card bg-zinc-950/40 relative group overflow-visible transition-all duration-300 cursor-pointer select-none"
                      style={{ 
                        borderColor: isSkillHovered ? activeTheme.accent : "rgba(255, 255, 255, 0.08)",
                        boxShadow: isSkillHovered 
                          ? `0 0 15px ${activeTheme.primary}33` 
                          : "none"
                      }}
                    >
                      {/* Heart icon if recruiter endorsed */}
                      {hasUserEndorsed && (
                        <div className="absolute top-2.5 right-2.5 text-rose-500 z-20">
                          <Heart className="w-3 h-3 fill-rose-500 animate-pulse" />
                        </div>
                      )}

                      {/* Subtle hover background accent lighting */}
                      <div
                        className="absolute -top-12 -right-12 w-20 h-20 rounded-full blur-[30px] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                        style={{ backgroundColor: activeTheme.accent }}
                      />

                      <div className="flex items-center justify-between gap-2.5 mb-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 group-hover:text-white group-hover:border-white/20 transition-all duration-300 flex-shrink-0">
                            <IconComponent className="w-3.5 h-3.5" style={{ color: activeTheme.accent }} />
                          </div>
                          <span className="font-sans font-semibold text-[11px] text-zinc-200 group-hover:text-white transition-colors truncate" title={skill.name}>
                            {skill.name}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] text-zinc-400 group-hover:text-white transition-colors flex-shrink-0">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Animated visual progress track */}
                      <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out origin-left"
                          style={{
                            width: `${skill.level}%`,
                            backgroundImage: `linear-gradient(to right, ${activeTheme.primary}, ${activeTheme.accent})`,
                          }}
                        />
                      </div>

                      {/* HOVER INTERACTIVE POPOVER CARD FOR DESKTOP */}
                      <AnimatePresence>
                        {isSkillHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 10 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={handleMouseEnterPopover}
                            onMouseLeave={handleMouseLeaveSkill}
                            className="absolute bottom-[115%] z-[150] w-[320px] p-4.5 rounded-2xl border backdrop-blur-xl pointer-events-auto hidden lg:block"
                            style={{
                              left: `${popoverOffset}px`,
                              backgroundColor: "rgba(10, 5, 20, 0.96)",
                              borderColor: activeTheme.accent,
                              boxShadow: `0 15px 40px -10px rgba(0,0,0,0.9), 0 0 25px -3px ${activeTheme.primary}44`
                            }}
                          >
                            {/* Animated top background light */}
                            <div 
                              className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[30px] opacity-10 pointer-events-none"
                              style={{ backgroundColor: activeTheme.primary }}
                            />

                            {/* Pointer Arrow */}
                            <div 
                              className="absolute bottom-[-6px] -translate-x-1/2 w-3 h-3 rotate-45 border-b border-r"
                              style={{ 
                                left: `${(cardWidth / 2) - popoverOffset}px`,
                                backgroundColor: "rgba(10, 5, 20, 0.96)",
                                borderColor: activeTheme.accent
                              }}
                            />

                            {/* Render Popover Content */}
                            <div className="max-h-[280px] overflow-y-auto pr-1.5 audit-feed-scrollbar">
                              {renderInspectorConsole(skill.name, false)}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Skills Certification Badge Footer */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl border bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <Award className="w-6 h-6" style={{ color: activeTheme.accent }} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">Full Stack Engineering Proficiency</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Constantly refining development workflows, optimizing cloud pipelines, and hardening backend database structures.</p>
            </div>
          </div>
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-white/5 border border-white/5 px-3 py-1 rounded-full flex-shrink-0">
            Ready to deploy
          </span>
        </div>

      </div>

      {/* MOBILE MODAL OVERLAY SHEET */}
      <AnimatePresence>
        {isMobileModalOpen && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 lg:hidden">
            {/* Backdrop filter overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-2xl border bg-zinc-950 p-5 shadow-2xl space-y-4 audit-feed-scrollbar"
              style={{ borderColor: "rgba(255, 255, 255, 0.12)" }}
            >
              {renderInspectorConsole(mobileSkillName, true)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
