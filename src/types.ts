/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  name: string;
  tagline: string;
  image: string;
  images?: string[];
  techStack: string[];
  description: string;
  liveLink: string;
  githubLink: string;
  challenges: string;
  improvements: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  iconName: string;
  tooltip?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  result?: string;
  details: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  details: string[];
}

export interface ThemePreset {
  id: string;
  name: string;
  primary: string; // Tailwind color class names or hex codes represented in style
  accent: string;
  bgGradient: string;
  glassBg: string;
  glassBorder: string;
  textGlow: string;
}
