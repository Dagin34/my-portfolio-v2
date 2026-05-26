export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    skills?: string[];
}

const experiences: Experience[] = [
    {
        company: "Blue Spark Business Technologies",
        role: "Full Stack Developer",
        period: "July 2025 — Present",
        description:
            "Contributing to enterprise-level solutions, focusing on full-stack architecture and performance optimization.",
        skills: ["SvelteKit", "FastAPI", "PostgreSQL", "TailwindCSS"],
    },
    {
        company: "Andro Solutions",
        role: "Co-Founder & Partner",
        period: "2023 — Present",
        description:
            "Leading the technical vision and development of custom software solutions for diverse clients, bridging the gap between business needs and robust code.",
        skills: ["System Design", "Cloud Architecture", "Leadership"],
    },
    {
        company: "A2SV | Africa to Silicon Valley",
        role: "Trainee",
        period: "Jan 2026 — Present",
        description:
            "Chosen to join A2SV's competitive training program, where I'm focused on deepening my problem-solving skills through Data Structures and Algorithms.",
        skills: ["Data Structures", "Problem Solving", "Algorithm Analysis"],
    },
    {
        company: "Bala Media",
        role: "Full Stack Developer",
        period: "September 2025",
        description:
            "Designing, developing, and maintaining front-end and back-end systems while collaborating with other team members on project architecture and implementation.",
        skills: ["Next.js", "React.js", "Node.js", "Express.js", "TailwindCSS", "Docker"],
    },
    {
        company: "Spring of Knowledge Academy",
        role: "Backend Developer",
        period: "Nov 2024 — Feb 2025",
        description:
            "Developed and Integrated a high-performance web API and automated workflows for the academy owners.",
        skills: ["Python", "FastAPI", "Next.js"],
    },
    // {
    //     company: "Ethiopia for All Initiative",
    //     role: "Full Stack Developer",
    //     period: "Oct 2024 - Jan 2025",
    //     description:
    //         "Led backend development and integration for the platform using Node.js, Express, and React.",
    //     skills: ["Python", "FastAPI", "Next.js"],
    // },
];

export default experiences;