export interface Technologies {
    name: string;
    icon: string;
    monoIcon: string;
}

const technologies: Technologies[] = [
    { name: "FastAPI", icon: "devicon-fastapi-plain colored", monoIcon: "devicon-fastapi-plain" },
    { name: "SvelteKIT", icon: "devicon-svelte-plain colored", monoIcon: "devicon-svelte-plain" },
    { name: "Next.js", icon: "devicon-nextjs-plain", monoIcon: "devicon-nextjs-plain" },
    { name: "React", icon: "devicon-react-original colored", monoIcon: "devicon-react-original" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored", monoIcon: "devicon-nodejs-plain" },
    { name: "Express.js", icon: "devicon-express-original", monoIcon: "devicon-express-original" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored", monoIcon: "devicon-typescript-plain" },
    { name: "JavaScript", icon: "devicon-javascript-plain colored", monoIcon: "devicon-javascript-plain" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored", monoIcon: "devicon-mongodb-plain" },
    { name: "TailwindCSS", icon: "devicon-tailwindcss-original colored", monoIcon: "devicon-tailwindcss-original" },
    { name: "Firebase", icon: "devicon-firebase-plain colored", monoIcon: "devicon-firebase-plain" },
    { name: "HTML5", icon: "devicon-html5-plain colored", monoIcon: "devicon-html5-plain" },
    { name: "CSS3", icon: "devicon-css3-plain colored", monoIcon: "devicon-css3-plain" },
    { name: "Figma", icon: "devicon-figma-plain colored", monoIcon: "devicon-figma-plain" },
    { name: "Bootstrap", icon: "devicon-bootstrap-plain colored", monoIcon: "devicon-bootstrap-plain" },
    { name: "Selenium", icon: "devicon-selenium-original colored", monoIcon: "devicon-selenium-original" },
    { name: "SQL", icon: "devicon-sqlite-plain colored", monoIcon: "devicon-sqlite-plain" },
    { name: "C#", icon: "devicon-csharp-plain colored", monoIcon: "devicon-csharp-plain" },
    { name: ".Net", icon: "devicon-dot-net-plain colored", monoIcon: "devicon-dot-net-plain" },
    { name: "Java", icon: "devicon-java-plain colored", monoIcon: "devicon-java-plain" },
    { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", monoIcon: "devicon-postgresql-plain" },
    { name: "Github", icon: "devicon-github-original", monoIcon: "devicon-github-original" },
    { name: "SpringBoot", icon: "devicon-spring-plain colored", monoIcon: "devicon-spring-plain" },
];

export const getIconClass = (skillName: string): string | null => {
    const normalized = skillName.toLowerCase().replace(/[\s.-]/g, "");

    // Custom overrides/mappings for naming variations
    if (normalized === "reactjs" || normalized === "reactnative") {
        return "devicon-react-original colored";
    }
    if (normalized === "svelte" || normalized === "sveltekit") {
        return "devicon-svelte-plain colored";
    }
    if (normalized === "sqlite") {
        return "devicon-sqlite-plain colored";
    }
    if (normalized === "git") {
        return "devicon-git-plain colored";
    }
    if (normalized === "postman") {
        return "devicon-postman-plain colored";
    }
    if (normalized === "docker") {
        return "devicon-docker-plain colored";
    }
    if (normalized === "python") {
        return "devicon-python-plain colored";
    }
    if (normalized === "flutter") {
        return "devicon-flutter-plain colored";
    }
    if (normalized === "adobeillustrator") {
        return "devicon-illustrator-plain colored";
    }

    // Direct database search
    const found = technologies.find((tech) => {
        const techName = tech.name.toLowerCase().replace(/[\s.-]/g, "");
        return techName === normalized || normalized.includes(techName) || techName.includes(normalized);
    });

    return found ? found.icon : null;
};

export default technologies;