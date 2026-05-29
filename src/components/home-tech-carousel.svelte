<script lang="ts">
    import technologies from "$lib/technologies";
</script>

<div class="absolute inset-y-0 left-0 h-full w-full bg-linear-to-t from-white/5 to-transparent z-10 pointer-events-none"></div>
<div class="flex overflow-hidden select-none">
    <div class="marquee-track flex gap-8 whitespace-nowrap">
        {#each [0, 1] as _}
            {#each technologies as tech}
                <div
                    class="inline-flex items-center border border-border-color/50 gap-3 px-5 py-2 bg-black/7 hover:bg-black/15 transition-all duration-300"
                >
                    <span
                        class="text-[10px] font-bold text-white font-mono tracking-widest uppercase"
                    >
                        {tech.name}
                    </span>
                </div>
            {/each}
        {/each}
    </div>
</div>