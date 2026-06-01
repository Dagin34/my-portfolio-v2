<script lang="ts">
    import technologies from "$lib/technologies";
</script>

<div
    class="absolute inset-y-0 left-0 h-full w-full bg-linear-to-t from-white/5 to-transparent z-10 pointer-events-none"
></div>
<div class="bg-white/3 border border-border-color py-6 flex flex-wrap gap-12 opacity-100 transition-all duration-700 overflow-hidden select-none">
    <div class="marquee-track flex gap-4 whitespace-nowrap">
        {#each [0, 1] as _}
            {#each technologies as tech}
                <div
                    class="inline-flex items-center border border-border-color/50 gap-3 px-5 py-2 bg-black/7 text-white/80 hover:text-black hover:bg-brand-primary transition-all duration-300"
                >
                    <span class="w-4 h-4 flex items-center justify-center">
                        <i class="{tech.monoIcon} opacity-90 text-base"></i>
                    </span>

                    <span
                        class="text-[10px] font-bold font-mono tracking-widest uppercase"
                    >
                        {tech.name}
                    </span>
                </div>
            {/each}
        {/each}
    </div>
</div>
