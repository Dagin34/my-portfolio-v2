<script lang="ts">
    import allProjects, { type Project } from "$lib/projects";
    import ProjectFilters from "$components/projects-filter.svelte";
    import ProjectsPopup from "$components/projects-popup.svelte";
    import ProjectsFeatured from "$components/projects-featured.svelte";

    let { onMissing, fromHomePage } = $props<{
        onMissing: (msg: string) => void;
        fromHomePage: boolean;
    }>();

    // Filter and Layout states
    let searchQuery = $state("");
    let selectedTech = $state("");
    let layout = $state<"grid" | "list">("grid");

    // The showcase is curated in the data module via `featured`; everything
    // else falls through to the catalogue. Nothing is sliced off the end here —
    // the old `limit` prop meant `/projects` passed -1 and silently dropped the
    // last project from the page whose whole job is listing all of them.
    const featured = allProjects.filter((p) => p.featured);
    const catalogue = allProjects.filter((p) => !p.featured);

    // Gather unique technologies dynamically from all projects
    const availableTechs = Array.from(
        new Set(allProjects.flatMap((p) => p.tech || [])),
    ).sort();

    let isFiltering = $derived(Boolean(searchQuery.trim() || selectedTech));

    // While a filter is on, the showcase steps aside and the catalogue widens to
    // every project — otherwise searching for a featured one would come back
    // empty even though it is sitting right there on the page.
    let filteredProjects = $derived(
        (isFiltering ? allProjects : catalogue).filter((project) => {
            const matchesSearch =
                !searchQuery ||
                project.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                project.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (project.tech &&
                    project.tech.some((t) =>
                        t.toLowerCase().includes(searchQuery.toLowerCase()),
                    ));

            const matchesTech =
                !selectedTech ||
                (project.tech && project.tech.includes(selectedTech));

            return matchesSearch && matchesTech;
        }),
    );

    let activeProject = $state<Project | null>(null);

    function openModal(p: Project) {
        activeProject = p;
    }
</script>

<section id="projects" class="my-auto border-t border-border-color">
    <!-- Header Area -->
    <div class="w-full px-8 lg:px-12 py-8 lg:py-18">
        {#if fromHomePage}
            <p
                class="text-brand-primary font-mono text-sm mb-4 tracking-widest uppercase"
            >
                02. Selected Works
            </p>
            <h2
                class="text-3xl md:text-5xl font-light tracking-tighter text-white leading-tight"
            >
                Personal <br /> <span class="opacity-40 italic">Projects</span>
            </h2>
        {:else}
            <h2
                class="text-3xl md:text-5xl font-light tracking-tighter text-white leading-tight"
            >
                Explore <br />
                <span class="opacity-40 italic">My Creations</span>
            </h2>
        {/if}
    </div>

    <!-- Curated showcase: sticky panels that stack as you scroll through them. -->
    {#if !isFiltering}
        <ProjectsFeatured projects={featured} onOpen={openModal} />
    {/if}

    {#if !fromHomePage}
        <!-- Everything the showcase did not promote. -->
        <div
            class="flex items-baseline justify-between gap-4 border-t border-border-color px-8 lg:px-12 py-8 lg:py-12"
        >
            <h3
                class="text-2xl md:text-4xl font-light tracking-tighter text-white"
            >
                Full <span class="opacity-40 italic">Catalogue</span>
            </h3>
            <span class="font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
                {filteredProjects.length}
                {filteredProjects.length === 1 ? "project" : "projects"}
            </span>
        </div>

        <ProjectFilters
            bind:searchQuery
            bind:selectedTech
            bind:layout
            {availableTechs}
        />

    <!-- Project List / Grid View Wrapper -->
    {#if filteredProjects.length > 0}
        {#if layout === "grid"}
            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-border-color"
            >
                {#each filteredProjects as project}
                    <button
                        onclick={() => openModal(project)}
                        class="group relative p-10 border-r border-b border-border-color text-left hover:bg-white/2 transition-all duration-500 overflow-hidden"
                    >
                        <div
                            class="absolute -right-4 -bottom-4 text-9xl font-bold opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none uppercase italic"
                        >
                            {project.title.split(" ")[0]}
                        </div>

                        <div class="relative z-10">
                            <div class="flex flex-wrap items-center gap-x-2 mb-3 font-mono text-[10px] uppercase tracking-widest">
                                {#if project.year}
                                    <span class="text-brand-primary opacity-60">{project.year}</span>
                                {/if}
                                {#if project.year && project.role}
                                    <span class="text-gray-600">/</span>
                                {/if}
                                {#if project.role}
                                    <span class="text-gray-400">{project.role}</span>
                                {/if}
                            </div>
                            <h3
                                class="text-2xl md:text-4xl font-light text-white group-hover:text-brand-primary transition-colors duration-300 tracking-tighter"
                            >
                                {project.title}
                            </h3>
                            <p
                                class="text-xs md:text-sm text-gray-400 font-light mt-4 leading-relaxed max-w-sm line-clamp-2"
                            >
                                {project.description}
                            </p>

                            {#if project.tech}
                                <div class="mt-6 flex flex-wrap gap-2">
                                    {#each project.tech as t}
                                        <span
                                            class="text-[9px] font-mono border border-border-color px-2 py-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
                                        >
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
                {#each filteredProjects as project}
                    <button
                        onclick={() => openModal(project)}
                        class="group relative px-8 py-6 md:px-12 md:py-8 border-b border-border-color text-left hover:bg-white/2 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
                    >
                        <div class="relative z-10 flex-1 pr-0 md:pr-8">
                            <div class="flex flex-wrap items-center gap-x-2 mb-2 font-mono text-[10px] uppercase tracking-widest">
                                {#if project.year}
                                    <span class="text-brand-primary opacity-60">{project.year}</span>
                                {/if}
                                {#if project.year && project.role}
                                    <span class="text-gray-600">/</span>
                                {/if}
                                {#if project.role}
                                    <span class="text-gray-400">{project.role}</span>
                                {/if}
                            </div>
                            <h3
                                class="text-xl md:text-2xl font-light text-white group-hover:text-brand-primary transition-colors duration-300 tracking-tighter"
                            >
                                {project.title}
                            </h3>
                            <p
                                class="text-xs md:text-sm text-gray-400 font-light mt-2 leading-relaxed max-w-2xl line-clamp-2"
                            >
                                {project.description}
                            </p>
                        </div>

                        {#if project.tech}
                            <div
                                class="relative z-10 flex flex-wrap gap-2 md:justify-end md:max-w-xs h-fit"
                            >
                                {#each project.tech as t}
                                    <span
                                        class="text-[9px] font-mono border border-border-color px-2 py-0.5 opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                    >
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
        <div
            class="flex flex-col items-center justify-center p-20 border-t border-b border-border-color text-center"
        >
            <p class="text-sm font-light text-gray-500">
                No projects found matching the criteria.
            </p>
        </div>
    {/if}
    {/if}
    {#if fromHomePage}
        <a
            href="/projects"
            class="flex items-center justify-between p-12 group hover:bg-brand-primary transition-all duration-500 border border-border-color"
        >
            <span class="text-xl md:text-2xl font-light"
                >View Full Repertoire</span
            >
            <span
                class="text-4xl group-hover:translate-x-4 transition-transform"
                >→</span
            >
        </a>
    {/if}
</section>

{#if activeProject}
    <ProjectsPopup
        {onMissing}
        {activeProject}
        onClose={() => (activeProject = null)}
    />
{/if}
