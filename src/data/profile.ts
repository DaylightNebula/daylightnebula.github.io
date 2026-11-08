/**
 * Profile
 *
 * Fields:
 * * name: Full name shown in the sidebar and page titles
 * * title: Job title shown under the name
 * * tagline: One sentence pitch shown under the title
 * * email: Contact email address
 * * github: GitHub profile URL
 * * resume: Path to the downloadable resume PDF
 * * photo: Path to the profile photo
 * * location: Where the user works from
 */
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  github: string;
  resume: string;
  photo: string;
  location: string;
}

export const profile: Profile = {
  name: "Noah Shaw",
  title: "Full-Stack Software Engineer",
  tagline:
    "I build backend services, data-heavy APIs and web apps for platforms with millions of users, and in my own time a game engine in Rust from the ground up.",
  email: "noah.w.shaw@gmail.com",
  github: "https://github.com/DaylightNebula",
  resume: "/Resume.pdf",
  photo: "/images/me.jpg",
  location: "Fort Collins, Colorado"
};

/**
 * SkillGroup
 *
 * Fields:
 * * label: Name of the group, such as "Languages"
 * * items: Skills in the group, most relevant first
 */
export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Java", "Kotlin", "TypeScript", "JavaScript", "Rust", "C", "Python"] },
  { label: "Frontend", items: ["React", "Astro"] },
  { label: "Backend", items: ["API design", "Microservices", "JVM performance tuning", "Consul", "TCP / WebSocket networking"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { label: "DevOps", items: ["AWS", "Bare metal", "Docker", "Jenkins", "GitHub Actions", "CI/CD", "Automated testing"] },
  { label: "AI", items: ["LLM moderation", "Automated bug triage and PRs", "User-facing AI features"] },
  { label: "Graphics", items: ["WGPU", "WGSL", "ECS architecture", "SDF rendering", "Skeletal animation"] }
];
