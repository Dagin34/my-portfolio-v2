<script lang="ts">
    /**
     * Full-viewport fine-grain (TV static) texture.
     *
     * The noise is an inline SVG `feTurbulence` tile, so there is no image
     * request and nothing to hydrate — it paints with the first frame of CSS
     * rather than popping in after mount.
     *
     * It sits above everything (see the z-index note below) with
     * `pointer-events: none`, so the whole surface — background, cards,
     * project screenshots, the loader and the transition overlay — reads as
     * one grained plane instead of a layer that vanishes when an overlay opens.
     */
    interface Props {
        /** Strength of the veil. Roughly 0.08 (a whisper) to 0.3 (heavy stock). */
        opacity?: number;
        /** Tile size in px. Smaller = denser, finer grain. */
        size?: number;
        /** Jitter the tile so the grain crawls like live static. */
        animated?: boolean;
    }

    let { opacity = 0.16, size = 160, animated = true }: Props = $props();

    // baseFrequency sits near 1 so a noise cell lands on roughly one CSS pixel:
    // that is what keeps it "fine grain" instead of a cloudy mush. The alpha
    // gamma curve crushes the low end so the tile is sparse specks on
    // transparency rather than a flat grey wash, which keeps the near-black
    // background from turning milky.
    const tile = $derived(
        encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>` +
                `<filter id='g' x='0' y='0' width='100%' height='100%'>` +
                `<feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch' seed='7'/>` +
                `<feColorMatrix type='saturate' values='0'/>` +
                `<feComponentTransfer><feFuncA type='gamma' exponent='2.4' amplitude='1.6' offset='0'/></feComponentTransfer>` +
                `</filter>` +
                `<rect width='100%' height='100%' filter='url(#g)'/>` +
                `</svg>`
        )
    );
</script>

<div
    class="fine-grain"
    class:animated
    aria-hidden="true"
    style="--grain-tile: url(&quot;data:image/svg+xml,{tile}&quot;); --grain-opacity: {opacity}; --grain-size: {size}px;"
></div>

<style>
    /* Above the toast (z-10001), which is the highest layer in the app, so the
       grain covers the finished composite. It never takes a pointer event, so
       nothing below it loses interactivity. */
    .fine-grain {
        position: fixed;
        /* Oversized and bled off every edge: the jitter below translates the
           layer, and this margin keeps a seam from ever entering the viewport. */
        inset: -12%;
        z-index: 10002;
        pointer-events: none;
        background-image: var(--grain-tile);
        background-repeat: repeat;
        background-size: var(--grain-size) var(--grain-size);
        opacity: var(--grain-opacity);
        /* Promote to its own layer: the tile rasterises once and the jitter is
           a pure compositor transform, so the animation costs no repaints. */
        will-change: transform;
        transform: translate3d(0, 0, 0);
    }

    .fine-grain.animated {
        animation: grain-jitter 1s steps(1, end) infinite;
    }

    /* Discrete hops rather than a smooth drift — a slide reads as a moving
       texture, a hop reads as static. */
    @keyframes grain-jitter {
        0% { transform: translate3d(0, 0, 0); }
        10% { transform: translate3d(-5%, -3%, 0); }
        20% { transform: translate3d(4%, -6%, 0); }
        30% { transform: translate3d(-7%, 5%, 0); }
        40% { transform: translate3d(6%, 2%, 0); }
        50% { transform: translate3d(-2%, -7%, 0); }
        60% { transform: translate3d(7%, 4%, 0); }
        70% { transform: translate3d(-6%, -2%, 0); }
        80% { transform: translate3d(3%, 6%, 0); }
        90% { transform: translate3d(-4%, -5%, 0); }
        100% { transform: translate3d(0, 0, 0); }
    }

    @media (prefers-reduced-motion: reduce) {
        .fine-grain.animated {
            animation: none;
        }
    }
</style>
