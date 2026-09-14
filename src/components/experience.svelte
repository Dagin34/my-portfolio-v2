<script lang="ts">
    import experiences from "$lib/experience";
    import { onMount } from "svelte";

    let rowEls: (HTMLDivElement | undefined)[] = $state([]);

    // Where each row sits relative to the middle of the viewport: not yet
    // reached, currently crossing it, or already scrolled past. Only "current"
    // drives the growth; "pending" holds a row back at a lower opacity so the
    // active one reads as swelling up out of the stack.
    let rowStates: ("pending" | "current" | "done")[] = $state([]);

    onMount(() => {
        // A zero-height root band pinned to the vertical centre of the viewport:
        // a row intersects it exactly while it is the one centred on screen.
        // This replaces the old scroll handler outright — nothing runs per
        // frame, no geometry is read on scroll, and the observer re-evaluates
        // itself when a growing row shifts the rows below it, so the timed
        // remeasure that used to chase that layout shift is gone too.
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const i = rowEls.indexOf(entry.target as HTMLDivElement);
                    if (i === -1) continue;

                    rowStates[i] = entry.isIntersecting
                        ? "current"
                        : entry.boundingClientRect.top > window.innerHeight / 2
                          ? "pending"
                          : "done";
                }
            },
            { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
        );

        for (const el of rowEls) {
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
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
        {#each experiences as exp, i}
            <div
                bind:this={rowEls[i]}
                class="exp-row group relative px-8 md:px-16 border-b border-border-color hover:bg-white/1 hover:backdrop-blur-sm"
                class:is-current={rowStates[i] === "current"}
                class:is-pending={rowStates[i] === "pending"}
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
    /* The row crossing the middle of the viewport expands, pushing its
       neighbours down the page. With the progress rail gone this is the only
       cue for where you are in the list, so it swings roughly twice as far as
       it used to, on a long decelerating curve that reads as the entry
       unfolding rather than resizing. Rows it has not reached yet hang back
       dimmed, which makes the active one feel like it is rising out of the
       stack rather than merely getting taller.
       Naming the properties (instead of `transition-all`) keeps the browser
       from watching every animatable property while this runs. */
    .exp-row {
        padding-top: 2rem;
        padding-bottom: 2rem;
        transition:
            padding 800ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 600ms ease,
            background-color 600ms ease,
            backdrop-filter 600ms ease;
    }

    .exp-row.is-pending {
        opacity: 0.45;
    }

    .exp-row.is-current {
        padding-top: 4.5rem;
        padding-bottom: 4.5rem;
        background-color: rgba(255, 255, 255, 0.025);
    }

    @media (min-width: 768px) {
        .exp-row {
            padding-top: 3.5rem;
            padding-bottom: 3.5rem;
        }

        .exp-row.is-current {
            padding-top: 8rem;
            padding-bottom: 8rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .exp-row {
            transition: none;
        }

        .exp-row.is-pending {
            opacity: 1;
        }
    }
</style>
