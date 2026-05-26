<script lang="ts">
    const techs = [
        { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
        { name: "SvelteKIT", icon: "devicon-svelte-plain colored" },
        { name: "Next.js", icon: "devicon-nextjs-plain" },
        { name: "React", icon: "devicon-react-original colored" },
        { name: "Node.js", icon: "devicon-nodejs-plain colored" },
        { name: "Express.js", icon: "devicon-express-original" },
        { name: "TypeScript", icon: "devicon-typescript-plain colored" },
        { name: "JavaScript", icon: "devicon-javascript-plain colored" },
        { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
        { name: "TailwindCSS", icon: "devicon-tailwindcss-original colored" },
        { name: "Firebase", icon: "devicon-firebase-plain colored" },
        { name: "HTML5", icon: "devicon-html5-plain colored" },
        { name: "CSS3", icon: "devicon-css3-plain colored" },
        { name: "Figma", icon: "devicon-figma-plain colored" },
        { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
        { name: "Selenium", icon: "devicon-selenium-original colored" },
        { name: "SQL", icon: "devicon-sqlite-plain colored" },
        { name: "C#", icon: "devicon-csharp-plain colored" },
        { name: ".Net", icon: "devicon-dot-net-plain colored" },
        { name: "Java", icon: "devicon-java-plain colored" },
        { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
        { name: "Github", icon: "devicon-github-original" },
        { name: "SpringBoot", icon: "devicon-spring-plain colored" },
    ];
</script>

<svelte:head>
    <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
    />
</svelte:head>

<div class="absolute bottom-0 left-0 z-20 w-full lg:border-y border-border-color py-4 overflow-hidden lg:relative lg:bottom-auto lg:z-auto">
    <div class="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-black to-transparent z-10 pointer-events-none"></div>
    <div class="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-black to-transparent z-10 pointer-events-none"></div>

    <div class="flex overflow-hidden select-none">
        <div class="marquee-track flex gap-8 whitespace-nowrap">
            {#each [0, 1] as _}
                {#each techs as tech}
                    <div class="inline-flex items-center gap-3 px-5 py-2 border border-border-color bg-white/1 hover:bg-white/3 hover:border-brand-primary/30 transition-colors duration-300">
                        <span class="w-4 h-4 flex items-center justify-center">
                            <i class="{tech.icon} text-white/90 text-base"></i>
                        </span>

                        <span class="text-[10px] font-mono tracking-widest uppercase">
                            {tech.name}
                        </span>
                    </div>
                {/each}
            {/each}
        </div>
    </div>
</div>

<style>
    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .marquee-track {
        display: flex;
        width: max-content;
        animation: scroll 40s linear infinite;
    }

    /* Pause animation on hover */
    .marquee-track:hover {
        animation-play-state: paused;
    }
</style>