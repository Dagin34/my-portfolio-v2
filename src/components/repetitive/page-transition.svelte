<script lang="ts">
    import { onMount } from "svelte";
    import { onNavigate } from "$app/navigation";
    import {
        createParticleMark,
        fontSizeFor,
        measureMark,
        type Phase,
        type Trajectory
    } from "$lib/particle-mark";
    import { scrollToHash } from "$lib/lenis";

    /**
     * Route transition: the "DNB" mark streams in from the leading edge of
     * travel, holds while the new route mounts behind it, then comes apart
     * toward the opposite edge.
     *
     * The phases deliberately overlap. The backdrop is already sliding up
     * before the dust arrives, and it starts clearing while the dust is still
     * dispersing, so the incoming page is revealed *through* the particles
     * rather than after they settle. Discrete, non-overlapping steps are what
     * make a transition read as a loading screen.
     */
    const COVER_MS = 350; // Backdrop sweeps up over the outgoing page
    const PARTICLE_IN_DELAY = 150; // Dust starts moving before the cover lands
    const PARTICLE_IN_MS = 450;
    const HOLD_MS = 180; // Assembled beat — the route swap happens in here
    const PARTICLE_OUT_MS = 520;
    const REVEAL_OFFSET = 140; // Into the dispersal before the backdrop leaves
    const REVEAL_MS = 450;

    // The same curve the intro loader exits on, so the transition and the
    // loader read as the same gesture at different granularities.
    const EASE = "cubic-bezier(0.85, 0, 0.15, 1)";

    let canvas: HTMLCanvasElement;

    let backdropY = $state("100%");
    let backdropMs = $state(0);
    let backdropOpacity = $state(1);
    let active = $state(false);

    let mark: ReturnType<typeof createParticleMark> | null = null;
    let fieldWidth = 0;
    let fieldHeight = 0;
    let frame = 0;
    let reduceMotion = false;
    // Bumped per navigation. A transition that gets interrupted has to abandon
    // its continuations rather than reset an overlay the next one is now using.
    let runId = 0;

    const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    /** Waits for the browser to have laid out and painted whatever just mounted. */
    const nextFrame = () =>
        new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

    /**
     * A wide band well beyond one viewport edge, scattered over the full height.
     * Spreading particles across a band rather than a line is what makes the
     * mark read as dust sweeping across the screen instead of a jet fired from
     * a single point.
     */
    function edgeTrajectory(side: "left" | "right"): Trajectory {
        const anchor = side === "left" ? -0.35 * fieldWidth : 1.35 * fieldWidth;
        const spread = fieldWidth * 0.5;
        return () => ({
            x: anchor + (Math.random() - 0.5) * spread,
            y: Math.random() * fieldHeight
        });
    }

    /** Samples the glyphs for the current viewport. Expensive — resize only. */
    function buildMark(): void {
        if (!mark) return;

        fieldWidth = window.innerWidth;
        fieldHeight = window.innerHeight;

        const fontSize = fontSizeFor(fieldWidth);
        const metrics = measureMark(fontSize);
        if (!metrics) return;

        mark.build({
            fontSize,
            width: fieldWidth,
            height: fieldHeight,
            originX: (fieldWidth - metrics.width) / 2,
            originY: (fieldHeight - metrics.height) / 2,
            enter: edgeTrajectory("left"),
            exit: edgeTrajectory("right"),
            stagger: 0.35
        });
    }

    function tween(duration: number, phase: Phase, alive: () => boolean): Promise<void> {
        return new Promise((resolve) => {
            const startedAt = performance.now();
            function tick(now: number) {
                // Superseded: stop drawing, and resolve so nothing downstream
                // is left waiting on a run that no longer owns the overlay.
                if (!alive()) return resolve();

                const t = Math.min(1, (now - startedAt) / duration);
                mark?.render(t, phase);
                if (t < 1) {
                    frame = requestAnimationFrame(tick);
                } else {
                    resolve();
                }
            }
            frame = requestAnimationFrame(tick);
        });
    }

    function reset(): void {
        cancelAnimationFrame(frame);
        mark?.clear();
        backdropMs = 0;
        backdropY = "100%";
        backdropOpacity = 1;
        active = false;
    }

    onMount(() => {
        reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        mark = createParticleMark(canvas);

        let resizeTimer: ReturnType<typeof setTimeout>;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(buildMark, 200);
        };

        // Sampling before Poppins arrives would rasterise the fallback face
        document.fonts
            .load("900 100px Poppins")
            .catch(() => {})
            .then(() => {
                buildMark();
                window.addEventListener("resize", onResize, { passive: true });
            });

        return () => {
            clearTimeout(resizeTimer);
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResize);
        };
    });

    onNavigate((navigation) => {
        const to = navigation.to?.url.pathname;
        const from = navigation.from?.url.pathname;

        // In-page anchors (`/#projects`) and reloads keep the same route — there
        // is nothing to cover, and covering it would just interrupt the scroll.
        if (!to || to === from) return;

        // A second navigation mid-transition takes over the current one.
        cancelAnimationFrame(frame);
        const run = ++runId;
        const alive = () => run === runId;
        active = true;

        const particles = !reduceMotion && mark?.built;
        // Motion runs with the direction of travel: out to the projects page
        // sweeps left-to-right, back home sweeps right-to-left.
        const forward = to.startsWith("/projects");

        if (particles) {
            mark?.retarget(
                edgeTrajectory(forward ? "left" : "right"),
                edgeTrajectory(forward ? "right" : "left")
            );
            mark?.render(0, "enter");
        }

        if (reduceMotion) {
            backdropMs = 0;
            backdropY = "0%";
            backdropOpacity = 0;
            // Let the zero-duration placement paint before the fade starts,
            // otherwise the two collapse into one instant jump.
            requestAnimationFrame(() => {
                backdropMs = 180;
                backdropOpacity = 1;
            });
        } else {
            backdropY = "0%";
            backdropMs = COVER_MS;
        }

        const covered = reduceMotion
            ? delay(200)
            : particles
              ? delay(PARTICLE_IN_DELAY).then(() => tween(PARTICLE_IN_MS, "enter", alive))
              : delay(COVER_MS);

        return new Promise<void>((resolve) => {
            covered.then(() => {
                // Handing control back here is what lets SvelteKit swap the DOM.
                // It happens on the assembled beat, while the particles are
                // stationary and the draw loop is at its most forgiving of the
                // dropped frame that hydrating the new route can cost.
                resolve();

                navigation.complete
                    .then(async () => {
                        if (!alive()) return;

                        // Resetting scroll while covered is the whole point of
                        // holding here — but an anchored link still has to land
                        // on its section rather than the top of the page.
                        scrollToHash(navigation.to?.url.hash, { immediate: true });
                        await nextFrame();
                        if (!alive()) return;

                        if (reduceMotion) {
                            backdropMs = 180;
                            backdropOpacity = 0;
                            await delay(180);
                            if (alive()) reset();
                            return;
                        }

                        await delay(HOLD_MS);
                        if (!alive()) return;

                        const dispersal = particles
                            ? tween(PARTICLE_OUT_MS, "exit", alive)
                            : Promise.resolve();
                        const uncover = delay(REVEAL_OFFSET).then(() => {
                            if (!alive()) return;
                            backdropY = "-100%";
                            backdropMs = REVEAL_MS;
                            return delay(REVEAL_MS);
                        });

                        await Promise.all([dispersal, uncover]);
                        if (alive()) reset();
                    })
                    // An aborted or failed navigation must not strand the
                    // overlay covering a page the visitor can still see — but a
                    // navigation superseded by a newer one is not ours to clear.
                    .catch(() => {
                        if (alive()) reset();
                    });
            });
        });
    });
</script>

<!-- Sits below the custom cursor (z-9999) so the pointer stays visible while
     the overlay is up, and below the toast (z-10001). -->
<div
    aria-hidden="true"
    class="fixed inset-0 z-9000 overflow-hidden {active
        ? 'pointer-events-auto'
        : 'pointer-events-none'}"
>
    <div
        class="absolute inset-0 bg-background will-change-transform"
        style="transform: translateY({backdropY}); opacity: {backdropOpacity}; transition: transform {backdropMs}ms {EASE}, opacity {backdropMs}ms linear;"
    ></div>

    <canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
</div>
