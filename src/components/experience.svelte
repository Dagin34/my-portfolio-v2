<script lang="ts">
    import experiences from "$lib/experience";
</script>

<section
    id="experience"
    class="relative min-h-screen border-t border-border-color flex flex-col md:flex-row"
>
    <div class="w-full md:w-1/3 p-8 md:p-12 md:sticky md:top-20 md:h-fit">
        <p
            class="text-brand-primary font-mono text-sm mb-4 tracking-widest uppercase"
        >
            01. Career Path
        </p>
        <h2
            class="text-3xl md:text-5xl font-light tracking-tighter text-white leading-tight"
        >
            Work <br /> <span class="opacity-40 italic">History</span>
        </h2>

        <div class="mt-8 h-px w-20 bg-brand-primary opacity-50"></div>
        <p
            class="mt-8 text-xs md:text-sm text-gray-400 font-light leading-relaxed max-w-xs"
        >
            My journey through the Ethiopian tech landscape, from founding
            startups to scaling enterprise systems.
        </p>
    </div>

    <div class="w-full md:w-2/3 border-l border-border-color">
        {#each experiences as exp, i}
            <div
                class="group relative p-8 md:p-16 border-b border-border-color hover:bg-white/1 hover:backdrop-blur-2xl transition-all duration-800"
            >
                <div
                    class="absolute right-0 top-0 h-full w-24 opacity-0 group-hover:opacity-10 transition-opacity overflow-hidden pointer-events-none"
                >
                    <div
                        class="absolute inset-0 separator-pattern scale-150"
                    ></div>
                </div>

                <div class="relative z-10">
                    <div class="flex flex-wrap items-center gap-x-2 text-xs font-mono mb-2 uppercase">
                        <span class="text-brand-primary opacity-50">{exp.period}</span>
                        <span class="text-gray-600">/</span>
                        <span class="text-gray-400 text-[10px] tracking-wider">{exp.type}</span>
                        <span class="text-gray-600">/</span>
                        <span class="text-gray-400 text-[10px] tracking-wider">{exp.location}</span>
                    </div>

                    <h3
                        class="text-xl md:text-3xl font-light text-white group-hover:translate-x-2 transition-transform duration-300"
                    >
                        {exp.role} <span class="text-gray-500">@</span>
                        {exp.company}
                    </h3>

                    <p
                        class="text-xs md:text-sm mt-4 text-gray-400 font-light leading-5 md:leading-7 max-w-xl"
                    >
                        {exp.description}
                    </p>

                    <div class="mt-6 flex flex-wrap gap-2">
                        {#each exp.skills as skill}
                            <span
                                class="px-3 py-1 text-[8px] md:text-[10px] font-mono border border-border-color bg-white/5 text-gray-300 uppercase tracking-wider"
                            >
                                {skill}
                            </span>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}

        <a
            href="/resume.pdf"
            class="flex items-center justify-between p-12 group hover:bg-brand-primary transition-all duration-500"
        >
            <span class="text-xl md:text-2xl font-light">View Full Resume</span>
            <span
                class="text-4xl group-hover:translate-x-4 transition-transform"
                >→</span
            >
        </a>
    </div>
</section>