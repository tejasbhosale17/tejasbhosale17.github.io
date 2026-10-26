export type Link = {
  label: string;
  href: string;
};

export type Skill = {
  name: string;
  family: string;
  projects: string[];
};

export type Project = {
  id: string;
  title: string;
  date: string;
  description: string;
  features: string[];
  tech: string[];
  href?: string;
};

export const PROFILE = {
  name: "Tejas Bhosale",
  initials: "TB",
  role: "Software Engineer",
  email: "tejasvbhosale@gmail.com",
  emailHref: "mailto:tejasvbhosale@gmail.com",
  phone: "+1 (510) 674-7884",
  phoneHref: "tel:+15106747884",
  location: "Hayward, CA",
  resume: "/Tejas-Bhosale-Resume.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/tejasbhosale17" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tejas-bhosale-195871159/",
    },
    { label: "LeetCode", href: "https://leetcode.com/u/tejas_bhosale/" },
  ] satisfies Link[],
  resumeSummary: null,
} as const;

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

export const PROJECTS: Project[] = [
  {
    id: "microservices",
    title: "Microservices-Based Backend System",
    date: "March 2026",
    description:
      "A distributed microservices architecture with separate services for user management and transaction processing.",
    features: [
      "REST APIs with validation and error handling",
      "JWT authentication and role-based access control",
      "Docker containerization",
      "JUnit unit and integration tests",
    ],
    tech: ["Java", "Spring Boot", "Docker", "RESTful APIs"],
    href: "https://github.com/tejasbhosale17/microservices-backend",
  },
  {
    id: "rate-limiter",
    title: "Distributed Rate Limiter",
    date: "April 2025",
    description:
      "A distributed rate limiter built with Redis and a sliding-window algorithm to control API traffic under concurrent load.",
    features: [
      "Express middleware for per-user and per-IP request limits",
      "Shared Redis state across instances",
      "Horizontal scalability",
      "Protection against excessive traffic",
    ],
    tech: ["Node.js", "Redis", "Express.js", "Docker"],
  },
  {
    id: "cloud-storage",
    title: "Cloud File Storage System",
    date: "January 2026",
    description:
      "A file storage system with streaming uploads, AWS S3 object storage, and efficient file-handling workflows.",
    features: [
      "Large file uploads using streaming",
      "AWS S3 object storage",
      "Authentication and access control",
      "Structured API error handling and logging",
    ],
    tech: ["AWS (S3)", "Node.js", "Express.js", "React", "RESTful APIs"],
    href: "https://github.com/tejasbhosale17/cloud-storage",
  },
  {
    id: "chat",
    title: "Real-Time Chat Application",
    date: "February 2026",
    description:
      "A real-time messaging application using WebSockets and a scalable event-driven architecture.",
    features: [
      "Low-latency messaging with Socket.io",
      "Support for concurrent users",
      "Optimized event handling",
    ],
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    href: "https://github.com/tejasbhosale17/realtime-chat-app",
  },
];

const projectNames = {
  microservices: ["Microservices-Based Backend System"],
  rateLimiter: ["Distributed Rate Limiter"],
  cloudStorage: ["Cloud File Storage System"],
  chat: ["Real-Time Chat Application"],
};

function projectsFor(...keys: (keyof typeof projectNames)[]): string[] {
  return keys.flatMap((key) => projectNames[key]);
}

