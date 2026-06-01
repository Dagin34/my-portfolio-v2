import { Box, Layers, Link, Monitor } from "lucide-svelte";

export interface Offering {
    id: string;
    num: string;
    title: string;
    description: string;
    icon: any;
}

const offerings: Offering[] = [
    {
        id: "fullstack",
        num: "01",
        title: "Full Stack Development",
        description: "Building scalable and high-performance web applications using Next.js, React, Node.js, and TypeScript, with robust backend architectures, secure RESTful APIs, and clean code practices.",
        icon: Layers
    },
    {
        id: "uiux",
        num: "02",
        title: "UI/UX Design",
        description: "Designing modern, responsive interfaces with Figma, Tailwind CSS, and Framer Motion. Creating intuitive experiences with clean design systems and pixel-perfect implementations.",
        icon: Monitor
    },
    {
        id: "saas",
        num: "03",
        title: "SaaS Platform",
        description: "Developing end-to-end SaaS solutions with subscription systems, Stripe billing, and multi-tenant management. Ensuring scalability and secure user management.",
        icon: Box
    },
    {
        id: "api",
        num: "04",
        title: "API & System Architecture",
        description: "Designing maintainable systems with database design, API design, Prisma, and MongoDB. Focusing on performance optimization, security best practices, and clean data flow.",
        icon: Link
    }
];

export default offerings;