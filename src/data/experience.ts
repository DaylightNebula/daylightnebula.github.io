/**
 * Job
 *
 * Fields:
 * * company: Employer or client name
 * * role: Job title held
 * * start: First month in the role, such as "Oct 2025"
 * * end: Last month in the role, or "Present"
 * * context: One line on where the work happened and at what scale
 * * highlights: Achievements, strongest first
 * * tech: Main technologies used in the role
 */
export interface Job {
  company: string;
  role: string;
  start: string;
  end: string;
  context: string;
  highlights: string[];
  tech: string[];
}

export const jobs: Job[] = [
  {
    company: "Systems Solutions",
    role: "Contract Full-Stack Software Developer",
    start: "Oct 2025",
    end: "Present",
    context: "Remote · Large-scale Minecraft server network with millions of users",
    highlights: [
      "Design, build and ship novel amazing features, documenting every change for engineers, the business and users",
      "Built AI systems for chat moderation (flagging only), automated bug-report handling that opens pull requests, and user-facing features that make the game world feel more alive",
      "Built testing tooling for legacy systems without CI/CD, letting the testing team scale substantially and sharply reducing bugs reaching production",
      "Maintain and modernize a large legacy Java/Kotlin codebase serving tens of thousands of daily users, developing against production tables over 10M rows",
      "Cut server boot times in half and significantly reduced the runtime of network-wide workloads, such as updating every active entity across the network. JVM optimizations at times outperformed equivalent Rust implementations",
    ],
    tech: ["Java", "Kotlin", "Legacy Code", "LLMs"]
  },
  {
    company: "TechnoClash LLC",
    role: "Contract Software Developer",
    start: "Mar 2025",
    end: "Oct 2025",
    context: "Remote · Minecraft server network",
    highlights: [
      "Developed and maintained a network of microservices and databases powering custom multiplayer game modes",
      "Built and maintained CI/CD pipelines and automated testing",
      "Designed and implemented novel features in Java/Kotlin, documented for the development team, the business and users"
    ],
    tech: ["Java", "Kotlin", "Microservices", "CI/CD"]
  },
  {
    company: "Daylin Software House",
    role: "Independent Contractor",
    start: "Nov 2024",
    end: "Mar 2025",
    context: "Self-employed",
    highlights: [
      "Ran an independent contracting business with short client engagements, and closed it after accepting new roles"
    ],
    tech: []
  },
  {
    company: "MC Legion Games / Starfury Contracting",
    role: "Full-Stack Software Developer",
    start: "Jun 2021",
    end: "Oct 2024",
    context: "Remote · Web platform and Minecraft server network. The project moved between companies; the role stayed the same",
    highlights: [
      "Architected and maintained microservice backends ranging from 2 to 24 services",
      "Built analytics APIs that efficiently query 100K+ user records",
      "Built user-facing APIs and React/Astro web features that let users search and interact with their own and other users' data",
      "Built APIs that let game servers gather player data and assemble game state as fast as possible before each match",
      "Established CI/CD pipelines and testing practices, and documented changes affecting users and operations"
    ],
    tech: ["Microservices", "React", "Astro", "CI/CD"]
  }
];

/**
 * Education
 *
 * Fields:
 * * school: Name of the school
 * * degree: Degree earned
 * * location: Where the school is
 */
export interface Education {
  school: string;
  degree: string;
  location: string;
}

export const education: Education = {
  school: "University of Colorado Denver",
  degree: "Bachelor's in Computer Science",
  location: "Denver, CO"
};
