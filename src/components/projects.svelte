<script>
    let { onMissing } = $props();
    
    let projects = [
        { title: 'Project One', description: 'Scalable API', images: ['/img1.jpg', '/img2.jpg'], github: null, live: 'https://demo.com' },
        // ... add more
    ];

    let activeProject = $state(projects[0]);
    let currentImgIndex = $state(0);

    function openModal(p) { activeProject = p; currentImgIndex = 0; }
    function nextImg() { currentImgIndex = (currentImgIndex + 1) % activeProject.images.length; }
</script>

<section class="py-20 border-t border-border-color">
    <p class="text-[12px] font-light opacity-50 mb-4 uppercase tracking-widest">01. Selected Works</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-border-color">
        {#each projects as project}
            <button 
                onclick={() => openModal(project)}
                class="group p-8 border-r border-b border-border-color text-left hover:bg-white/2 transition-colors"
            >
                <h3 class="text-3xl font-light group-hover:text-brand-primary transition-colors">{project.title}</h3>
                <p class="opacity-50 mt-2">{project.description}</p>
            </button>
        {/each}
    </div>
</section>

{#if activeProject}
    <div class="fixed inset-0 z-100 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md">
        <div class="max-w-4xl w-full border border-border-color bg-background p-6">
            <div class="flex justify-between items-start mb-6">
                <h2 class="text-4xl font-light">{activeProject.title}</h2>
                <button onclick={() => activeProject = projects[0]} class="text-2xl">✕</button>
            </div>
            
            <div class="relative aspect-video bg-black flex items-center justify-center overflow-hidden border border-border-color">
                <img src={activeProject.images[currentImgIndex]} alt="Gallery" class="object-cover w-full h-full" />
                <button onclick={nextImg} class="absolute right-4 bg-background/50 p-2 border border-white/10 hover:bg-brand-primary">Next</button>
            </div>

            <div class="mt-8 flex gap-4">
                <button onclick={() => activeProject.live ? window.open(activeProject.live) : onMissing('Live demo not available')} 
                        class="px-6 py-3 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                    Live Demo
                </button>
                <button onclick={() => activeProject.github ? window.open(activeProject.github) : onMissing('Source code is private')} 
                        class="px-6 py-3 border border-border-color hover:bg-white/10 transition-all">
                    GitHub
                </button>
            </div>
        </div>
    </div>
{/if}