<script lang="ts">
    import { onMount } from "svelte";

    interface Layout {
        // Smallest container width this break applies to, widest first
        minWidth: number;
        // Rendered as one particle field per line, stacked tightly
        lines: string[];
    }

    interface Props {
        // The name re-breaks as the column narrows, so the type stays as large as it can
        layouts?: Layout[];
        // Ceiling on the fitted type size, so a wide column cannot run away with the layout
        maxFontSize?: number;
        // Heading level for the accessible name — the canvas is hidden from assistive tech
        heading?: "h1" | "h2";
        // Accessible/SEO text
        label?: string;
    }

    let {
        layouts = [
            { minWidth: 720, lines: ["Dagmawi Napoleon Bogale"] },
            { minWidth: 450, lines: ["Dagmawi Napoleon", "Bogale"] },
            { minWidth: 0, lines: ["Dagmawi", "Napoleon", "Bogale"] },
            // { minWidth: 720, lines: ["DAGMAWI NAPOLEON BOGALE"] },
            // { minWidth: 450, lines: ["DAGMAWI NAPOLEON", "BOGALE"] },
            // { minWidth: 0, lines: ["DAGMAWI", "NAPOLEON", "BOGALE"] }
        ],
        maxFontSize = 180,
        heading = "h2",
        label = "Dagmawi Napoleon Bogale",
        // label = "DAGMAWI Napoleon BOGALE"
    }: Props = $props();

    let wrapper: HTMLDivElement;
    let canvas: HTMLCanvasElement;

    interface Particle {
        hx: number;   // Home position the particle always springs back to
        hy: number;
        x: number;
        y: number;
        vx: number;
        vy: number;
        wobble: number; // Per-particle angular offset, turns a clean ring into a cloud
        delay: number;  // Staggers the intro sweep from left to right
    }

    // Physics tuning — deliberately slow to settle so the trail lingers behind the cursor
    const FORCE = 2.6;
    const SPRING = 0.042;
    const FRICTION = 0.86;

    // Negative tracking, matching the `tracking-tighter` headings used across the site
    const TRACKING = 0.03;

    /** Width of a line once the manual tracking above is applied. */
    function lineWidth(context: CanvasRenderingContext2D, line: string, fontSize: number): number {
        context.font = `800 ${fontSize}px Poppins, sans-serif`;
        let total = 0;
        for (const char of line) {
            total += context.measureText(char).width - fontSize * TRACKING;
        }
        return total + fontSize * TRACKING;
    }

    // Displaced particles are tinted toward the brand orange in a few discrete steps,
    // so the whole field can be painted with a handful of fillStyle changes per frame.
    const TINTS = ["#ffffff", "#ffd9bd", "#ffb782", "#ff934a", "#ff6900"];

    onMount(() => {
        const context = canvas.getContext("2d");
        if (!context) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let particles: Particle[] = [];
        let width = 0;
        let height = 0;
        let radius = 120;
        let dotSize = 3;
        let frame = 0;
        let started = 0;
        let running = false;
        // The reveal is spent once: a later rebuild (a real resize) must not replay it
        let introPending = !reduceMotion;
        let revealed = reduceMotion;

        // Pointer is parked far off-canvas until it actually enters the field
        let pointerX = -9999;
        let pointerY = -9999;

        /**
         * Rasterises the name into an offscreen canvas, then samples that bitmap on a
         * fixed grid to place one particle per opaque cell.
         */
        function build() {
            const rect = wrapper.getBoundingClientRect();
            if (rect.width === 0) return;

            // Widest break the column can still hold: one line on a desktop column,
            // stacking down to three as it narrows
            const lines = (layouts.find((l) => rect.width >= l.minWidth) ?? layouts[layouts.length - 1]).lines;

            // Size the type to the container instead of guessing at breakpoints,
            // so the name always fills its column without ever overflowing it.
            const measure = document.createElement("canvas").getContext("2d");
            if (!measure) return;

            // Widest line by measured width, not character count — "Dagmawi" outruns "Napoleon"
            const ratio = Math.max(...lines.map((line) => lineWidth(measure, line, 100) / 100));
            const fontSize = Math.min(rect.width / ratio, maxFontSize);

            // Slightly tight leading, so a stacked wordmark reads as one block
            const lineHeight = fontSize * 1.5;
            width = rect.width;
            height = Math.round(lineHeight * lines.length + fontSize * 0);

            // Pitch tracks the type size so the grain reads identically at every viewport
            const step = Math.max(2, Math.min(4, Math.round(fontSize / 38)));
            // Constant fill ratio, so the grain keeps its weight on small screens too
            dotSize = step * 0.6;
            radius = Math.max(70, fontSize * 0.85);
            const scatter = fontSize * 0.6;

            const source = document.createElement("canvas");
            source.width = Math.ceil(width);
            source.height = height;
            const sourceContext = source.getContext("2d", { willReadFrequently: true });
            if (!sourceContext) return;

            sourceContext.fillStyle = "#fff";
            sourceContext.font = `700 ${fontSize}px 'Poppins', sans-serif`;
            sourceContext.textBaseline = "middle";
            lines.forEach((line, index) => {
                let cursor = 0;
                const y = lineHeight * (index + 0.5) + fontSize * 0.1;
                for (const char of line) {
                    sourceContext.fillText(char, cursor, y);
                    cursor += sourceContext.measureText(char).width - fontSize * TRACKING;
                }
            });

            const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data;
            particles = [];

            for (let y = 0; y < source.height; y += step) {
                for (let x = 0; x < source.width; x += step) {
                    // Alpha channel of the sampled cell decides whether a particle exists
                    if (pixels[(y * source.width + x) * 4 + 3] < 128) continue;

                    // Start scattered around home rather than across the canvas, so the
                    // reveal reads as the name condensing out of dust instead of flying in
                    const angle = Math.random() * Math.PI * 2;
                    const spread = scatter * (0.35 + Math.random() * 0.65);

                    particles.push({
                        hx: x,
                        hy: y,
                        x: introPending ? x + Math.cos(angle) * spread : x,
                        y: introPending ? y + Math.sin(angle) * spread : y,
                        vx: 0,
                        vy: 0,
                        wobble: (Math.random() - 0.5) * 1.1,
                        delay: introPending ? (x / source.width) * 420 + Math.random() * 90 : 0
                    });
                }
            }

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.ceil(width * dpr);
            canvas.height = Math.ceil(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context!.setTransform(dpr, 0, 0, dpr, 0, 0);

            clearPointer();
            started = performance.now();
            if (reduceMotion) draw();
        }

        function draw() {
            context!.clearRect(0, 0, width, height);

            // Bucket every particle by how far it has been pushed, then paint one bucket
            // at a time — keeps the whole field down to five fillStyle switches per frame.
            const buckets: number[][] = TINTS.map(() => []);

            for (const p of particles) {
                const dx = p.x - p.hx;
                const dy = p.y - p.hy;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const heat = Math.min(1, distance / 45);
                const size = dotSize * (1 - heat * 0.4);

                buckets[Math.min(TINTS.length - 1, Math.floor(heat * TINTS.length))].push(
                    p.x,
                    p.y,
                    size
                );
            }

            buckets.forEach((bucket, index) => {
                if (bucket.length === 0) return;
                context!.fillStyle = TINTS[index];
                for (let i = 0; i < bucket.length; i += 3) {
                    context!.fillRect(bucket[i], bucket[i + 1], bucket[i + 2], bucket[i + 2]);
                }
            });
        }

        /** True once no ancestor is still faded out, i.e. the page loader has handed over. */
        function onScreen(): boolean {
            let node: HTMLElement | null = wrapper;
            while (node) {
                if (parseFloat(getComputedStyle(node).opacity) < 0.05) return false;
                node = node.parentElement;
            }
            return true;
        }

        function tick(now: number) {
            // Keep the clock pinned to now while the page is still hidden, so the reveal
            // starts the moment it can actually be seen rather than behind the loader
            if (!revealed) {
                if (onScreen()) {
                    revealed = true;
                    introPending = false;
                } else {
                    started = now;
                }
            }

            const elapsed = now - started;
            const r2 = radius * radius;

            for (const p of particles) {
                // Hold the particle at its scattered start until the intro sweep reaches it
                if (elapsed < p.delay) continue;

                const dx = p.x - pointerX;
                const dy = p.y - pointerY;
                const d2 = dx * dx + dy * dy;

                if (d2 < r2) {
                    const distance = Math.sqrt(d2) || 0.001;
                    const falloff = 1 - distance / radius;
                    const angle = Math.atan2(dy, dx) + p.wobble;
                    p.vx += Math.cos(angle) * falloff * FORCE;
                    p.vy += Math.sin(angle) * falloff * FORCE;
                }

                p.vx = (p.vx + (p.hx - p.x) * SPRING) * FRICTION;
                p.vy = (p.vy + (p.hy - p.y) * SPRING) * FRICTION;
                p.x += p.vx;
                p.y += p.vy;
            }

            draw();
            frame = requestAnimationFrame(tick);
        }

        function start() {
            if (running || reduceMotion) return;
            running = true;
            started = performance.now();
            frame = requestAnimationFrame(tick);
        }

        function stop() {
            running = false;
            cancelAnimationFrame(frame);
        }

        function clearPointer() {
            pointerX = -9999;
            pointerY = -9999;
        }

        function movePointer(event: PointerEvent) {
            const rect = canvas.getBoundingClientRect();
            pointerX = event.clientX - rect.left;
            pointerY = event.clientY - rect.top;
        }

        // The footer sits well below the fold, so nothing animates until it is on screen
        const visibility = new IntersectionObserver(
            ([entry]) => (entry.isIntersecting ? start() : stop()),
            { threshold: 0.1 }
        );
        visibility.observe(wrapper);

        // Sizing the canvas changes the wrapper's height, which re-fires the observer —
        // only a width change actually invalidates the field, so ignore everything else.
        let builtAt = 0;
        const resize = new ResizeObserver(() => {
            const next = wrapper.getBoundingClientRect().width;
            if (next === builtAt) return;
            builtAt = next;
            build();
        });
        resize.observe(wrapper);

        canvas.addEventListener("pointermove", movePointer);
        canvas.addEventListener("pointerleave", clearPointer);

        // Sampling before Poppins arrives would rasterise the fallback face instead
        const firstBuild = () => {
            builtAt = wrapper.getBoundingClientRect().width;
            build();
        };
        document.fonts.load("800 100px Poppins").then(firstBuild).catch(firstBuild);

        return () => {
            stop();
            visibility.disconnect();
            resize.disconnect();
            canvas.removeEventListener("pointermove", movePointer);
            canvas.removeEventListener("pointerleave", clearPointer);
        };
    });
</script>

<div bind:this={wrapper} class="w-full select-none">
    <svelte:element this={heading} class="sr-only">{label}</svelte:element>
    <canvas
        bind:this={canvas}
        aria-hidden="true"
        class="interactive block w-full touch-pan-y"
    ></canvas>
</div>

<style>
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
        border: 0;
    }
</style>
