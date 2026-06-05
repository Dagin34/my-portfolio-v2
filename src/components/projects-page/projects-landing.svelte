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
    class="relative min-h-screen flex flex-col justify-center pt-24 lg:pt-32 pb-12 overflow-hidden bg-background text-white"
>
    <!-- Background Design Details: Tech Grid, Radial Lighting, Ambient Glow -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_10%,#fff_70%,transparent_100%)] pointer-events-none"></div>
    
    <!-- Top Decorative Status Bar -->
    <div class="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-12 mb-8 hidden sm:flex items-center justify-between text-[10px] font-mono text-white/40 tracking-widest uppercase">
        <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping"></span>
            <span>Projects Repertoire</span>
        </div>
        <div>Based in Addis Ababa, Ethiopia</div>
    </div>

    <!-- Main Content Container -->
    <div class="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1">
        
        <!-- Left Side: Editorial Typography & Description -->
        <div class="lg:col-span-7 flex flex-col justify-center text-left">
            <div class="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/10 bg-white/2 backdrop-blur-sm text-brand-primary font-mono text-[10px] uppercase tracking-[0.2em] mb-6 w-fit">
                <span>// Directory: PROJECTS</span>
            </div>
            
            <h1 class="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] uppercase">
                Engineered <br />
                <span class="text-transparent bg-clip-text bg-brand-primary font-normal">
                    architectures
                </span>
            </h1>
            
            <p class="text-sm md:text-base text-white/50 font-light leading-relaxed mt-8 max-w-xl tracking-wide">
                A curated compilation of full-stack ecosystems, optimized backends, and modular integrations. Focused on system performance, structural scalability, and seamless user experiences.
            </p>

            <!-- Refined Floating Call to Action Button -->
            <div class="mt-10">
                <button 
                    onclick={scrollToProjects}
                    class="group relative inline-flex items-center gap-4 px-8 py-4 border border-brand-primary/30 bg-brand-primary/3 text-white font-mono text-xs uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:border-brand-primary hover:shadow-[0_0_35px_rgba(var(--brand-primary-rgb,255,255,255),0.15)] active:scale-95"
                >
                    <span class="absolute inset-0 bg-brand-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></span>
                    
                    <span class="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-300">
                        Initialize Scroll
                        <svg class="w-4 h-4 transform transition-all duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>

        <!-- Right Side: Interactive glassmorphic HUD Console -->
        <div class="lg:col-span-5 w-full">
            <div class="relative bg-white/1 backdrop-blur-md border border-white/10 p-6 lg:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.6)] group">
                <!-- Gloss effect top overlay -->
                <div class="absolute inset-0 bg-linear-to-br from-white/3 to-transparent pointer-events-none"></div>
                
                <!-- Corner geometric layout brackets -->
                <div class="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-white/20"></div>
                <div class="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-white/20"></div>
                <div class="absolute bottom-3 left-3 w-3.5 h-3.5 border-b border-l border-white/20"></div>
                <div class="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-white/20"></div>

                <div class="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <span class="text-[10px] font-mono text-white/30 tracking-widest uppercase">Projects Journey</span>
                    <!-- <span class="text-[10px] font-mono text-brand-primary">Releases</span> -->
                </div>

                <div class="space-y-4">
                    <!-- Dashboard Tech Metric Item 1 -->
                    <div class="p-4 border border-white/5 bg-white/1 transition-all duration-300 hover:border-brand-primary/40 hover:bg-white/3 group/item">
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] font-mono text-brand-primary">01 // PROJECTS</span>
                            <span class="w-2 h-2 rounded-full bg-brand-primary/30 group-hover/item:bg-brand-primary transition-colors"></span>
                        </div>
                        <h4 class="text-sm font-medium mt-1 text-white/95 tracking-wide group-hover/item:text-white transition-colors">Production Deployments</h4>
                        <p class="text-xs text-white/40 mt-1 font-light leading-relaxed">Full-stack systems and setups tuned for uptime.</p>
                    </div>

                    <!-- Dashboard Tech Metric Item 2 -->
                    <div class="p-4 border border-white/5 bg-white/1 transition-all duration-300 hover:border-brand-primary/40 hover:bg-white/3 group/item">
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] font-mono text-brand-primary">02 // INTEGRATIONS</span>
                            <span class="w-2 h-2 rounded-full bg-brand-primary/30 group-hover/item:bg-brand-primary transition-colors"></span>
                        </div>
                        <h4 class="text-sm font-medium mt-1 text-white/95 tracking-wide group-hover/item:text-white transition-colors">Modern Stack Matrix</h4>
                        <p class="text-xs text-white/40 mt-1 font-light leading-relaxed">Fast-rendering frameworks and API patterns.</p>
                    </div>

                    <!-- Dashboard Tech Metric Item 3 -->
                    <div class="p-4 border border-white/5 bg-white/1 transition-all duration-300 hover:border-brand-primary/40 hover:bg-white/3 group/item">
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] font-mono text-brand-primary">03 // OPTIMIZATION</span>
                            <span class="w-2 h-2 rounded-full bg-brand-primary/30 group-hover/item:bg-brand-primary transition-colors"></span>
                        </div>
                        <h4 class="text-sm font-medium mt-1 text-white/95 tracking-wide group-hover/item:text-white transition-colors">Performance Tuning</h4>
                        <p class="text-xs text-white/40 mt-1 font-light leading-relaxed">Algorithmic efficiency and asset payload minimization.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Tech Carousel Wrapper with layout lines -->
    <div class="relative z-10 w-full mt-20 lg:mt-24 border-t border-white/5 pt-12">
        <TechCarousel />
    </div>
</section>