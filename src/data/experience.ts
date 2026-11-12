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
    role: "Contract Full-Stack Software Engineer",
    start: "Oct 2025",
    end: "Present",
    context: "Remote · Distributed real-time platform with millions of registered users and tens of thousands daily",
    highlights: [
      "Cut service boot up times by 50% and sharply reduced the runtime of cluster-wide batch workloads that mutate every live state instance, through JVM runtime and memory-management tuning that at times outperformed equivalent Rust implementations",
      "Designed LLM-integrated pipelines for real-time content validation with human-in-the-loop review, autonomous bug triage that opens pull requests, and AI-driven user-facing features",
      "Built isolated test harnesses and regression environments for legacy services with no CI/CD, scaling the QA team's validation throughput and sharply reducing defects reaching production",
      "Modernize a large legacy Java/Kotlin codebase serving tens of thousands of daily active users, engineering against production tables of 10M+ rows",
      "Own new services and features from design through release, with documentation for engineering, business stakeholders and users"
    ],
    tech: ["Java", "Kotlin", "JVM tuning", "SQL", "LLMs"]
  },
  {
    company: "TechnoClash LLC",
    role: "Contract Software Engineer",
    start: "Mar 2025",
    end: "Oct 2025",
    context: "Remote · Distributed real-time platform",
    highlights: [
      "Built and operated a microservice and database tier orchestrating multi-tenant session state for concurrent users",
      "Built CI/CD pipelines and automated test suites that gate every deployment, reducing release risk",
      "Designed and implemented new backend services in Java/Kotlin, documented for engineering, the business and users"
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
      "Ran an independent software contracting business with short client engagements, and closed it after accepting new roles"
    ],
    tech: []
  },
  {
    company: "MC Legion Games / Starfury Contracting",
    role: "Full-Stack Software Engineer",
    start: "Jun 2021",
    end: "Oct 2024",
    context: "Remote · Web platform and distributed real-time backend. The project moved between companies; the role stayed the same",
    highlights: [
      "Architected microservice backends that grew from 2 to 24 services, owning service boundaries, data stores and inter-service APIs",
      "Built analytics APIs that query 100K+ user records efficiently",
      "Built low-latency state-aggregation APIs that assemble each session's state from user records before it starts",
      "Built search and data-access APIs with React/Astro frontends over users' own and shared data",
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
