<script lang="ts">
    import technologies from "$lib/technologies";
</script>

<svelte:head>
    <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
    />
</svelte:head>

<div
    class="absolute bottom-0 left-0 z-20 w-full lg:border-y border-border-color py-4 overflow-hidden"
>
    <div
        class="absolute inset-y-0 left-0 h-full w-full bg-linear-to-t from-white/5 to-transparent z-10 pointer-events-none"
    ></div>

    <div class="flex overflow-hidden select-none">
        <div class="marquee-track flex gap-8 whitespace-nowrap">
            {#each [0, 1] as _}
                {#each technologies as tech}
                    <div
                        class="inline-flex items-center gap-3 px-5 py-2 border border-border-color bg-white/1 hover:bg-white/3 hover:border-brand-primary/30 transition-colors duration-300"
                    >
                        <span class="w-4 h-4 flex items-center justify-center">
                            <i class="{tech.icon} text-white/90 text-base"></i>
                        </span>

                        <span
                            class="text-[10px] font-mono tracking-widest uppercase"
                        >
                            {tech.name}
                        </span>
                    </div>
                {/each}
            {/each}
        </div>
    </div>
</div>

<style>
    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .marquee-track {
        display: flex;
        width: max-content;
        animation: scroll 40s linear infinite;
    }

    /* Pause animation on hover */
    .marquee-track:hover {
        animation-play-state: paused;
    }
</style>
