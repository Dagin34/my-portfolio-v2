<script lang='ts'>
    import { onMount, tick } from 'svelte';
    import navLinks from '$lib/navigation';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { spring } from 'svelte/motion';
    import { scrollToHash } from '$lib/lenis';
    import { magnetic } from '$lib/magnetic';

    let scrolled = $state(false);
    let mobileMenuOpen = $state(false);

    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 20;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    });

    function handleNavigation(link: string) {
        const isNotRoot = page.url.pathname === '/projects';

        if (link.startsWith('/#')) {
            if (!isNotRoot) {
                // Already home — glide to the section. Lenis owns the viewport,
                // so scrollIntoView here would be fighting it for the same pixels.
                scrollToHash(link.slice(1));
            } else {
                goto(link);
            }
        } else if (link.startsWith('/')) {
            // The page transition resets scroll itself, while it is covering.
            goto(link);
        }
    }

    // ---- Scrollspy: which nav link corresponds to what's on screen ----
    //
    // A single IntersectionObserver watches every section id a nav link
    // points at, plus #home (which has no link of its own — it's what clears
    // the active state at the top of the page). The band it watches is
    // pinned just under the fixed bar rather than the viewport's true centre:
    // sections here range from a couple hundred pixels (Skills) to many
    // screens tall (Experience, Projects), so "whichever section occupies
    // the strip right below the bar" is a more honest reading of "what
    // you're looking at" than a centre band would be for content this size.
    const sectionIds = navLinks
        .map((link) => (link.href.startsWith('/#') ? link.href.slice(2) : null))
        .filter((id): id is string => id !== null);

    // The actual top-to-bottom order of these ids in +page.svelte — not nav
    // order, which differs (Services and Skills are swapped). This is what
    // breaks ties when more than one section overlaps the band at once,
    // which is routine: Experience and Projects sit right next to each
    // other, so both can graze the band for a stretch as one hands off to
    // the other. Keep this in sync with +page.svelte's section order.
    const documentOrder = ['home', 'experience', 'projects', 'skills', 'services', 'contact'];

    let activeId: string | null = $state(null);

    // The "Projects" nav link points at the dedicated /projects route
    // (href="/projects"), not a homepage hash — but the homepage also has
    // its own #projects section (a preview of the same content), which the
    // observer below watches like any other section. Without this, scrolling
    // through that section on `/` would derive an href of "/#projects",
    // which matches no nav link at all and the indicator would just vanish.
    const sectionToHref: Record<string, string> = { projects: '/projects' };

    // On /projects there is no #experience/#skills/etc. to observe — the
    // route is its own destination, not a section of the homepage — so it's
    // matched by path instead of by the observer below.
    let activeHref = $derived(
        page.url.pathname === '/projects'
            ? '/projects'
            : activeId
              ? (sectionToHref[activeId] ?? `/#${activeId}`)
              : null
    );

    $effect(() => {
        // Re-runs whenever the route changes: SvelteKit destroys and
        // recreates the homepage's section elements on every navigation to
        // or from `/`, so an observer built once at mount would end up
        // watching detached nodes the moment you left and came back.
        // `page.url.pathname` is a reactive read, so this effect re-fires
        // right as that swap happens.
        void page.url.pathname;

        let cancelled = false;
        let observer: IntersectionObserver | undefined;

        // Collapse the indicator immediately rather than leaving it pointed
        // at a section that may no longer exist on the new route; the
        // observer re-establishes the real value as soon as it attaches.
        activeId = null;

        // The set of ids *currently* overlapping the band, kept up to date by
        // every entering/leaving event. Deriving activeId from this set on
        // every callback — rather than just setting it on whatever entry
        // most recently entered — is what keeps this correct when Experience
        // and Projects briefly overlap during the handoff: an out-of-order
        // pair of events (a stale "entering" arriving after the real one, as
        // can happen with momentum scrolling reversing direction, or the
        // occasional layout shift from the experience row growth) can't
        // leave activeId stuck on the wrong section, because it's always
        // recomputed from the full current set rather than trusting whichever
        // single event happened to arrive last.
        const intersecting = new Set<string>();

        (async () => {
            await tick();
            if (cancelled) return;

            const targets = documentOrder
                .map((id) => document.getElementById(id))
                .filter((el): el is HTMLElement => el !== null);

            if (targets.length === 0) return;

            observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) intersecting.add(entry.target.id);
                        else intersecting.delete(entry.target.id);
                    }

                    // Furthest down the page wins: once the next section has
                    // genuinely arrived, it should take over even while the
                    // previous one still grazes the band on its way out.
                    for (let i = documentOrder.length - 1; i >= 0; i--) {
                        const id = documentOrder[i];
                        if (!intersecting.has(id)) continue;
                        activeId = id === 'home' ? null : id;
                        break;
                    }
                },
                { rootMargin: '-120px 0px -55% 0px', threshold: 0 }
            );

            for (const el of targets) observer.observe(el);
        })();

        return () => {
            cancelled = true;
            observer?.disconnect();
        };
    });

    // ---- Sliding active-link indicator ----
    //
    // One shared pill, measured off the DOM and driven by a spring (the same
    // primitive the custom cursor uses) rather than a CSS transition on each
    // link — that's what lets it glide *between* links instead of just
    // fading one out and another in.
    let listEl: HTMLUListElement | undefined = $state();
    let linkEls: (HTMLButtonElement | undefined)[] = $state([]);
    let indicator = spring({ x: 0, width: 0 }, { stiffness: 0.2, damping: 0.7 });

    function updateIndicator() {
        if (!listEl) return;
        const idx = navLinks.findIndex((link) => link.href === activeHref);
        const target = idx === -1 ? undefined : linkEls[idx];

        if (!target) {
            // Leave x where it is and only collapse the width, so a link
            // going inactive shrinks away rather than jumping to the origin.
            indicator.update((prev) => ({ ...prev, width: 0 }));
            return;
        }

        const listRect = listEl.getBoundingClientRect();
        const elRect = target.getBoundingClientRect();
        indicator.set({ x: elRect.left - listRect.left, width: elRect.width });
    }

    $effect(() => {
        // Reruns on either dependency: the active section, or the scrolled/
        // unscrolled chrome swap (which nudges link positions slightly as
        // the bar's own padding changes).
        activeHref;
        scrolled;
        updateIndicator();
    });

    onMount(() => {
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    });

    function toggleMenu() {
        mobileMenuOpen = !mobileMenuOpen;
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    }

    function closeMenu() {
        mobileMenuOpen = false;
        document.body.style.overflow = "";
    }
