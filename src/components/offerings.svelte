<script lang="ts">
    import { onMount } from "svelte";
    import offerings, { type Offering } from "$lib/services";

    // Bindable references for sizing and scroll tracking
    let containerElement = $state<HTMLElement | null>(null);
    let trackElement = $state<HTMLElement | null>(null);
    let viewWidth = $state(0);
    let trackWidth = $state(0);
    let scrollProgress = $state(0);

    // Calculate dynamic horizontal offset based on current scroll progress
    let maxTranslate = $derived(Math.max(0, trackWidth - viewWidth + 80)); // Add padding offset
    let translateX = $derived(scrollProgress * maxTranslate);

    function handleScroll() {
        if (!containerElement) return;
        const rect = containerElement.getBoundingClientRect();
        const totalScrollableHeight = rect.height - window.innerHeight;

        if (totalScrollableHeight <= 0) return;

        // Extract a 0-1 range based on viewport relative position inside container
        const progress = Math.min(Math.max(-rect.top / totalScrollableHeight, 0), 1);
        scrollProgress = progress;
    }

    onMount(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        
        // Initial calculation
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    });
</script>

<div 
    bind:this={containerElement} 
    class="relative h-[250vh] bg-transparent text-brand-primary overflow-visible"
>
    <!-- Sticky viewport wrapper -->
    <div 
        class="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none"
        bind:clientWidth={viewWidth}
    >
        
        <div class="w-full px-8 lg:px-12 py-8 lg:py-18 border border-border-color">
            <p class="text-brand-primary font-mono text-sm mb-4 tracking-widest uppercase">04. What I Offer</p>
            <h2 class="text-3xl md:text-5xl font-light tracking-tighter text-white leading-tight">
            Services and <br /> <span class="opacity-40 italic">Offerings</span>
            </h2>

            <div class="mt-8 h-px w-20 bg-brand-primary opacity-50"></div>
        </div>

        <!-- Lower Section: Horizontal Scrollable Cards -->
        <div class="relative w-full overflow-hidden my-auto pl-8 md:pl-16 lg:pl-24">
            <div 
                bind:this={trackElement}
                bind:clientWidth={trackWidth}
                class="flex gap-4 w-max will-change-transform"
                style="transform: translateX(-{translateX}px);"
            >
                {#each offerings as item}
                    {@const Icon = item.icon}
                    <div class="w-80 md:w-105 shrink-0 border border-border-color mb-1 px-8 md:px-12 py-12 md:py-16 flex flex-col justify-between bg-white/3 backdrop-blur-lg hover:bg-white/6 hover:backdrop-blur-2xl transition-all duration-300">
                        <div class="flex justify-between items-start pb-8">
                            <div class="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center text-black">
                                <Icon size="1.5rem" strokeWidth={3} />
                            </div>

                            <span class="text-sm font-mono text-brand-primary font-medium">{item.num}</span>
                        </div>

                        <!-- Card Content Block -->
                        <div class="">
                            <h3 class="text-sm md:text-lg tracking-wide opacity-70 font-extrabold  text-white whitespace-pre-line mb-4 uppercase">
                                {item.title}
                            </h3>
                            <div class="h-px w-full bg-white/10 mb-5"></div>
                            <p class="text-sm text-white opacity-80 font-light leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>