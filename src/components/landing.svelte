<script>
    // Using Svelte 5 Runes for any dynamic layout logic
    let heroText = $state("Software Engineer");
</script>

<section id="home" class="min-h-screen flex flex-col justify-center border-b border-border-color relative">
    <div class="pt-24 pb-4 pl-4">
        <p class="text-[12px] font-mono text-brand-primary uppercase tracking-[0.4em] opacity-80">
            Available for new opportunities — 2026
        </p>
    </div>

    <div class="border-t border-x border-border-color group transition-colors hover:bg-white/1">
        <div class="p-8 md:p-12">
            <h1 class="text-4xl md:text-7xl font-light tracking-tighter leading-none text-white flex flex-col -gap-2">
                <span class="text-5xl md:text-8xl">Dagmawi</span>
                <span class="text-brand-primary opacity-90">Napoleon</span> 
                <span class="opacity-90">Bogale</span>
            </h1>
        </div>
        
        <div class="flex flex-col md:flex-row border-t border-border-color">
            <div class="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-color">
                <h2 class="text-2xl md:text-4xl font-light text-gray-200">{heroText}</h2>
                <p class="mt-6 text-xs md:text-sm text-gray-400 font-light leading-relaxed max-w-sm">
                    Innovative software engineer from Addis Ababa. I build scalable, high-performance systems with cloud-ready architectures.
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
                        <span class="text-xs font-light">BSc Software Engineering & A2SVian (Backed by Google)</span>
                    </div>
                </div>
                
                <div class="flex gap-4">
                    <a href="#contact" class="flex-1 py-3 bg-white/4 hover:bg-brand-primary text-gray-300 text-center text-xs font-bold uppercase tracking-widest transition-all">
                        Let's Talk
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="border-x border-b border-border-color p-8 flex flex-wrap gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
        <span class="text-xs font-mono tracking-tighter uppercase">FastAPI</span>
        <span class="text-xs font-mono tracking-tighter uppercase">Next.js</span>
        <span class="text-xs font-mono tracking-tighter uppercase">SvelteKit</span>
        <span class="text-xs font-mono tracking-tighter uppercase">Node.js</span>
        <span class="text-xs font-mono tracking-tighter uppercase">React.js</span>
    </div>
</section>