</script>

<!-- Floating Wrapper -->
<div
    class="fixed top-0 left-0 w-full z-100 transition-all duration-500 ease-in-out flex justify-center pointer-events-none
    {scrolled ? 'pt-4 px-4' : 'pt-0 px-0'}"
>
    <nav
        class="w-full transition-all duration-500 ease-in-out pointer-events-auto
        {scrolled
            ? 'max-w-5xl bg-white/6 backdrop-blur-xs border-2 border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.15)] px-8 py-4'
            : 'max-w-7xl bg-background/0 border-b border-border-color/10 px-8 py-5 md:py-6'}"
    >
        <div class="flex items-center justify-between">
            <a
                href="/"
                onclick={closeMenu}
                class="group flex items-center text-xl md:text-2xl font-semibold tracking-tighter relative z-120 transition-transform duration-300 active:scale-95"
            >
                <span
                    class="text-white group-hover:text-brand-primary transition-colors duration-300 ease-out"
                    >Dagmawi</span
                >
                <span
                    class="text-brand-primary group-hover:text-white transition-colors duration-300 ease-out"
                    >{".et"}</span
                >
            </a>

            <ul bind:this={listEl} class="hidden md:flex items-center gap-2 relative">
                <!-- Sliding "you are here" pill: transform + width only, driven
                     by the spring above, so it costs no layout of its own. -->
                <div
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-y-0 left-0 border border-brand-primary/60 bg-brand-primary/10 transition-opacity duration-300 will-change-transform"
                    class:opacity-0={activeHref === null}
                    style="transform: translate3d({$indicator.x}px, 0, 0); width: {$indicator.width}px;"
                ></div>

                {#each navLinks as link, i}
                    <li class="relative z-10">
                        <button
                            bind:this={linkEls[i]}
                            use:magnetic
                            onclick={() => handleNavigation(link.href)}
                            class="relative px-4 py-1.5 text-sm font-medium border border-transparent
                                   text-white/80 hover:text-white hover:border-brand-primary/80 hover:bg-brand-primary/20
                                   transition-colors duration-300 ease-out group flex items-center"
                            class:text-white={activeHref === link.href}
                        >
                            <span class="text-[10px] font-mono opacity-40 mr-1.5 transition-opacity duration-300 group-hover:opacity-75">{link.id}.</span>
                            {link.label}
                    </button>
                    </li>
                {/each}
            </ul>

            <!-- Mobile Menu Trigger -->
            <button
                onclick={toggleMenu}
                class="md:hidden relative z-120 p-2 text-white focus:outline-none group"
                aria-label="Toggle Menu"
            >
                <div class="w-6 h-5 relative flex flex-col justify-between">
                    <span
                        class="w-full h-px bg-white transition-all duration-300 {mobileMenuOpen
                            ? 'rotate-45 translate-y-2.25'
                            : 'group-hover:-translate-y-px'}"
                    ></span>
                    <span
                        class="w-full h-px bg-white transition-all duration-300 {mobileMenuOpen
                            ? 'opacity-0'
                            : 'group-hover:opacity-80'}"
                    ></span>
                    <span
                        class="w-full h-px bg-white transition-all duration-300 {mobileMenuOpen
                            ? '-rotate-45 -translate-y-2.5'
                            : 'group-hover:translate-y-px'}"
                    ></span>
                </div>
            </button>
        </div>
    </nav>
