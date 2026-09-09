<script lang="ts">
    import experiences from "$lib/experience";
    import { onMount } from "svelte";

    let railEl: HTMLDivElement;
    let rowEls: (HTMLDivElement | undefined)[] = $state([]);

    // How far the "glow" (pinned to viewport centre) has travelled down the
    // rail, as a 0-1 fraction of the rail's own height.
    let progress = $state(0);
    // Pixel offset of the glow within the rail, for positioning it directly.
    let glowOffset = $state(0);
    // Per-row state relative to the glow: not yet reached, currently being
    // passed, or already scrolled by — this is what "strengthens" each entry.
    let rowStates: ("pending" | "current" | "done")[] = $state([]);

    onMount(() => {
        function update() {
            if (!railEl) return;
            const railRect = railEl.getBoundingClientRect();
            const railHeight = railRect.height || 1;
            const glowY = window.innerHeight / 2 - railRect.top;

            progress = Math.min(1, Math.max(0, glowY / railHeight));
            glowOffset = Math.min(railHeight, Math.max(0, glowY));

            rowStates = rowEls.map((el) => {
                if (!el) return "pending";
                const rect = el.getBoundingClientRect();
                if (glowY < rect.top - railRect.top) return "pending";
                if (glowY > rect.bottom - railRect.top) return "done";
                return "current";
            });
        }

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    });
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

    <div class="relative w-full md:w-2/3">
        <!-- Progress rail: fills and glows down as you scroll through the list below,
             tracking whatever row currently sits at the vertical centre of the viewport. -->
        <div bind:this={railEl} class="absolute inset-y-0 left-0 w-px bg-border-color" aria-hidden="true">
            <div
                class="rail-fill absolute top-0 left-0 w-px bg-brand-primary/40"
                style="height: {progress * 100}%"
            ></div>
            <div
                class="rail-glow absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary shadow-[0_0_14px_4px_rgba(255,105,0,0.75)]"
                style="top: {glowOffset}px"
            ></div>
        </div>

        {#each experiences as exp, i}
            <div
                bind:this={rowEls[i]}
                class="group relative p-8 md:p-16 border-b border-border-color hover:bg-white/1 hover:backdrop-blur-2xl transition-all duration-800"
            >
                <div
                    class="absolute right-0 top-0 h-full w-24 opacity-0 group-hover:opacity-10 transition-opacity overflow-hidden pointer-events-none"
                >
                    <div
                        class="absolute inset-0 separator-pattern scale-150"
                    ></div>
                </div>

                <!-- Row marker: dims when not yet reached, strengthens while the glow
                     is passing through this entry, and stays lit once scrolled by. -->
                <div
                    class="row-marker absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 {rowStates[i] ===
                    'current'
                        ? 'scale-150 bg-brand-primary shadow-[0_0_10px_3px_rgba(255,105,0,0.7)]'
                        : rowStates[i] === 'done'
                          ? 'bg-brand-primary/50'
                          : 'bg-gray-700'}"
                    aria-hidden="true"
                ></div>

                <div class="relative z-10">
                    <div class="flex flex-wrap items-center gap-x-2 text-xs font-mono mb-2 uppercase">
                        <span class="text-brand-primary opacity-50">{exp.period}</span>
                        <span class="text-gray-600">/</span>
                        <span class="text-gray-400 text-[10px] tracking-wider">{exp.type}</span>
                        <span class="text-gray-600">/</span>
                        <span class="text-gray-400 text-[10px] tracking-wider">{exp.location}</span>
                    </div>

                    <h1
                        class="text-xl md:text-3xl font-light text-white group-hover:translate-x-2 transition-transform duration-300"
                    >
                        {exp.role} <span class="text-gray-500">@</span>
                        {exp.company}
                    </h1>

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

<style>
    .rail-fill,
    .rail-glow {
        transition: top 150ms ease-out, height 150ms ease-out;
    }

    @media (prefers-reduced-motion: reduce) {
        .rail-fill,
        .rail-glow,
        .row-marker {
            transition: none;
        }
    }
</style>