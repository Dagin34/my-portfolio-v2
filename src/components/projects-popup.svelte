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

    // Svelte 5 effect to manage body scroll locks
    $effect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    });
</script>

<!-- Outer wrapper set to z-[9999] to clear any standard page content stacking -->
<div class="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 md:p-12" transition:fade={{ duration: 300 }}>
    <!-- Backdrop -->
    <button
        onclick={onClose}
        class="absolute inset-0 bg-black/90 backdrop-blur-xl transition-all"
        aria-label="close-modal"
    ></button>

    <!-- Modal Container -->
    <div
        class="relative w-full group"
        transition:fly={{ y: 40, duration: 600, easing: cubicOut }}
    >
        <!-- Glowing borders -->
        <div class="absolute -inset-px bg-linear-to-br from-transparent via-brand-primary to-transparent opacity-100 transition-all duration-1000 blur-sm z-0"></div>
        <div class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-primary to-transparent opacity-100 transition-opacity duration-1000 z-20"></div>

        <div class="relative z-10 w-full bg-[#030303] border border-border-color group-hover:border-brand-primary/30 transition-colors duration-700 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-auto max-h-212">
            
            <!-- Visuals Column -->
            <div class="w-full md:w-1/2 bg-black flex flex-col border-b md:border-b-0 md:border-r border-border-color relative overflow-hidden">
                {#if activeProject.images.length > 0}
                    <!-- Image Display -->
                    <div class="relative flex-1 overflow-hidden min-h-62.5 md:min-h-0 flex items-center justify-center bg-black">
                        {#key currentImgIndex}
                            <!-- 1. Ambient Background Layer -->
                            <img
                                src={activeProject.images[currentImgIndex]}
                                alt=""
                                class="absolute inset-0 object-cover w-full h-full opacity-40 blur-2xl scale-110 pointer-events-none transition-opacity duration-500"
                                aria-hidden="true"
                            />
                            
                            <!-- 2. Sharp Object-Contain Foreground Layer -->
                            <img
                                in:fade={{ duration: 400 }}
                                src={activeProject.images[currentImgIndex]}
                                alt="Gallery View"
                                class="relative z-10 max-w-full max-h-full object-contain select-none"
                            />
                        {/key}
                        
                        <!-- Click zones for image switching -->
                        <div class="absolute inset-0 z-20 flex">
                            <button onclick={prevImg} class="w-1/2 h-full flex items-center justify-start p-4 group/left outline-none" aria-label="Previous Image">
                                <div class="bg-black/60 p-2 border border-white/10 opacity-0 group-hover/left:opacity-100 transform -translate-x-4 group-hover/left:translate-x-0 transition-all backdrop-blur-sm hover:border-brand-primary/50 hover:text-brand-primary">
                                    <ChevronLeft size={20} />
                                </div>
                            </button>
                            <button onclick={nextImg} class="w-1/2 h-full flex items-center justify-end p-4 group/right outline-none" aria-label="Next Image">
                                <div class="bg-black/60 p-2 border border-white/10 opacity-0 group-hover/right:opacity-100 transform translate-x-4 group-hover/right:translate-x-0 transition-all backdrop-blur-sm hover:border-brand-primary/50 hover:text-brand-primary">
                                    <ChevronRight size={20} />
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Progress bar indicator -->
                    <div class="h-0.5 w-full bg-border-color flex relative z-30">
                        {#each activeProject.images as _, i}
                            <div class="h-full flex-1 transition-all duration-500 {i === currentImgIndex ? 'bg-brand-primary shadow-[0_0_10px_var(--color-brand-primary)]' : 'bg-transparent'}"></div>
                        {/each}
                    </div>
                {:else}
                    <!-- Restricted/Confidential view alternative -->
                    <div class="flex-1 flex flex-col items-center justify-center p-12 bg-[linear-linear(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[100%_4px]">
                        <div class="w-full h-full border border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden group/restricted">
                            <div class="absolute inset-x-0 top-0 h-[20%] bg-linear-to-b from-transparent to-brand-primary/10 opacity-0 group-hover/restricted:opacity-100 -translate-y-full group-hover/restricted:animate-[scan_2s_ease-in-out_infinite]"></div>
                            
                            <span class="text-xs font-mono text-brand-primary uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(var(--brand-primary),0.5)]">Visuals Restricted</span>
                            <span class="text-[10px] mt-3 font-mono text-gray-500 uppercase tracking-widest">Confidential / Internal</span>
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Content & Info Column -->
            <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col bg-[#030303] overflow-hidden">
                <!-- Header with Title and Close Button -->
                <div class="flex justify-between items-start mb-4 relative">
                    <div class="flex flex-col gap-1 pr-8">
                        <h2 class="text-2xl md:text-3xl font-light tracking-tighter text-white">
                            {activeProject.title}
                        </h2>
                        
                        <!-- Metadata elements (Role/Year) -->
                        {#if activeProject.role || activeProject.year}
                            <div class="flex gap-4 mt-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-500">
                                {#if activeProject.role}
                                    <span>Role: <span class="text-gray-300">{activeProject.role}</span></span>
                                {/if}
                                {#if activeProject.year}
                                    <span>Year: <span class="text-gray-300">{activeProject.year}</span></span>
                                {/if}
                            </div>
                        {/if}
                    </div>
                    
                    <button
                        onclick={onClose}
                        class="absolute top-0 right-0 p-2 text-gray-500 hover:text-brand-primary transition-colors hover:rotate-90 duration-300"
                        aria-label="Close"
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>
                
                <div class="w-8 h-px bg-brand-primary mb-6 shadow-[0_0_8px_var(--color-brand-primary)]"></div>
                
                <!-- Scrollable Body Content -->
                <div class="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    
                    <!-- Short description -->
                    <div>
                        <p class="text-sm font-light text-gray-300 leading-relaxed">
                            {activeProject.description}
                        </p>
                    </div>

                    <!-- Detailed Description -->
                    {#if activeProject.detailedDescription}
                        <div class="space-y-2">
                            <h4 class="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-primary">Scope & Objectives</h4>
                            <p class="text-xs font-light text-gray-400 leading-relaxed">
                                {activeProject.detailedDescription}
                            </p>
                        </div>
                    {/if}

                    <!-- Functionalities/Features list -->
                    {#if activeProject.features && activeProject.features.length > 0}
                        <div class="space-y-3">
                            <h4 class="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-primary">Key Functionalities</h4>
                            <ul class="grid grid-cols-1 gap-2.5">
                                {#each activeProject.features as feature}
                                    <li class="flex items-start gap-2.5 text-xs text-gray-400">
                                        <span class="text-brand-primary font-mono text-[10px] mt-0.5 select-none" aria-hidden="true">&gt;_</span>
                                        <span class="font-light leading-snug">{feature}</span>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    {/if}

                    <!-- Tech Stack badges -->
                    {#if activeProject.tech && activeProject.tech.length > 0}
                        <div class="space-y-2 pt-2">
                            <h4 class="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">Tech Stack</h4>
                            <div class="flex flex-wrap gap-1.5">
                                {#each activeProject.tech as techItem}
                                    <span class="text-[10px] font-mono px-2.5 py-1 bg-white/2 border border-white/10 text-gray-400 hover:border-brand-primary/30 hover:text-white transition-all duration-300">
                                        {techItem}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>

                <!-- Footer Action Buttons -->
                <div class="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-border-color">
                    <button
                        onclick={() => activeProject?.live ? window.open(activeProject.live) : onMissing("Live demo not available")}
                        class="relative group/btn overflow-hidden border border-brand-primary/50 hover:border-brand-primary transition-colors bg-brand-primary/5 hover:bg-brand-primary/10"
                    >
                        <div class="absolute inset-0 bg-brand-primary blur-md opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500"></div>
                        <div class="relative py-3.5 px-4 flex justify-between items-center text-brand-primary transition-all">
                            <span class="text-[9px] font-bold uppercase tracking-[0.2em]">Explore Site</span>
                            <ExternalLink size={12} class="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </div>
                    </button>
                    
                    <button
                        onclick={() => activeProject?.github ? window.open(activeProject.github) : onMissing("Project is under Private License")}
                        class="py-3.5 px-4 border border-border-color flex justify-between items-center text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 group/git"
                    >
                        <span class="text-[9px] font-bold uppercase tracking-[0.2em]">View Source</span>
                        <i class="devicon-github-original opacity-50 group-hover/git:opacity-100 text-sm transition-opacity"></i>
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