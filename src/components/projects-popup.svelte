<script lang="ts">
    import { X } from "lucide-svelte";
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
</script>

<div class="fixed inset-0 z-100 flex items-center justify-center p-6 sm:p-12">
    <button
        onclick={onClose}
        class="absolute inset-0 bg-background/90 backdrop-blur-xl transition-all"
        aria-label="close-modal"
    ></button>

    <div
        class="relative max-w-5xl w-full border border-border-color bg-background shadow-2xl overflow-hidden"
    >
        <div class="flex flex-col md:flex-row h-full">
            <div
                class="w-full md:w-2/3 bg-black/50 aspect-video md:aspect-auto flex flex-col border-b md:border-b-0 md:border-r border-border-color"
            >
                {#if activeProject.images.length > 0}
                    <div class="relative flex-1 overflow-hidden group">
                        <img
                            src={activeProject.images[currentImgIndex]}
                            alt="Gallery"
                            class="object-cover w-full h-full"
                        />
                        <button
                            onclick={nextImg}
                            class="absolute inset-y-0 right-0 px-6 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-primary/20"
                        >
                            Next →
                        </button>
                    </div>
                    <div
                        class="p-4 flex gap-2 justify-center border-t border-border-color"
                    >
                        {#each activeProject.images as _, i}
                            <div
                                class="h-1 w-8 transition-all {i ===
                                currentImgIndex
                                    ? 'bg-brand-primary'
                                    : 'bg-white/10'}"
                            ></div>
                        {/each}
                    </div>
                {:else}
                    <div
                        class="flex-1 flex flex-col items-center justify-center p-12 opacity-20"
                    >
                        <div
                            class="w-full h-full border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center"
                        >
                            <span
                                class="text-xs font-mono uppercase tracking-widest"
                                >Visuals Restricted</span
                            >
                            <span class="text-[10px] mt-2"
                                >Confidential or Internal System</span
                            >
                        </div>
                    </div>
                {/if}
            </div>

            <div class="w-full md:w-1/3 p-8 flex flex-col justify-between">
                <div>
                    <div
                        class="flex justify-between items-center mb-6 relative"
                    >
                        <h2 class="text-3xl font-light tracking-tighter">
                            {activeProject.title}
                        </h2>
                        <button
                            onclick={onClose}
                            class="absolute top-0 right-0 text-xl opacity-50 hover:opacity-100 hover:text-brand-primary"
                            ><X size={22} /></button
                        >
                    </div>
                    <p
                        class="text-sm font-light text-gray-400 leading-relaxed mb-8"
                    >
                        {activeProject.description}
                    </p>
                </div>

                <div class="space-y-3">
                    <button
                        onclick={() =>
                            activeProject?.live
                                ? window.open(activeProject.live)
                                : onMissing("Live demo not available")}
                        class="w-full py-4 border border-brand-primary text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-primary hover:text-white transition-all"
                    >
                        Explore Site
                    </button>
                    <button
                        onclick={() =>
                            activeProject?.github
                                ? window.open(activeProject.github)
                                : onMissing("Project is under Private License")}
                        class="w-full py-4 border border-border-color text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                    >
                        View Source
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>