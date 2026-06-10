<script>
  import { ArrowRight } from "lucide-svelte";
  import { getIconClass } from "$lib/technologies";

  const frontend_skills = [
    "Next.js",
    "React.js",
    "Svelte",
    "Svelte Kit",
    "JavaScript",
    "TypeScript",
    "TailwindCSS",
    "Framer",
    "Flutter",
    "React Native",
  ];
  const backend_skills = [
    "Python",
    "FastAPI",
    "Node.js",
    "Express.js",
    "Firebase",
    "BetterAuth",
    "MongoDB",
    "SQL",
    "SQLite",
    "PostgreSQL",
  ];
  const other_skills = [
    "Git",
    "Postman",
    "Docker",
    "Figma",
    "Selenium",
    "SEO optimization",
    "Adobe Illustrator",
    "Brand Design",
  ];
</script>

<section id="skills" class="my-auto border-t border-border-color">
  <div class="w-full px-8 lg:px-12 py-8 lg:py-18">
    <p class="text-brand-primary font-mono text-sm mb-4 tracking-widest uppercase">
      03. Technical Arsenal
    </p>
    <h2 class="text-3xl md:text-5xl font-light tracking-tighter text-white leading-tight">
      Skills and <br /> <span class="opacity-40 italic">Languages</span>
    </h2>

    <div class="mt-8 h-px w-20 bg-brand-primary opacity-50"></div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-border-color">
    <!-- Frontend Column -->
    <div class="p-10 border-r border-b border-border-color hover:bg-white/2 transition-colors">
      <h4 class="text-sm font-mono text-brand-primary mb-6 uppercase">
        Frontend Dev
      </h4>
      <ul class="space-y-3 grid grid-cols-2">
        {#each frontend_skills as item}
          <li class="flex items-center gap-2 group cursor-none mb-3">
            <span class="w-6 h-6 flex items-center justify-center text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-in">
              {#if getIconClass(item)}
                <i class="{getIconClass(item)} text-lg"></i>
              {:else}
                <ArrowRight size={14} />
              {/if}
            </span>
            <span class="text-sm md:text-lg font-light opacity-70 group-hover:opacity-100 transition-opacity">
              {item}
            </span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Backend Column -->
    <div class="p-10 border-r border-b border-border-color hover:bg-white/2 transition-colors">
      <h4 class="text-sm font-mono text-brand-primary mb-6 uppercase">
        Backend Dev
      </h4>
      <ul class="space-y-3 grid grid-cols-2">
        {#each backend_skills as item}
          <li class="flex items-center gap-2 group cursor-none mb-3">
            <span class="w-6 h-6 flex items-center justify-center text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
              {#if getIconClass(item)}
                <i class="{getIconClass(item)} text-lg"></i>
              {:else}
                <ArrowRight size={14} />
              {/if}
            </span>
            <span class="text-sm md:text-lg font-light opacity-70 group-hover:opacity-100 transition-opacity">
              {item}
            </span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Systems / DevOps / Others Column -->
    <div class="p-10 border-r border-b border-border-color hover:bg-white/2 transition-colors">
      <h4 class="text-sm font-mono text-brand-primary mb-6 uppercase">
        Systems, DevOps & Others
      </h4>
      <ul class="space-y-3 grid grid-cols-2">
        {#each other_skills as item}
          <li class="flex items-center gap-2 group cursor-none mb-3">
            <span class="w-6 h-6 flex items-center justify-center text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
              {#if getIconClass(item)}
                <i class="{getIconClass(item)} text-lg"></i>
              {:else}
                <ArrowRight size={14} />
              {/if}
            </span>
            <span class="text-sm md:text-lg font-light opacity-70 group-hover:opacity-100 transition-opacity">
              {item}
            </span>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="p-8 border border-border-color bg-white/1 flex flex-col md:flex-row justify-between items-center gap-8">
    <p class="text-xs md:text-sm font-light opacity-60 max-w-xl">
      Specializing in building scalable, resilient, high-performance systems
      with cloud-ready architectures. Experienced in leading Agile delivery with
      high impact.
    </p>
  </div>
</section>