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
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: #ff6900;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        
        /* Flex center the dot initially */
        display: flex;
        align-items: center;
        justify-content: center;

        /* Only transition the scale/size, not the position (the spring handles position) */
        transition: width 0.3s ease, height 0.3s ease;
    }

    .hovering {
        width: 6rem;
        height: 6rem;
    }

    /* Inner Ring */
    .dot {
        width: 0.5rem;
        height: 0.5rem;
        background: #000; /* Tailwind red-500 */
        border-radius: 50%;
    }

    .hovering-dot {
        width: 0.8rem;
        height: 0.8rem;
    }
</style>