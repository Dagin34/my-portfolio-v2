<script lang="ts">
    import { Search, LayoutGrid, List } from "lucide-svelte";

    let {
        searchQuery = $bindable(""),
        selectedTech = $bindable(""),
        layout = $bindable("grid"),
        availableTechs = []
    } = $props<{
        searchQuery: string;
        selectedTech: string;
        layout: "grid" | "list";
        availableTechs: string[];
    }>();
</script>

<div class="border-t border-b border-border-color bg-background/50 backdrop-blur-sm px-8 lg:px-12 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
    <!-- Search and Tech Filter Group -->
    <div class="flex flex-col sm:flex-row w-full md:w-auto gap-3 items-stretch sm:items-center flex-1 max-w-2xl">
        <!-- Search Input -->
        <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 opacity-40" size={16} />
            <input 
                type="text" 
                bind:value={searchQuery}
                placeholder="Search projects by title, description, or tech..." 
                class="w-full bg-transparent border border-border-color pl-10 pr-4 py-2.5 text-xs text-white font-light focus:outline-none focus:border-brand-primary/50 transition-colors placeholder:text-gray-500"
            />
        </div>

        <!-- Tech Dropdown Selector -->
        <div class="relative min-w-[160px]">
            <select 
                bind:value={selectedTech}
                class="w-full bg-background border border-border-color px-4 py-2.5 text-xs text-white font-light focus:outline-none focus:border-brand-primary/50 transition-colors appearance-none cursor-pointer"
            >
                <option value="">All Technologies</option>
                {#each availableTechs as tech}
                    <option value={tech}>{tech}</option>
                {/each}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 opacity-40">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    </div>

    <!-- Layout Switcher -->
    <div class="flex items-center gap-1 border border-border-color p-1 self-end md:self-auto">
        <button 
            onclick={() => layout = 'grid'} 
            class="p-2 transition-colors {layout === 'grid' ? 'text-brand-primary bg-white/5' : 'text-gray-400 opacity-60 hover:opacity-100'}"
            aria-label="Grid View"
        >
            <LayoutGrid size={16} />
        </button>
        <button 
            onclick={() => layout = 'list'} 
            class="p-2 transition-colors {layout === 'list' ? 'text-brand-primary bg-white/5' : 'text-gray-400 opacity-60 hover:opacity-100'}"
            aria-label="List View"
        >
            <List size={16} />
        </button>
    </div>
</div>