<script>
    import HomeTechCarousel from "./home-tech-carousel.svelte";

    // Using Svelte 5 Runes for any dynamic layout logic
    let heroText = $state("Software Engineer");
</script>

<section id="home" class="min-h-screen flex flex-col justify-center border-b border-border-color">
    <div class="pt-24 pb-4 pl-4 max-md:py-8">
        <p class="text-[10px] max-md:hidden lg:text-[12px] font-mono text-brand-primary uppercase tracking-[0.4em] opacity-80">
            Available for new opportunities — 2026
        </p>
    </div>

    <div class="border-t border-x border-border-color group transition-colors hover:bg-white/1">
        <div class="p-8 md:p-12">
            <h1 class="text-4xl md:text-7xl font-light tracking-tighter leading-none text-white flex flex-col -gap-2">
                <span class="text-5xl md:text-8xl">Dagmawi</span>
                <span class="text-brand-primary opacity-90">Napoleon <span class="text-white opacity-90">Bogale</span></span> 
            </h1>
        </div>
        
        <div class="flex flex-col md:flex-row border-t border-border-color">
            <div class="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-color">
                <h1 class="text-2xl md:text-4xl font-light text-gray-200">{heroText}</h1>
                <p class="mt-6 text-xs md:text-sm text-gray-400 font-light leading-relaxed max-w-sm">
                    Full Stack Dev from Addis Ababa focused on clean code, meaningful products, user experience, and a knack for basketball.
                </p>
            </div>
            
            <div class="w-full md:w-1/3 p-8 flex flex-col justify-between gap-8">
                <div class="space-y-4">
                    <div class="flex justify-between items-end border-b border-border-color pb-2">
                        <span class="text-[10px] font-mono opacity-40 uppercase">Status</span>
                        <span class="text-xs font-light">Full Stack Dev @ Blue Spark</span>
                    </div>
                    <div class="flex justify-between items-end border-b border-border-color pb-2">
                        <span class="text-[10px] font-mono opacity-40 uppercase">Education</span>
                        <span class="text-xs font-light">BSc Software Engineering</span>
                    </div>
                    <div class="flex justify-between items-end border-b border-border-color pb-2">
                        <span class="text-[10px] font-mono opacity-40 uppercase">Bonus</span>
                        <span class="text-xs font-light">A2SVian (Backed by Google)</span>
                    </div>
                </div>
                
                <div class="flex gap-4">
                    <a href="#contact" class="flex-1 py-3 bg-white/4 hover:bg-brand-primary text-gray-300 text-center text-xs font-bold uppercase tracking-widest transition-all duration-400 ease-in-out">
                        Let's Talk
                    </a>
                </div>
            </div>
        </div>
    </div>

    <HomeTechCarousel />
</section>