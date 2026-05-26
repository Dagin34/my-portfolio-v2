<script lang="ts">
    import TechCarousel from "$components/projects-page/tech-carousel.svelte";

    function scrollToProjects() {
        const nextSection = document.getElementById('projects');

        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
</script>

<section 
    aria-label="Portfolio Introduction"
    class="relative min-h-screen flex flex-col justify-center pt-8 lg:pt-16 border-t border-border-color overflow-hidden "
>
    <div class="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-white/5 via-transparent to-white/2 hidden lg:block"></div>
    <div class="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 items-start">
        <div class="border-y border-border-color lg:col-span-7 flex flex-col justify-center h-full pl-8 py-12">
            <div class="flex items-center gap-3 mb-6">
                <p class="text-brand-primary font-mono text-xs tracking-[0.3em] uppercase">
                    // The Archive
                </p>
            </div>
            
            <h1 class="text-5xl md:text-7xl font-light leading-none text-white uppercase flex flex-col -gap-2">
                Showcasing <br /> 
                <span class="text-3xl md:text-5xl text-transparent bg-clip-text bg-linear-to-r from-brand-primary via-brand-primary/30 to-background uppercase pr-4">
                    innovation
                </span>
            </h1>
            
            <p class="text-xs md:text-sm text-gray-400 font-light leading-relaxed mt-10 max-w-xl tracking-wide">
                A curated sequence of engineered architectural blueprints, full-stack ecosystems, and precise system integrations optimized for scalability and performance.
            </p>
        </div>

        <div class="border-l border-y border-border-color lg:col-span-5 flex flex-col items-start lg:items-end justify-end h-full lg:min-h-[50vh] w-full mt-0 lg:text-right">
            <div class="text-left lg:text-right w-full">
                <p class="pr-8 text-[10px] font-mono text-brand-primary my-4 uppercase tracking-[0.25em] block pl-8 lg:pl-0">
                    // TECHNICAL JOURNEY SPECS
                </p>
                
                <div class="w-full space-y-0 flex flex-col justify-center gap-y-0! bg-background">
                    <div class="pr-8 pl-8 lg:pl-0 group border-y border-white/8 py-5 flex items-center justify-between lg:justify-end gap-8 transition-all duration-300 hover:border-brand-primary/40">
                        <div>
                            <p class="text-xs font-mono text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Featured Projects</p>
                            <p class="text-xs text-gray-500 mt-1 font-light group-hover:text-gray-300 transition-colors">Production architectures & setups</p>
                        </div>
                    </div>
                    
                    <div class="pr-8 pl-8 lg:pl-0 group border-y border-white/8 py-5 flex items-center justify-between lg:justify-end gap-8 transition-all duration-300 hover:border-brand-primary/40">
                        <div>
                            <p class="text-xs font-mono text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Technologies Used</p>
                            <p class="text-xs text-gray-500 mt-1 font-light group-hover:text-gray-300 transition-colors">Modern framework integrations</p>
                        </div>
                    </div>
                    
                    <div class="pr-8 pl-8 lg:pl-0 group border-y border-white/8 py-5 flex items-center justify-between lg:justify-end gap-8 transition-all duration-300 hover:border-brand-primary/40">
                        <div>
                            <p class="text-xs font-mono text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Problem Solving</p>
                            <p class="text-xs text-gray-500 mt-1 font-light group-hover:text-gray-300 transition-colors">Algorithmic complexity reduction</p>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                on:click={scrollToProjects}
                class="group relative w-full py-5 lg:py-8 border border-border-color px-10 overflow-hidden bg-transparent transition-all duration-300 active:scale-[0.98]"
            >
                <span class="absolute inset-0 w-full h-full bg-brand-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
                
                <span class="relative z-10 flex items-center justify-center gap-3 text-[10px] font-bold text-white uppercase tracking-[0.25em] group-hover:text-black transition-colors duration-300">
                    View All My Work
                    <svg class="w-3 h-3 transform transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </span>
            </button>
        </div>
    </div>

    <div>
        <TechCarousel />
    </div>
</section>