export const SKILL_GROUPS: { name: string; skills: Skill[] }[] = [
  {
    name: "Languages",
    skills: [
      { name: "Java", family: "Languages", projects: projectsFor("microservices") },
      { name: "Python", family: "Languages", projects: [] },
      {
        name: "JavaScript",
        family: "Languages",
        projects: projectsFor("rateLimiter", "cloudStorage", "chat"),
      },
      { name: "SQL", family: "Languages", projects: [] },
      { name: "HTML", family: "Languages", projects: [] },
      { name: "CSS", family: "Languages", projects: [] },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", family: "Frontend", projects: projectsFor("cloudStorage", "chat") },
      { name: "Next.js", family: "Frontend", projects: [] },
      { name: "TypeScript", family: "Frontend", projects: [] },
      { name: "Tailwind CSS", family: "Frontend", projects: [] },
      { name: "Bootstrap", family: "Frontend", projects: [] },
      { name: "Framer", family: "Frontend", projects: [] },
      { name: "Responsive Web Design", family: "Frontend", projects: [] },
      { name: "React Hooks", family: "Frontend", projects: [] },
      { name: "Context API", family: "Frontend", projects: [] },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Spring Boot",
        family: "Backend",
        projects: projectsFor("microservices"),
      },
      { name: "Spring JDBC", family: "Backend", projects: [] },
      {
        name: "Node.js",
        family: "Backend",
        projects: projectsFor("rateLimiter", "cloudStorage", "chat"),
      },
      {
        name: "Express.js",
        family: "Backend",
        projects: projectsFor("rateLimiter", "cloudStorage"),
      },
      { name: "Hibernate/JPA", family: "Backend", projects: [] },
      {
        name: "RESTful APIs",
        family: "Backend",
        projects: projectsFor("microservices", "cloudStorage"),
      },
      {
        name: "Microservices",
        family: "Backend",
        projects: projectsFor("microservices"),
      },
      {
        name: "JWT Authentication",
        family: "Backend",
        projects: projectsFor("microservices"),
      },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MySQL", family: "Databases", projects: [] },
      { name: "PostgreSQL", family: "Databases", projects: [] },
      {
        name: "MongoDB",
        family: "Databases",
        projects: projectsFor("chat"),
      },
      {
        name: "Redis",
        family: "Databases",
        projects: projectsFor("rateLimiter"),
      },
    ],
  },
  {
    name: "Cloud & AI",
    skills: [
      {
        name: "AWS (S3)",
        family: "Cloud & AI",
        projects: projectsFor("cloudStorage"),
      },
      {
        name: "Docker",
        family: "Cloud & AI",
        projects: projectsFor("microservices", "rateLimiter"),
      },
      { name: "CI/CD", family: "Cloud & AI", projects: [] },
      { name: "Vertex", family: "Cloud & AI", projects: [] },
      { name: "Netlify", family: "Cloud & AI", projects: [] },
    ],
  },
  {
    name: "Tools & Practices",
    skills: [
      { name: "Git", family: "Tools & Practices", projects: [] },
      { name: "GitHub", family: "Tools & Practices", projects: [] },
      { name: "Linux", family: "Tools & Practices", projects: [] },
      { name: "SDLC", family: "Tools & Practices", projects: [] },
      { name: "Postman", family: "Tools & Practices", projects: [] },
      { name: "Figma", family: "Tools & Practices", projects: [] },
      { name: "Canva", family: "Tools & Practices", projects: [] },
    ],
  },
];

export type TimelineRecord = {
  startDate: string;
  period: string;
  title: string;
  place: string;
  location: string;
  details: string[];
};

export const EXPERIENCE: TimelineRecord[] = [
  {
    startDate: "2023-01",
    period: "Jan 2023 — Dec 2024",
    title: "Software Engineer",
    place: "Angular Minds",
    location: "Pune, India",
    details: [
      "Designed and developed scalable backend services using Java and Spring Boot, handling high-concurrency production workloads.",
      "Built and maintained RESTful APIs with modular architecture and validation, improving system reliability.",
      "Reduced database query latency by ~30% through indexing and optimization.",
      "Collaborated in Agile teams across the full SDLC, contributing to design discussions, code reviews, and production support.",
    ],
  },
  {
    startDate: "2021-01",
    period: "Jan 2021 — May 2021",
    title: "UI Developer",
    place: "Code Gurukul",
    location: "",
    details: [
      "Developed responsive UI components using React.js and integrated them with backend REST APIs.",
      "Improved website performance and user experience through optimized frontend design.",
    ],
  },
];

export const EDUCATION: TimelineRecord[] = [
  {
    startDate: "2025-08",
    period: "Aug 2025 — Aug 2027",
    title: "Master of Science in Computer Science",
    place: "California State University East Bay",
    location: "Hayward, USA",
    details: [
      "Coursework: Advanced Algorithms, Web Systems, Adv AI, Operating Systems and Design, Cybersecurity",
    ],
  },
  {
    startDate: "2022-03",
    period: "Mar 2022 — Dec 2022",
    title: "Post Graduation Diploma in Advanced Computing",
    place: "CDAC Bangalore",
    location: "",
    details: [],
  },
  {
    startDate: "2017-08",
    period: "Aug 2017 — May 2021",
    title: "Bachelor of Technology in Computer Engineering",
    place: "Vishwakarma Institute of Information Technology",
    location: "Pune, India",
    details: [
      "Coursework: Data Structures and Algorithm, Operating Systems, Database Management Systems, Cloud Computing",
    ],
  },
];

export const TIMELINE = [
  ...EXPERIENCE.map((item) => ({ ...item, type: "experience" as const })),
  ...EDUCATION.map((item) => ({ ...item, type: "education" as const })),
].sort((left, right) => right.startDate.localeCompare(left.startDate));

export const CERTIFICATIONS = [
  {
    title: "AWS Solution Architect Associate Certified",
    issuer: "AWS",
    date: "June 2024",
  },
];

export const ACHIEVEMENTS = [
  {
    title: "Text to Pseudo Code Generation",
    caption: "Co-authored research paper",
    detail: "Published in IRJMETS · Volume 05, Issue 10",
  },
];
