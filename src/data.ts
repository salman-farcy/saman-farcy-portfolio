
import { Project, SkillCategory, Education, Experience, ThemePreset } from "./types";

export const PORTFOLIO_OWNER = {
  name: "Salman Farcy",
  title: "Principal Systems Architect & Staff Engineer",
  subTitle: "Over 5 years of experience designing ultra-scalable distributed systems, high-concurrency microservices, and immersive glassmorphic web platforms with advanced micro-animations.",
  avatar: "../src/assets/images/3.png",
  email: "salmanfarcy253@gmail.com",
  phone: "+880 1602695577",
  whatsapp: "https://wa.me/8801602695577",
  resumeUrl: "#", // Clickable button (view & download mock action)
  socials: {
    github: "https://github.com/salman-farcy",
    linkedin: "https://www.linkedin.com/in/salman-farcy/",
    youtube: "https://www.youtube.com/@CodeWithSalmanFarcy",
    twitter: "https://x.com/salmanfarcyDev",
    facebook: "https://www.facebook.com/salmanfarcy.253/"
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "zenspace",
    name: "ZenSpace",
    tagline: "Breathing Meditation & Mindfulness Dashboard",
    image: "/src/assets/images/project_zenspace_1783144521990.jpg",
    images: [
      "/src/assets/images/project_zenspace_1783144521990.jpg",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80"
    ],
    techStack: ["React 19", "Vite", "Motion", "Tailwind CSS", "Web Audio API"],
    description: "ZenSpace is a state-of-the-art interactive mindfulness application designed to help users regulate their breathing, view real-time stress charts, and listen to relaxing ambient soundtracks. It combines a clean glassmorphic aesthetic with fluid animations to offer a calming experience.",
    liveLink: "https://zenspace-mind.web.app",
    githubLink: "https://github.com/salmanfarcy/zenspace-client",
    challenges: "Synchronizing the breathing circle's expansion with precise audio frequency loops was highly challenging. JavaScript timer drift on mobile browsers caused subtle micro-stutters during 10-minute sessions. I solved this by switching the core interval triggers to use the low-latency hardware Web Audio API context clock rather than standard browser setTimeout intervals.",
    improvements: "Future plans include integrating a server-side sentiment analysis system to suggest custom soundtracks based on user journal entries, and implementing an offline synchronization queue using Service Workers for disconnected forest retreats."
  },
  {
    id: "novashop",
    name: "NovaShop",
    tagline: "Ultra-Modern Glassmorphic Design Storefront",
    image: "/src/assets/images/project_novashop_1783144534290.jpg",
    images: [
      "/src/assets/images/project_novashop_1783144534290.jpg",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
    ],
    techStack: ["React 19", "Express", "Tailwind CSS", "Framer Motion", "Recharts"],
    description: "NovaShop is a luxury, immersive e-commerce web application featuring physical glassmorphism depth grids, fully interactive 3D-like preview controls, and an advanced, visual dynamic checkout pipeline. Highly optimized for keycaps, design items, and artisan workspace gear.",
    liveLink: "https://novashop-curated.web.app",
    githubLink: "https://github.com/salmanfarcy/novashop-client",
    challenges: "Rendering multiple blur backdrops on high-density displays (such as Apple Retina screens) caused significant graphics rendering lag, dropping frame rates down to 30fps. To overcome this layout challenge, I replaced nested background-blur layers with single-layered hardware-accelerated CSS backdrops, and optimized image resizing using high-performance responsive WebP formats.",
    improvements: "I plan to add real-time multiplayer 'co-shopping' rooms where friends can view and drag design items onto a shared digital canvas together, supported by standard websocket synchronization channels."
  },
  {
    id: "taskflow",
    name: "TaskFlow",
    tagline: "Collaborative Bento Grid Task Manager",
    image: "/src/assets/images/project_taskflow_1783144547505.jpg",
    images: [
      "/src/assets/images/project_taskflow_1783144547505.jpg",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    ],
    techStack: ["React 19", "Vite", "D3.js", "Tailwind CSS", "Motion"],
    description: "TaskFlow reimagines classical project management with a responsive bento grid structure. Users can drag and drop task cards, inspect personal productivity analytics through custom D3 visualization gauges, and track active sprint cycles under a dark violet ambiance.",
    liveLink: "https://taskflow-bento.web.app",
    githubLink: "https://github.com/salmanfarcy/taskflow-client",
    challenges: "Maintaining accurate state synchronization across modular bento grid components during intense drag-and-drop actions was highly complex. Simple state lifts caused full-grid re-renders that disrupted drag gestures. I resolved this by building a highly localized pub-sub event dispatcher, enabling only the active and targeted bento grid cards to re-render.",
    improvements: "Upcoming features will introduce automated task categorization using lightweight client-side machine learning classifiers, alongside customizable personal productivity widgets."
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Frontend Dev",
    skills: [
      { name: "React 19", level: 95, iconName: "Code2", tooltip: "Concurrent rendering, transitions, state hook systems & core React fibers" },
      { name: "Next.js", level: 92, iconName: "Cloud", tooltip: "App Router dynamic rendering, server actions, layout structures & middleware routing" },
      { name: "JavaScript", level: 92, iconName: "Cloud", tooltip: "App Router dynamic rendering, server actions, layout structures & middleware routing" },
      { name: "TypeScript", level: 90, iconName: "Shield", tooltip: "Strict type-safety, advanced utility typings & deep static code verification" },
      { name: "Tailwind CSS", level: 98, iconName: "Wind", tooltip: "Pristine styling grids, adaptive theme configurations & complex transitions" },
      { name: "Framer Motion", level: 92, iconName: "Sparkles", tooltip: "Custom fluid animations, orchestrations & physical exit transitions" },
      { name: "D3.js", level: 85, iconName: "BarChart", tooltip: "Data bindings, scale projections, custom mathematical charts & custom SVG gauges" },
      { name: "Recharts", level: 88, iconName: "BarChart", tooltip: "Responsive composite data rendering & beautiful business chart templates" }
    ]
  },
  {
    category: "Backend & Cloud",
    skills: [
      { name: "Node.js", level: 88, iconName: "Server", tooltip: "Scalable asynchronous runtime environments & advanced local event architectures" },
      { name: "Express", level: 86, iconName: "Server", tooltip: "High-performance endpoint routing, interceptor middlewares & request parsing" },
      { name: "PostgreSQL", level: 84, iconName: "Database", tooltip: "Relational data tables, index optimizations, raw transactional queries & schemas" },
      { name: "Prisma (ORM)", level: 82, iconName: "Database", tooltip: "Type-safe database interaction, relational migrations & structured schemas" },
      { name: "Cloud Firestore", level: 90, iconName: "Flame", tooltip: "Real-time key-value document streaming, offline cache pools & security filters" },
      { name: "Firebase Auth", level: 88, iconName: "Shield", tooltip: "Multi-provider OAuth credentials, custom state storage & session token handshakes" },
      { name: "RESTful APIs", level: 92, iconName: "Cpu", tooltip: "Robust payload endpoints, rate-limit gates, CORS configurations & API documentation" }
    ]
  },
  {
    category: "Tools & Workspace",
    skills: [
      { name: "Git", level: 94, iconName: "GitBranch", tooltip: "Surgical branch rebasing, complex staging trees & safe commit histories" },
      { name: "GitHub Actions", level: 90, iconName: "GitBranch", tooltip: "Automated test checking, artifact building & custom container releases" },
      { name: "Figma", level: 86, iconName: "Figma", tooltip: "Auto-layout vector designs, atomic component hierarchies & typography presets" },
      { name: "Docker", level: 75, iconName: "Box", tooltip: "Multi-stage builder containers, volume filesystems & portable virtual environments" },
      { name: "Vercel", level: 88, iconName: "Cloud", tooltip: "Edge serverless cloud functions, lightning-fast static builds & auto preview branch deploys" },
      { name: "Cloud Run", level: 85, iconName: "Cloud", tooltip: "Fully managed autoscaling backend containers, HTTPS endpoints & secure secrets" }
    ]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: "Higher Secondary Certificate (HSC) – Humanities",
    institution: "Altazer Rahman Degree College, Bhola",
    period: "2017 - 2019",
    result: "GPA: 3.43 / 4.00",
    details: "Studied Humanities with Social Science subjects, building a foundation in analytical thinking and communication."
  },
  {
    degree: "Secondary School Certificate (SSC) – Science",
    institution: "Bosila High School, Dhaka",
    period: "2015 - 2016",
    result: "GPA: 3.22 / 5.00",
    details: "Completed Secondary School education in the Science group, building a strong foundation in mathematics, physics, chemistry, and analytical problem-solving."
  }
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    role: "Frontend Web Developer",
    company: "Independent Learning & Personal Projects",
    period: "2022 - Present",
    location: "Dhaka, Bangladesh",
    details: [
      "Building modern, responsive, and high-performance web applications using HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS, and Bootstrap.",
      "Developed multiple real-world projects with a strong focus on clean UI, reusable component architecture, accessibility, and responsive user experiences.",
      "Integrated RESTful APIs and gained hands-on experience with Node.js, Express.js, MongoDB, PostgreSQL, and Prisma while expanding full-stack development skills.",
      "Continuously improving frontend engineering expertise by following industry best practices, optimizing application performance, and exploring modern web technologies."
    ]
  }
];

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "deep-orchid",
    name: "Deep Orchid",
    primary: "#c084fc", // light purple
    accent: "#f472b6", // warm pink
    bgGradient: "from-[#0d0714] via-[#1a0b2e] to-[#07020d]",
    glassBg: "bg-purple-950/20",
    glassBorder: "border-purple-500/20",
    textGlow: "shadow-[0_0_20px_rgba(192,132,252,0.3)]"
  },
  {
    id: "neon-violet",
    name: "Neon Violet",
    primary: "#a78bfa", // violet
    accent: "#22d3ee", // neon cyan
    bgGradient: "from-[#080214] via-[#0f0728] to-[#04010a]",
    glassBg: "bg-indigo-950/20",
    glassBorder: "border-indigo-500/20",
    textGlow: "shadow-[0_0_20px_rgba(167,139,250,0.35)]"
  },
  {
    id: "royal-velvet",
    name: "Royal Velvet",
    primary: "#d8b4fe", // light purple
    accent: "#fbbf24", // gold/amber
    bgGradient: "from-[#0c0512] via-[#160424] to-[#08010f]",
    glassBg: "bg-fuchsia-950/15",
    glassBorder: "border-fuchsia-500/20",
    textGlow: "shadow-[0_0_20px_rgba(216,180,254,0.3)]"
  },
  {
    id: "cosmic-abyss",
    name: "Cosmic Abyss",
    primary: "#e879f9", // fuchsia
    accent: "#818cf8", // indigo
    bgGradient: "from-[#020108] via-[#090518] to-[#020105]",
    glassBg: "bg-zinc-900/30",
    glassBorder: "border-zinc-500/15",
    textGlow: "shadow-[0_0_20px_rgba(232,121,249,0.3)]"
  }
];
