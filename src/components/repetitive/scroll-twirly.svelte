<script>
    // Svelte 5 Runes for Props
    let { 
        color = "#ff6900", 
        girth = 24 
    } = $props();
</script>

<div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <svg 
        class="w-full h-full opacity-40 md:opacity-60" 
        viewBox="0 0 1440 3000" 
        fill="none" 
        preserveAspectRatio="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <!-- Mask to fade out the line near the left and right edges -->
            <linearGradient id="edge-fade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="black" />
                <stop offset="10%" stop-color="white" />
                <stop offset="90%" stop-color="white" />
                <stop offset="100%" stop-color="black" />
            </linearGradient>
            <mask id="fade-mask">
                <rect width="100%" height="100%" fill="url(#edge-fade)" />
            </mask>
        </defs>

        <!-- Multi-curve winding path scaling to the container height -->
        <path 
            d="M 1440,50 
               C 1000,200 600,350 1000,700 
               C 1400,1050 800,1350 200,1600 
               C -200,1850 300,2250 850,2450 
               C 1350,2650 900,2900 0,2950" 
            stroke={color} 
            stroke-width={girth} 
            stroke-linecap="round" 
            mask="url(#fade-mask)"
            style="filter: drop-shadow(0 0 20px {color}80);"
        />
    </svg>
</div>