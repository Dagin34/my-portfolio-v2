import { X } from "lucide-svelte";
import Andro from '$assets/project-images/andro-solutions.png';
import Chewata from '$assets/project-images/chewata-chatting.png';
import Eon from '$assets/project-images/eon-recycling.png';
import Gojo from '$assets/project-images/gojo-getaways.png';
import Testing from '$assets/project-images/testing.png';
import Silo from '$assets/project-images/silo-knitting.png';
import Spawn from '$assets/project-images/spawn-point.png';
import Spectate from '$assets/project-images/spectate-interview.png';
import StreamSynx from '$assets/project-images/streamsynx.png';
import Wolfden from '$assets/project-images/wolfden.png';
import WonderNest from '$assets/project-images/wonder-nest.png';
import SFA from '$assets/project-images/sfa.png';
import ENB from '$assets/project-images/enb-inventory.png';

// Define the Project type to fix the 'any' error
export interface Project {
    title: string;
    description: string;               // High-level summary
    detailedDescription?: string;      // Deep-dive explanation
    features?: string[];               // Key functionalities
    images: string[];
    github: string | null;
    live: string | null;
    tech?: string[];                   // Tech stack tags
    role?: string;                     // e.g., "Lead Developer" or "Fullstack"
    year?: string;                     // e.g., "2024"
}

