<script lang="ts">
    import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-svelte";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { type Project } from "$lib/projects";
    
    let { onMissing, activeProject, onClose } = $props<{ 
        onMissing: (msg: string) => void; 
        activeProject: Project;
        onClose: () => void;
    }>();

    let currentImgIndex = $state(0);
    
    function nextImg() { 
        if (activeProject && activeProject.images.length > 0) {
            currentImgIndex = (currentImgIndex + 1) % activeProject.images.length; 
        }
    }

    function prevImg() {
        if (activeProject && activeProject.images.length > 0) {
            currentImgIndex = (currentImgIndex - 1 + activeProject.images.length) % activeProject.images.length;
        }
    }
</script>

<div class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-12" transition:fade={{ duration: 300 }}>
    <button
        onclick={onClose}
        class="absolute inset-0 bg-black/80 backdrop-blur-xl transition-all cursor-default"
        aria-label="close-modal"
    ></button>

    <div
        class="relative max-w-5xl w-full group"
        transition:fly={{ y: 40, duration: 600, easing: cubicOut }}
    >
        <!-- glowing border -->
        <div class="absolute -inset-px bg-linear-to-br from-transparent via-brand-primary to-transparent opacity-100 transition-all duration-1000 blur-sm z-0"></div>
        <div class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-primary to-transparent opacity-100 transition-opacity duration-1000 z-20"></div>

        <div class="relative z-10 w-full bg-[#030303] border border-border-color group-hover:border-brand-primary/30 transition-colors duration-700 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-auto max-h-[800px]">
            
            <!-- Visuals -->
            <div class="w-full md:w-3/5 bg-black/80 aspect-video md:aspect-auto flex flex-col border-b md:border-b-0 md:border-r border-border-color relative">
                {#if activeProject.images.length > 0}
                    <!-- Image -->
                    <div class="relative flex-1 overflow-hidden">
                        {#key currentImgIndex}
                            <img
                                in:fade={{ duration: 400 }}
                                src={activeProject.images[currentImgIndex]}
                                alt="Gallery"
                                class="absolute inset-0 object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        {/key}
                        
                        <!-- click zones -->
                        <div class="absolute inset-0 flex">
                            <button onclick={prevImg} class="w-1/2 h-full flex items-center justify-start p-4 group/left outline-none">
                                <div class="bg-black/50 p-2 border border-white/10 opacity-0 group-hover/left:opacity-100 transform -translate-x-4 group-hover/left:translate-x-0 transition-all backdrop-blur-sm hover:border-brand-primary/50 hover:text-brand-primary">
                                    <ChevronLeft size={24} />
                                </div>
                            </button>
                            <button onclick={nextImg} class="w-1/2 h-full flex items-center justify-end p-4 group/right outline-none">
                                <div class="bg-black/50 p-2 border border-white/10 opacity-0 group-hover/right:opacity-100 transform translate-x-4 group-hover/right:translate-x-0 transition-all backdrop-blur-sm hover:border-brand-primary/50 hover:text-brand-primary">
                                    <ChevronRight size={24} />
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <div class="h-[2px] w-full bg-border-color flex relative z-10">
                        {#each activeProject.images as _, i}
                            <div class="h-full flex-1 transition-all duration-500 {i === currentImgIndex ? 'bg-brand-primary shadow-[0_0_10px_var(--color-brand-primary)]' : 'bg-transparent'}"></div>
                        {/each}
                    </div>
                {:else}
                    <div class="flex-1 flex flex-col items-center justify-center p-12 bg-[linear-linear(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[100%_4px]">
                        <div class="w-full h-full border border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden group/restricted">
                            <div class="absolute inset-x-0 top-0 h-[20%] bg-linear-to-b from-transparent to-brand-primary/10 opacity-0 group-hover/restricted:opacity-100 -translate-y-full group-hover/restricted:animate-[scan_2s_ease-in-out_infinite]"></div>
                            
                            <span class="text-xs font-mono text-brand-primary uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(var(--brand-primary),0.5)]">Visuals Restricted</span>
                            <span class="text-[10px] mt-3 font-mono text-gray-500 uppercase tracking-widest">Confidential / Internal</span>
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Content & Actions -->
            <div class="w-full md:w-2/5 p-8 flex flex-col bg-[#030303]">
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-8 relative">
                        <h2 class="text-3xl md:text-4xl font-light tracking-tighter text-white pr-8">
                            {activeProject.title}
                        </h2>
                        <button
                            onclick={onClose}
                            class="absolute top-0 right-0 p-2 text-gray-500 hover:text-brand-primary transition-colors hover:rotate-90 duration-300"
                        >
                            <X size={24} strokeWidth={1.5} />
                        </button>
                    </div>
                    
                    <div class="w-8 h-px bg-brand-primary mb-6 shadow-[0_0_8px_var(--color-brand-primary)]"></div>
                    
                    <p class="text-sm font-light text-gray-400 leading-relaxed overflow-y-auto max-h-[40vh] md:max-h-none pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {activeProject.description}
                    </p>
                </div>

                <div class="space-y-4 mt-8 pt-6 border-t border-border-color">
                    <button
                        onclick={() => activeProject?.live ? window.open(activeProject.live) : onMissing("Live demo not available")}
                        class="relative w-full group/btn overflow-hidden border border-brand-primary/50 hover:border-brand-primary transition-colors bg-brand-primary/5 hover:bg-brand-primary/10"
                    >
                        <div class="absolute inset-0 bg-brand-primary blur-md opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500"></div>
                        <div class="relative py-4 px-6 flex justify-between items-center text-brand-primary transition-all">
                            <span class="text-[10px] font-bold uppercase tracking-[0.2em]">Explore Site</span>
                            <ExternalLink size={14} class="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </div>
                    </button>
                    
                    <button
                        onclick={() => activeProject?.github ? window.open(activeProject.github) : onMissing("Project is under Private License")}
                        class="w-full py-4 px-6 border border-border-color flex justify-between items-center text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 group/git"
                    >
                        <span class="text-[10px] font-bold uppercase tracking-[0.2em]">View Source</span>
                        <i class="devicon-github-original opacity-50 group-hover/git:opacity-100 transition-opacity"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Custom animation for the restricted visual scanner */
    @keyframes scan {
        0% { transform: translateY(-100%); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(500%); opacity: 0; }
    }
</style>