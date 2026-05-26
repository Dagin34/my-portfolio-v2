<script lang="ts">
    import allProjects, { type Project } from "$lib/projects";
    import ProjectFilters from "$components/projects-filter.svelte"; // Adjust path as necessary
    import ProjectsPopup from "$components/projects-popup.svelte";

    let { onMissing, fromHomePage, limit = 10 } = $props<{ 
        onMissing: (msg: string) => void; 
        fromHomePage: boolean | true;
        limit?: number; 
    }>();

    // Filter and Layout states
    let searchQuery = $state("");
    let selectedTech = $state("");
    let layout = $state<"grid" | "list">("grid");

    // Gather unique technologies dynamically from all projects
    const availableTechs = Array.from(
        new Set(allProjects.flatMap(p => p.tech || []))
    ).sort();

    // Filter projects based on query and selected technology, then apply slicing
    let filteredProjects = $derived(
        allProjects.filter(project => {
            const matchesSearch = !searchQuery || 
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.tech && project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
            
            const matchesTech = !selectedTech || 
                (project.tech && project.tech.includes(selectedTech));
            
            return matchesSearch && matchesTech;
        })
    );

    let projects = $derived(filteredProjects.slice(0, limit));
    let activeProject = $state<Project | null>(null);
        
    let currentImgIndex = $state(0);
    function openModal(p: Project) { 
        activeProject = p; 
        currentImgIndex = 0; 
    }
</script>

<section id="projects" class="my-auto border-t border-border-color">
    <!-- Header Area -->
    <div class="w-full px-8 lg:px-12 py-8 lg:py-18">
        {#if fromHomePage}
            <p class="text-brand-primary font-mono text-sm mb-4 tracking-widest uppercase">02. Selected Works</p>
            <h2 class="text-3xl md:text-5xl font-light tracking-tighter text-white leading-tight">
                Personal <br /> <span class="opacity-40 italic">Projects</span>
            </h2>
            <div class="mt-8 h-px w-20 bg-brand-primary opacity-50"></div>
        {:else}
            <h2 class="text-3xl md:text-5xl font-light tracking-tighter text-white leading-tight">
                Explore <br /> <span class="opacity-40 italic">My Creations</span>
            </h2>
            <div class="mt-8 h-px w-20 bg-brand-primary opacity-50"></div>
        {/if}
    </div>

    <!-- Dynamic Filter Component -->
    <ProjectFilters 
        bind:searchQuery={searchQuery}
        bind:selectedTech={selectedTech}
        bind:layout={layout}
        {availableTechs}
    />

    <!-- Project List / Grid View Wrapper -->
    {#if projects.length > 0}
        {#if layout === 'grid'}
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
                            <h3 class="text-2xl md:text-4xl font-light text-white group-hover:text-brand-primary transition-colors duration-300 tracking-tighter">
                                {project.title}
                            </h3>
                            <p class="text-xs md:text-sm text-gray-400 font-light mt-4 leading-relaxed max-w-sm line-clamp-2">
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
        {:else}
            <!-- Responsive List View -->
            <div class="flex flex-col border-t border-border-color">
                {#each projects as project}
                    <button 
                        onclick={() => openModal(project)}
                        class="group relative px-8 py-6 md:px-12 md:py-8 border-b border-border-color text-left hover:bg-white/2 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
                    >
                        <div class="relative z-10 flex-1 pr-0 md:pr-8">
                            <h3 class="text-xl md:text-2xl font-light text-white group-hover:text-brand-primary transition-colors duration-300 tracking-tighter">
                                {project.title}
                            </h3>
                            <p class="text-xs md:text-sm text-gray-400 font-light mt-2 leading-relaxed max-w-2xl line-clamp-2">
                                {project.description}
                            </p>
                        </div>
                        
                        {#if project.tech}
                            <div class="relative z-10 flex flex-wrap gap-2 md:justify-end md:max-w-xs h-fit">
                                {#each project.tech as t}
                                    <span class="text-[9px] font-mono border border-border-color px-2 py-0.5 opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {t}
                                    </span>
                                {/each}
                            </div>
                        {/if}
                    </button>
                {/each}
            </div>
        {/if}
    {:else}
        <!-- No Results Fallback -->
        <div class="flex flex-col items-center justify-center p-20 border-t border-b border-border-color text-center">
            <p class="text-sm font-light text-gray-500">No projects found matching the criteria.</p>
        </div>
    {/if}
</section>

{#if activeProject}
    <ProjectsPopup 
        onMissing={onMissing} 
        activeProject={activeProject} 
        onClose={() => (activeProject = null)} 
    />
{/if}