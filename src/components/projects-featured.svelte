<script lang="ts">
    import { type Project } from "$lib/projects";

    let { projects, onOpen } = $props<{
        projects: Project[];
        onOpen: (p: Project) => void;
    }>();

    // How far the incoming panel must have climbed the viewport before the one
    // beneath it starts receding. 1 = the instant it appears, 0 = fully covered.
    const COVER_AT = 0.5;

    let panelEls: (HTMLElement | undefined)[] = $state([]);
    let sentinelEls: (HTMLElement | undefined)[] = $state([]);

    // A panel has been covered once the panel *after* it has started climbing
    // into view, which is what makes it recede while the next one slides over.
    let reached: boolean[] = $state([]);
    let covered = $derived(projects.map((_: Project, i: number) => reached[i + 1] === true));

    $effect(() => {
        // The sentinels are the only things here that move with the document —
        // the panels themselves are sticky, so they sit still at the top of the
        // viewport and an observer watching them would never see the stack
        // advance. Each sentinel is parked at the flow position where its panel
        // begins, so it crosses the viewport exactly as that panel arrives.
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const i = sentinelEls.indexOf(entry.target as HTMLElement);
                    if (i === -1) continue;

                    // Not `isIntersecting`: a sentinel leaves through the top of
                    // the viewport long after its panel has taken over, and
                    // reading that as "no longer reached" would pop the panel
                    // below it back to full size. The fraction matters too —
                    // panels are a viewport tall and pinned at the top, so a
                    // sentinel entering at the bottom edge means the next panel
                    // has only just appeared. Waiting until it is halfway up is
                    // what makes the one below recede *as* it gets covered.
                    reached[i] =
                        entry.boundingClientRect.top < window.innerHeight * COVER_AT;
                }
            },
            // The root's bottom edge is pulled up to the same line the test
            // below compares against. A plain viewport root would only fire as
            // a sentinel entered or left the screen, never as it travelled up
            // through it — so the recede would be decided once, on entry, and
            // never again.
            {
                rootMargin: `0px 0px -${Math.round((1 - COVER_AT) * 100)}% 0px`,
                threshold: 0
            }
        );

        for (const el of sentinelEls) {
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    });
</script>

<div class="stack relative">
    {#each projects as _, i}
        <span class="sentinel" style="--i: {i}" bind:this={sentinelEls[i]} aria-hidden="true"></span>
    {/each}

    {#each projects as project, i (project.title)}
        <section class="panel" class:covered={covered[i]} bind:this={panelEls[i]}>
            <button
                type="button"
                onclick={() => onOpen(project)}
                class="card group flex flex-col w-full h-full max-w-6xl max-h-[36rem] mx-auto text-left border border-border-color bg-background overflow-hidden"
            >
                <!-- Index / year strip -->
                <div
                    class="flex items-center justify-between border-b border-border-color px-5 py-3 md:px-8 md:py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest"
                >
                    <span class="text-brand-primary">
                        {String(i + 1).padStart(2, "0")}
                        <span class="text-gray-600">/ {String(projects.length).padStart(2, "0")}</span>
                    </span>
                    {#if project.year}
                        <span class="text-gray-400">{project.year}</span>
                    {/if}
                </div>

                <div class="grid md:grid-cols-5 flex-1 min-h-0">
                    {#if project.images?.[0]}
                        <figure
                            class="relative overflow-hidden border-b md:border-b-0 md:border-r border-border-color shrink-0 md:shrink md:h-full aspect-video md:aspect-auto md:col-span-3"
                        >
                            <img
                                src={project.images[0]}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                            <div class="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500"></div>
                        </figure>
                    {/if}

                    <div class="flex flex-col justify-start md:justify-center gap-3 md:gap-4 p-5 md:p-8 min-h-0 overflow-hidden md:col-span-2">
                        <div>
                            <h3
                                class="text-2xl md:text-4xl font-light tracking-tighter text-white group-hover:text-brand-primary transition-colors duration-300"
                            >
                                {project.title}
                            </h3>
                            {#if project.role}
                                <p class="mt-1.5 font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-400">
                                    {project.role}
                                </p>
                            {/if}
                        </div>

                        <p class="text-xs md:text-sm text-gray-400 font-light leading-relaxed line-clamp-3">
                            {project.description}
                        </p>

                        {#if project.tech}
                            <div class="flex flex-wrap gap-1.5 md:gap-2">
                                {#each project.tech as t}
                                    <span
                                        class="text-[9px] font-mono border border-border-color px-2 py-0.5 text-gray-300 opacity-60 group-hover:opacity-100 transition-opacity"
                                    >
                                        {t}
                                    </span>
                                {/each}
                            </div>
                        {/if}

                        <span
                            class="mt-1 inline-flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-widest text-white"
                        >
                            View details
                            <span class="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                        </span>
                    </div>
                </div>
            </button>
        </section>
    {/each}
</div>

<style>
    .stack {
        /* Panel height and sentinel spacing are driven by the same value so the
           sentinels stay aligned to the flow position of their panel. */
        --panel-h: 100vh;
    }

    @supports (height: 100svh) {
        .stack {
            --panel-h: 100svh;
        }
    }

    /* Sibling sticky panels all pinned to the same offset: each one climbs the
       viewport and comes to rest on top of the one before it. */
    .panel {
        position: sticky;
        top: 0;
        height: var(--panel-h);
        display: flex;
        align-items: center;
        padding: 5rem 1rem 2rem;
    }

    .sentinel {
        position: absolute;
        left: 0;
        width: 1px;
        height: 1px;
        top: calc(var(--i) * var(--panel-h));
        pointer-events: none;
    }

    /* Transform and opacity only — the recede is composited, so stacking six
       full-viewport panels costs no layout and no repaint. */
    .card {
        transition:
            transform 600ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 600ms ease;
    }

    .panel.covered .card {
        transform: scale(0.93);
        opacity: 0.35;
    }

    @media (min-width: 768px) {
        .panel {
            padding: 6rem 2rem 3rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .card {
            transition: none;
        }

        .panel.covered .card {
            transform: none;
            opacity: 1;
        }
    }
</style>
