<script lang="ts">
    // Define the Project type to fix the 'any' error
    interface Project {
        title: string;
        description: string;
        images: string[];
        github: string | null;
        live: string | null;
        tech?: string[];
    }

    let { onMissing } = $props<{ onMissing: (msg: string) => void }>();
    
    // Real project data from your resume
    let projects: Project[] = [
        { 
            title: 'Gojo Getaways', 
            description: 'Vacation Home Management & Booking Ecosystem for Ethiopian property owners.', 
            images: [], // [cite: 47, 48]
            github: null, 
            live: null,
            tech: ['MERN', 'JWT', 'Payment Integration'] 
        },
        { 
            title: 'StreamSynx', 
            description: 'Virtual movie streaming platform with synchronized playback via TMDB API.', 
            images: [], // [cite: 49, 51]
            github: 'https://github.com/dagmawinapoleon', 
            live: 'https://streamsynx-demo.vercel.app',
            tech: ['Next.js', 'SSR', 'WebSockets']
        },
        { 
            title: 'Chewata Chat', 
            description: 'Real-time instant messaging app enabling text and image exchange.', 
            images: [], // [cite: 52, 53, 54]
            github: 'https://github.com/dagmawinapoleon', 
            live: 'https://chewata-demo.vercel.app',
            tech: ['MERN', 'Socket.io', 'Zustand']
        },
        { 
            title: 'Testing Auth', 
            description: 'Secure notes app with JWT and automated Selenium test scripts.', 
            images: [], // [cite: 55, 56]
            github: 'https://github.com/dagmawinapoleon', 
            live: null,
            tech: ['Selenium', 'JWT', 'Zustand']
        }
    ];

    let activeProject = $state<Project | null>(null);
    let currentImgIndex = $state(0);

    function openModal(p: Project) { 
        activeProject = p; 
        currentImgIndex = 0; 
    }
    
    function nextImg() { 
        if (activeProject && activeProject.images.length > 0) {
            currentImgIndex = (currentImgIndex + 1) % activeProject.images.length; 
        }
    }
</script>

<section class="py-24 border-t border-border-color">
    <div class="flex items-center gap-4 mb-12">
        <span class="h-px w-12 bg-brand-primary"></span>
        <p class="text-[12px] font-mono text-brand-primary uppercase tracking-[0.3em]">01. Selected Works</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-border-color">
        {#each projects as project}
            <button 
                onclick={() => openModal(project)}
                class="group relative p-10 border-r border-b border-border-color text-left hover:bg-white/2 transition-all duration-500 overflow-hidden"
            >
                <div class="absolute -right-4 -bottom-4 text-9xl font-bold opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none uppercase italic">
                    {project.title.split(' ')[0]}
                </div>

                <div class="relative z-10">
                    <h3 class="text-4xl font-light text-white group-hover:text-brand-primary transition-colors duration-300 tracking-tighter">
                        {project.title}
                    </h3>
                    <p class="text-sm text-gray-400 font-light mt-4 leading-relaxed max-w-sm">
                        {project.description}
                    </p>
                    
                    {#if project.tech}
                        <div class="mt-6 flex flex-wrap gap-2">
                            {#each project.tech as t}
                                <span class="text-[9px] font-mono border border-border-color px-2 py-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                                    {t}
                                </span>
                            {/each}
                        </div>
                    {/if}
                </div>
            </button>
        {/each}
    </div>
</section>

{#if activeProject}
    <div class="fixed inset-0 z-100 flex items-center justify-center p-6 sm:p-12">
        <button 
            onclick={() => activeProject = null} 
            class="absolute inset-0 bg-background/90 backdrop-blur-xl transition-all"
            aria-label='click-me'
        ></button>

        <div class="relative max-w-5xl w-full border border-border-color bg-background shadow-2xl overflow-hidden">
            <div class="flex flex-col md:flex-row h-full">
                
                <div class="w-full md:w-2/3 bg-black/50 aspect-video md:aspect-auto flex flex-col border-b md:border-b-0 md:border-r border-border-color">
                    {#if activeProject.images.length > 0}
                        <div class="relative flex-1 overflow-hidden group">
                            <img src={activeProject.images[currentImgIndex]} alt="Gallery" class="object-cover w-full h-full" />
                            <button onclick={nextImg} class="absolute inset-y-0 right-0 px-6 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-primary/20">
                                Next →
                            </button>
                        </div>
                        <div class="p-4 flex gap-2 justify-center border-t border-border-color">
                            {#each activeProject.images as _, i}
                                <div class="h-1 w-8 transition-all {i === currentImgIndex ? 'bg-brand-primary' : 'bg-white/10'}"></div>
                            {/each}
                        </div>
                    {:else}
                        <div class="flex-1 flex flex-col items-center justify-center p-12 opacity-20">
                            <div class="w-full h-full border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center">
                                <span class="text-xs font-mono uppercase tracking-widest">Visuals Restricted</span>
                                <span class="text-[10px] mt-2">Confidential or Internal System</span>
                            </div>
                        </div>
                    {/if}
                </div>

                <div class="w-full md:w-1/3 p-8 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-3xl font-light tracking-tighter">{activeProject.title}</h2>
                            <button onclick={() => activeProject = null} class="text-xl opacity-50 hover:opacity-100">✕</button>
                        </div>
                        <p class="text-sm font-light text-gray-400 leading-relaxed mb-8">
                            {activeProject.description}
                        </p>
                    </div>

                    <div class="space-y-3">
                        <button 
                            onclick={() => activeProject?.live ? window.open(activeProject.live) : onMissing('Live demo not available')} 
                            class="w-full py-4 border border-brand-primary text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-primary hover:text-white transition-all"
                        >
                            Explore Site
                        </button>
                        <button 
                            onclick={() => activeProject?.github ? window.open(activeProject.github) : onMissing('Project is under Private License')} 
                            class="w-full py-4 border border-border-color text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                        >
                            View Source
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}