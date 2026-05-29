<script lang="ts">
    import { onMount } from "svelte";
    import { spring } from "svelte/motion";

    // 1. Create a spring for the outer ring (slower/smooth)
    let coordsRing = spring({ x: 0, y: 0 }, {
        stiffness: 0.08,
        damping: 0.4
    });

    // 2. Create a spring for the inner dot (snappier/faster)
    let coordsDot = spring({ x: 0, y: 0 }, {
        stiffness: 0.35,
        damping: 0.5
    });

    let isHovering: boolean = false;

    onMount(() => {
        const move = (e: MouseEvent) => {
            // Update both springs to the same target
            coordsRing.set({ x: e.clientX, y: e.clientY });
            coordsDot.set({ x: e.clientX, y: e.clientY });
        };

        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            isHovering = !!target?.closest('a, button, .interactive');
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", handleOver);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", handleOver);
        };
    });
</script>

<!-- Outer Ring -->
<div 
    class="cursor-ring border border-white" 
    class:hovering={isHovering}
    style="transform: translate3d({$coordsRing.x}px, {$coordsRing.y}px, 0) translate(-50%, -50%)"
>
    <!-- Inner Dot (Moved independently of the parent ring's center for a "floating" effect) -->
    <div 
        class="dot"
        class:hovering-dot={isHovering}
        style="transform: translate3d({$coordsDot.x - $coordsRing.x}px, {$coordsDot.y - $coordsRing.y}px, 0)"
    ></div>
</div>

<style>
    :global(body) {
        cursor: none;
    }

    /* Outer Ring */
    .cursor-ring {
        position: fixed;
        top: 0;
        left: 0;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        border: 1px solid rgba(255, 105, 0, 0.65);
        background: rgba(255, 105, 0, 0.18);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06), 0 0 24px rgba(255, 105, 0, 0.18);
        backdrop-filter: blur(2px);
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: normal;
        opacity: 0.9;

        /* Flex center the dot initially */
        display: flex;
        align-items: center;
        justify-content: center;

        /* Keep the cursor light and non-invasive while still animating */
        transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
    }

    .hovering {
        width: 3.5rem;
        height: 3.5rem;
        background: rgba(255, 105, 0, 0.28);
        border-color: rgba(255, 105, 0, 0.95);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 30px rgba(255, 105, 0, 0.28);
    }

    /* Inner Ring */
    .dot {
        width: 0.35rem;
        height: 0.35rem;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.35);
        transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
    }

    .hovering-dot {
        width: 0.55rem;
        height: 0.55rem;
        background: #ffb066;
    }
</style>