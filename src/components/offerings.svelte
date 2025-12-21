<script>
  const frontend_skills = [
    "Next",
    "React",
    "Svelte",
    "Svelte Kit",
    "Java",
    "JavaScript",
    "TypeScript",
    "TailwindCSS",
    "HTML",
    "CSS",
    "Bootstrap",
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
    "ASP.NET",
    "Postman",
    "MongoDB",
    "SQL",
    "SQLite",
    "PostgreSQL",
  ];
  const other_skills = [
    "Github",
    "CI/CD",
    "Docker",
    "Figma",
    "RESTful API",
    "Selenium",
    "SEO optimization",
    "Adobe Illustrator",
    "Brand Design",
  ];
</script>

<section id="skills" class="py-24 border-t border-border-color">
  <div class="flex items-center gap-4 mb-12">
    <span class="h-px w-12 bg-brand-primary"></span>
    <p
      class="text-[12px] font-mono text-brand-primary uppercase tracking-[0.3em]"
    >
      03. Technical Arsenal
    </p>
  </div>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-border-color"
  >
    <div
      class="p-10 border-r border-b border-border-color hover:bg-white/2 transition-colors"
    >
      <h4 class="text-sm font-mono text-brand-primary mb-6 uppercase">
        Frontend Dev
      </h4>
      <ul class="space-y-3 grid grid-cols-2">
        {#each frontend_skills as item}
          <li class="flex items-center gap-2 group">
            <span
              class="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >→</span
            >
            <span class="text-lg font-light opacity-70 group-hover:opacity-100"
              >{item}</span
            >
          </li>
        {/each}
      </ul>
    </div>

    <div
      class="p-10 border-r border-b border-border-color hover:bg-white/2 transition-colors"
    >
      <h4 class="text-sm font-mono text-brand-primary mb-6 uppercase">
        Backend & Logic
      </h4>
      <ul class="space-y-3 grid grid-cols-2">
        {#each backend_skills as item}
          <li class="flex items-center gap-2 group">
            <span
              class="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >→</span
            >
            <span class="text-lg font-light opacity-70 group-hover:opacity-100"
              >{item}</span
            >
          </li>
        {/each}
      </ul>
    </div>

    <div
      class="p-10 border-r border-b border-border-color hover:bg-white/2 transition-colors"
    >
      <h4 class="text-sm font-mono text-brand-primary mb-6 uppercase">
        Systems, DevOps & Others
      </h4>
      <ul class="space-y-3 grid grid-cols-2">
        {#each other_skills as item}
          <li class="flex items-center gap-2 group">
            <span
              class="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >→</span
            >
            <span class="text-lg font-light opacity-70 group-hover:opacity-100"
              >{item}</span
            >
          </li>
        {/each}
      </ul>
    </div>

    <!-- <div class="p-10 border-r border-b border-border-color hover:bg-white/2 transition-colors">
            <h4 class="text-sm font-mono text-brand-primary mb-6 uppercase">Specialized</h4>
            <ul class="space-y-3">
                {#each ['AI/Machine Learning', 'Cloud Architecture', 'Agile Delivery', 'Systems Security'] as item}
                    <li class="flex items-center gap-2 group">
                        <span class="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        <span class="text-lg font-light opacity-70 group-hover:opacity-100">{item}</span>
                    </li>
                {/each}
            </ul>
        </div> -->
  </div>

  <div
    class="mt-12 p-8 border border-border-color bg-white/1 flex flex-col md:flex-row justify-between items-center gap-8"
  >
    <p class="text-sm font-light opacity-60 max-w-xl">
      Specializing in building scalable, resilient, high-performance systems
      with cloud-ready architectures. Experienced in leading Agile delivery with
      high impact.
    </p>
    <div class="flex gap-6">
      <div class="text-center">
        <span class="block text-3xl font-light text-brand-primary">40%</span>
        <span class="text-[10px] font-mono opacity-40 uppercase"
          >Manual Work Reduced
        </span>
      </div>
      <div class="text-center">
        <span class="block text-3xl font-light text-brand-primary">3.75</span>
        <span class="text-[10px] font-mono opacity-40 uppercase"
          >Cumulative GPA
        </span>
      </div>
    </div>
  </div>
</section>
