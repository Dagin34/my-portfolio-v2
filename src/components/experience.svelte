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
        let resyncTimer: ReturnType<typeof setTimeout>;
        let lastCurrent = -1;
        let ticking = false;

        // Document-relative offsets, read from the DOM only on mount/resize/regrow —
        // never on scroll, so a scroll tick is pure arithmetic instead of the forced
        // layout reads (getBoundingClientRect on every row) that were causing the jank.
        let railTop = 0;
        let railHeight = 1;
        let rowOffsets: { top: number; bottom: number }[] = [];

        function measure() {
            if (!railEl) return;
            const railRect = railEl.getBoundingClientRect();
            railTop = railRect.top + window.scrollY;
            railHeight = railRect.height || 1;

            rowOffsets = rowEls.map((el) => {
                if (!el) return { top: 0, bottom: 0 };
                const rect = el.getBoundingClientRect();
                const top = rect.top + window.scrollY - railTop;
                return { top, bottom: top + rect.height };
            });
        }

        function apply() {
            const glowY = window.scrollY + window.innerHeight / 2 - railTop;

            progress = Math.min(1, Math.max(0, glowY / railHeight));
            glowOffset = Math.min(railHeight, Math.max(0, glowY));

            let current = -1;
            rowStates = rowOffsets.map((row, i) => {
                if (glowY < row.top) return "pending";
                if (glowY > row.bottom) return "done";
                current = i;
                return "current";
            });

            // The active row grows (see .is-current below), which shifts every
            // row after it — remeasure once that layout shift settles.
            if (current !== lastCurrent) {
                lastCurrent = current;
                clearTimeout(resyncTimer);
                resyncTimer = setTimeout(() => {
                    measure();
                    apply();
                }, 850);
            }
        }

        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                apply();
                ticking = false;
            });
        }

        function onResize() {
            measure();
            apply();
        }

        measure();
        apply();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            clearTimeout(resyncTimer);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
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
        <div bind:this={railEl} class="absolute inset-y-0 left-0 z-20 w-px bg-border-color" aria-hidden="true">
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
                class="exp-row group relative px-8 md:px-16 border-b border-border-color hover:bg-white/1 hover:backdrop-blur-sm"
                class:is-current={rowStates[i] === "current"}
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

    /* The row currently centred in the viewport grows on the y-axis and pushes
       its neighbours down the page, pulling attention to itself as you scroll.
       Naming the properties (instead of `transition-all`) keeps the browser from
       having to watch every animatable property while this is running. */
    .exp-row {
        padding-top: 2rem;
        padding-bottom: 2rem;
        transition: padding 800ms ease, background-color 800ms ease, backdrop-filter 800ms ease;
    }

    .exp-row.is-current {
        padding-top: 3.5rem;
        padding-bottom: 3.5rem;
    }

    @media (min-width: 768px) {
        .exp-row {
            padding-top: 4rem;
            padding-bottom: 4rem;
        }

        .exp-row.is-current {
            padding-top: 7rem;
            padding-bottom: 7rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .rail-fill,
        .rail-glow,
        .row-marker,
        .exp-row {
            transition: none;
        }
    }
</style>