</div>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
    <div
        role="presentation"
        onclick={closeMenu}
        class="fixed inset-0 z-110 bg-background flex flex-col justify-center items-center md:hidden"
    >
        <div class="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div
                class="absolute left-1/4 top-0 h-full w-px bg-border-color"
            ></div>
            <div
                class="absolute right-1/4 top-0 h-full w-px bg-border-color"
            ></div>
            <div class="absolute inset-0 separator-pattern"></div>
        </div>

        <!-- Mobile Navigation Items (Translates right slightly on hover) -->
        <ul
            role="presentation"
            onclick={(e) => e.stopPropagation()}
            class="relative z-120 flex flex-col items-start gap-8 px-6 w-full max-w-xs"
        >
            {#each navLinks as link, i}
                <li class="overflow-hidden w-full">
                    <a
                        href={link.href}
                        onclick={closeMenu}
                        class="group flex items-baseline text-4xl sm:text-5xl font-light tracking-tighter text-white/70 hover:text-white transition-all duration-300 ease-out transform hover:translate-x-3"
                    >
                        <span
                            class="text-xs sm:text-sm font-mono text-brand-primary opacity-40 mr-4 transition-all duration-300 group-hover:opacity-100"
                            >0{i + 1}.</span
                        >
                        {link.label}
                    </a>
                </li>
            {/each}
        </ul>

        <div
            role="presentation"
            onclick={(e) => e.stopPropagation()}
            class="absolute bottom-12 flex gap-8 opacity-60 text-[10px] font-mono uppercase tracking-widest z-120"
        >
            <a
                href="https://github.com/dagin34"
                target="_blank"
                rel="noreferrer"
                class="hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >Github</a
            >
            <a
                href="https://linkedin.com/in/dagin34"
                target="_blank"
                rel="noreferrer"
                class="hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >LinkedIn</a
            >
            <a
                href="mailto:dagmawinapoleon02@gmail.com"
                class="hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >Email</a
            >
        </div>
    </div>
{/if}