// Real project data from your resume
const allProjects: Project[] = [
    {
        title: 'StreamSynx',
        description: 'Virtual movie streaming platform with synchronized playback via TMDB API.',
        detailedDescription:
            'A watch-party platform allowing multiple users to stream and synchronize movie playback in real time. Users can create rooms, invite friends, and enjoy synchronized viewing experiences powered by TMDB metadata.',
        features: [
            'Synchronized video playback',
            'Real-time room management',
            'TMDB movie integration',
            'Live session updates',
            'Responsive user interface'
        ],
        role: 'Full Stack Developer',
        year: '2025',
        images: [StreamSynx],
        github: 'https://github.com/Kidus-M/StreamSynx/',
        live: 'https://streamsynx.vercel.app',
        tech: ['Next.js', 'Firebase', 'TailwindCSS', 'WebSockets', 'TMDB API']
    },
    {
        title: 'Chewata Chat',
        description: 'Real-time instant messaging app enabling text and image exchange.',
        detailedDescription:
            'A modern real-time messaging application focused on fast communication through text and image sharing. Built using a MERN architecture with WebSocket-powered communication.',
        features: [
            'Real-time messaging',
            'Image sharing',
            'User authentication',
            'Online presence indicators',
            'Persistent conversations'
        ],
        role: 'Full Stack Developer',
        year: '2024',
        images: [Chewata],
        github: 'https://github.com/Dagin34/chewata-backend',
        live: 'https://chewata-chatting.vercel.app',
        tech: ['React.js', 'Node.js', "Express", 'MongoDB', 'MERN Stack', 'WebSockets', 'TailwindCSS']
    },
    {
        title: 'BlueSpark SFA',
        description: 'A backend heavy Sales Force Automation system with responsibilities including implementing KPIs for sales performances, designing management of RTMs, and integration with MoR (Ministry of Revenue).',
        detailedDescription:
            'An enterprise-grade multi-tenant Sales Force Automation platform developed at Blue Spark. Responsibilities included backend architecture, KPI tracking modules, route-to-market management, inventory workflows, and integrations with external government and business systems.',
        features: [
            'Multi-tenant architecture',
            'KPI and performance tracking',
            'Route-to-Market (RTM) management',
            'Inventory and warehouse workflows',
            'Ministry of Revenue integrations',
            'Advanced reporting dashboards'
        ],
        role: 'Backend Engineer',
        year: '2025 - Present',
        images: [SFA],
        github: null,
        live: null,
        tech: ['SvelteKIT', 'Python', 'FastAPI', 'JWT', 'TailwindCSS', 'PostgreSQL']
    },
    {
        title: 'Gojo Getaways',
        description: 'Vacation Home Management & Booking Ecosystem for Ethiopian property owners and International Travellers.',
        detailedDescription:
            'A full-stack booking ecosystem designed to connect Ethiopian vacation home owners with local and international travelers. The platform supports property listings, reservation workflows, user authentication, and management dashboards for hosts and administrators.',
        features: [
            'Property listing management',
            'Booking and reservation workflows',
            'Role-based authentication',
            'Host and admin dashboards',
            'Responsive booking experience'
        ],
        role: 'Full Stack Developer',
        year: '2024',
        images: [Gojo],
        github: 'https://github.com/Dagin34/GojoBackend',
        live: null,
        tech: ['React.js', 'Node.js', "Express", 'MongoDB', 'MERN Stack', 'JWT', 'TailwindCSS']
    },
    {
        title: 'Andro Solutions',
        description: 'The official Andro Solutions website designed with a clean aesthetic. Features responsive layouts, smooth animations, and optimized SEO structure.',
        detailedDescription:
            'The corporate website for Andro Solutions, showcasing company services, branding, and digital presence through a highly polished and responsive user experience.',
        features: [
            'SEO optimization',
            'Responsive design',
            'Smooth page transitions',
            'Brand-focused presentation',
            'Performance optimization'
        ],
        role: 'Co-Founder & Lead Developer',
        year: '2025',
        images: [Andro],
        github: 'https://github.com/AndroSolutionsPersonal/Andro-Website',
        live: 'https://andro-solutions.tech',
        tech: ['Next.js', 'TailwindCSS', 'Framer']
    },
    {
        title: 'Wolfden Cigar Lounge',
        description: 'Elevated the lounge\'s digital identity through a refined web platform. By integrating curated galleries and intuitive booking flows.',
        detailedDescription:
            'A luxury-focused business website built to strengthen Wolfden\'s online presence through elegant design, curated media presentation, and streamlined customer interactions.',
        features: [
            'Booking workflows',
            'Gallery management',
            'Responsive experience',
            'Premium brand presentation',
            'Business information management'
        ],
        role: 'Frontend Developer',
        year: '2025',
        images: [Wolfden],
        github: null,
        live: null,
        tech: ['Next.js', 'TailwindCSS', 'Supabase']
    },
    {
        title: "Errium",
        description:
            "A developer-first API error handling and translation library designed to provide consistent, structured, and human-friendly error responses across applications.",
        detailedDescription:
            "Errium is an open-source toolkit focused on standardizing API error handling. It helps developers transform raw framework and runtime exceptions into predictable, developer-friendly responses while maintaining clean architecture principles. The project aims to improve debugging, API usability, and developer experience by providing a unified error management layer that can be integrated into modern backend applications.",
        features: [
            "Unified error response structure",
            "Custom exception handling",
            "Framework-agnostic architecture",
            "Developer-friendly error messages",
            "Open-source and community-driven"
        ],
        images: [],
        github: "https://github.com/dagin34/errium",
        live: null,
        tech: ["Python", "FastAPI", "Type Hints", "PyTest", "Open Source", "Pydantic", "Starlette"],
        role: "Creator & Lead Developer",
        year: "2026"
    },
    {
        title: "ENB Asset Mgmt",
        description:
            "A modern inventory and asset management platform built for tracking products, stock movement, and business operations through an intuitive dashboard.",
        detailedDescription:
            "ENB is a full-stack inventory management solution designed to simplify stock control and asset tracking. The platform provides comprehensive CRUD operations, transaction history, stock monitoring, and reporting capabilities. It focuses on clean user experience, scalability, and real-world business workflows while maintaining a responsive and modern interface.",
        features: [
            "Inventory and asset management",
            "Stock in and stock out tracking",
            "Transaction history logging",
            "Product image uploads",
            "Category management",
            "Responsive dashboard interface",
        ],
        images: [ENB],
        github: "https://github.com/Dagin34/enb-inventory-app",
        live: "https://enb-inventory-app.vercel.app/",
        tech: ["Next.js", "TailwindCSS", "TypeScript", "DrizzleORM", "Node.js", "Express", "Cloudinary"],
        role: "Full Stack Developer",
        year: "2026"
    },
    {
        title: 'Spectate Interview Room',
        description: 'A real-time virtual room for Python Interviews for Interviewers to monitor and manage the work of Interviewees.',
        detailedDescription:
            'A collaborative interview environment designed for technical assessments. Interviewers can observe candidate progress in real time while managing coding sessions remotely.',
        features: [
            'Real-time collaboration',
            'Interview room management',
            'Live monitoring',
            'Role-based access',
            'WebSocket-powered updates'
        ],
        role: 'Full Stack Developer',
        year: '2025',
        images: [Spectate],
        github: 'https://github.com/dagin34',
        live: 'https://spectate-room.vercel.app',
        tech: ['Next.js', 'TailwindCSS', 'Supabase', 'WebSockets']
    },
    {
        title: 'Eon Recycling',
        description: 'Developed and maintained the system to support recycling operations, lead generations, including data management, and API integrations to improve operational efficiency and visibility.',
        detailedDescription:
            'Business operations platform supporting recycling workflows, customer acquisition, reporting, and integrations that improved operational visibility and process management.',
        features: [
            'Lead generation workflows',
            'Operational dashboards',
            'Data management',
            'API integrations',
            'Business reporting'
        ],
        role: 'Full Stack Developer',
        year: '2025',
        images: [Eon],
        github: null,
        live: 'https://eonrecycling.com',
        tech: ['React.js', 'Node.js', "Express", 'MongoDB', 'MERN Stack', 'JWT', 'TailwindCSS']
    },
    {
        title: 'Wonder Nest Daycare',
        description: 'Built and customized a management system for a daycare center, streamlining enrollment, and daily operations through intuitive and reliable software solutions.',
        detailedDescription:
            'A management platform tailored for daycare operations, helping administrators manage enrollment, operational activities, and parent-facing workflows.',
        features: [
            'Enrollment management',
            'Student records',
            'Operational tracking',
            'Administrative dashboards',
            'User-friendly workflows'
        ],
        role: 'Full Stack Developer',
        year: '2025',
        images: [WonderNest],
        github: null,
        live: 'https://wonder-nest-daycare.com',
        tech: ['React.js', 'Node.js', "Express", 'MongoDB', 'MERN Stack', 'JWT', 'TailwindCSS']
    },
    {
        title: 'Testing Auth',
        description: 'Secure notes app with JWT and automated Selenium test scripts.',
        detailedDescription:
            'A secure note-taking application created to explore authentication workflows and automated quality assurance practices through Selenium testing.',
        features: [
            'JWT authentication',
            'Secure note storage',
            'Automated Selenium testing',
            'Protected routes',
            'CRUD operations'
        ],
        role: 'Full Stack Developer',
        year: '2024',
        images: [Testing],
        github: 'https://github.com/Dagin34/testing-frontend',
        live: 'https://auth-tester-et.vercel.app',
        tech: ['React.js', 'Node.js', "Express", 'MongoDB', 'MERN Stack', 'Selenium', 'JWT', 'TailwindCSS']
    },
    {
        title: 'Spawn Point HMS',
        description: 'A project that allows you to keep track of everything in a hospital from staff to medications in stock to even specific medications prescribed to patients.',
        detailedDescription:
            'A comprehensive hospital management system developed using .NET technologies to centralize patient, staff, inventory, and prescription management.',
        features: [
            'Patient management',
            'Staff management',
            'Prescription tracking',
            'Medication inventory',
            'Reporting tools'
        ],
        role: 'Software Developer',
        year: '2023',
        images: [Spawn],
        github: 'https://github.com/Dagin34/Spawn_Point_Hospital',
        live: null,
        tech: ['Csharp', 'DotNet', 'SQL', 'GUNA UI', 'Entitiy Framework']
    },
    {
        title: 'SILO Stock Mgmt.',
        description: 'An inventory management system designed for a knitting business that allows the admins to track the salary and yarn count of employees, customers and their respective orders in a slick and modern UI design.',
        detailedDescription:
            'A business management and inventory platform created for a knitting company to manage production materials, employees, customer orders, and payroll-related workflows.',
        features: [
            'Inventory management',
            'Yarn stock tracking',
            'Employee management',
            'Payroll tracking',
            'Customer order management'
        ],
        role: 'Software Developer',
        year: '2023',
        images: [Silo],
        github: 'https://github.com/Dagin34/SILO-Clothing-New-UI',
        live: null,
        tech: ['Csharp', 'DotNet', 'SQL', 'GUNA UI', 'Entitiy Framework']
    }
];

export default allProjects;