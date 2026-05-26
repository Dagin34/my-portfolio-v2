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

// Define the Project type to fix the 'any' error
export interface Project {
    title: string;
    description: string;
    images: string[];
    github: string | null;
    live: string | null;
    tech?: string[];
}

// Real project data from your resume
const allProjects: Project[] = [
    {
        title: 'Gojo Getaways',
        description: 'Vacation Home Management & Booking Ecosystem for Ethiopian property owners and International Travellers.',
        images: [Gojo],
        github: 'https://github.com/Dagin34/GojoBackend',
        live: null,
        tech: ['React.js', 'Node.js', 'MongoDB', 'JWT', 'Tailwind']
    },
    {
        title: 'StreamSynx',
        description: 'Virtual movie streaming platform with synchronized playback via TMDB API.',
        images: [StreamSynx],
        github: null,
        live: 'https://streamsynx.vercel.app',
        tech: ['Next.js', 'Firebase', 'TailwindCSS', 'WebSockets', 'TMDB API']
    },
    {
        title: 'Chewata Chat',
        description: 'Real-time instant messaging app enabling text and image exchange.',
        images: [Chewata],
        github: 'https://github.com/Dagin34/chewata-backend',
        live: 'https://chewata-chatting.vercel.app',
        tech: ['MERN Stack', 'WebSockets', 'Zustand', 'TailwindCSS']
    },
    {
        title: 'BlueSpark SFA',
        description: 'A backend heavy Sales Force Automation system with responsibilities including implementing KPIs for sales performances, designing management of RTMs, and integration with MoR (Ministry of Revenue).',
        images: [SFA],
        github: null,
        live: null,
        tech: ['SvelteKIT', 'Python', 'FastAPI', 'JWT', 'TailwindCSS', 'PostgreSQL']
    },
    {
        title: 'Testing Auth',
        description: 'Secure notes app with JWT and automated Selenium test scripts.',
        images: [Testing],
        github: 'https://github.com/Dagin34/testing-frontend',
        live: 'https://auth-tester-et.vercel.app',
        tech: ['MERN Stack', 'Selenium', 'JWT', 'Zustand', 'TailwindCSS']
    },
    {
        title: 'Andro Solutions',
        description: 'The official Andro Solutions website designed with a clean aesthetic. Features responsive layouts, smooth animations, and optimized SEO structure.',
        images: [Andro],
        github: null,
        live: 'https://andro-solutions.tech',
        tech: ['Next.js', 'TailwindCSS', 'Framer']
    },
    {
        title: 'Spectate Interview Room',
        description: 'A real-time virtual room for Python Interviews for Interviewers to monitor and manage the work of Interviewees.',
        images: [Spectate],
        github: 'https://github.com/dagin34',
        live: 'https://spectate-room.vercel.app',
        tech: ['Next.js', 'TailwindCSS', 'Supabase', 'WebSockets']
    },
    {
        title: 'Wolfden Cigar Lounge',
        description: 'Elevated the lounge\'s digital identity through a refined web platform. By integrating curated galleries and intuitive booking flows.',
        images: [Wolfden],
        github: null,
        live: null,
        tech: ['Next.js', 'TailwindCSS', 'Supabase', 'WebSockets']
    },
    {
        title: 'Eon Recycling',
        description: 'Developed and maintained the system to support recycling operations, lead generations, including data management, and API integrations to improve operational efficiency and visibility.',
        images: [Eon],
        github: null,
        live: 'https://eonrecycling.com',
        tech: ['React.js', 'Node.js', 'MongoDB', 'JWT', 'TailwindCSS', 'Zustand']
    },
    {
        title: 'Wonder Nest Daycare',
        description: 'Built and customized a management system for a daycare center, streamlining enrollment, and daily operations through intuitive and reliable software solutions.',
        images: [WonderNest],
        github: null,
        live: 'https://wonder-nest-daycare.com',
        tech: ['React.js', 'Node.js', 'MongoDB', 'JWT', 'TailwindCSS', 'Zustand']
    },
    {
        title: 'Spawn Point HMS',
        description: 'A project that allows you to keep track of everything in a hospital from staff to medications in stock to even specific medications prescribed to patients.',
        images: [Spawn],
        github: 'https://github.com/Dagin34/Spawn_Point_Hospital',
        live: null,
        tech: ['Csharp', 'DotNet', 'SQL', 'GUNA UI', 'Entitiy Framework']
    },
    {
        title: 'SILO Stock Mgmt.',
        description: 'An inventory management system designed for a knitting business that allows the admins to track the salary and yarn count of employees, customers and their respective orders in a slick and modern UI design.',
        images: [Silo],
        github: 'https://github.com/Dagin34/SILO-Clothing-New-UI',
        live: null,
        tech: ['Csharp', 'DotNet', 'SQL', 'GUNA UI', 'Entitiy Framework']
    },
];

export default allProjects;