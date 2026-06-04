<script>
  import navLinks from "$lib/navigation";
  
  // Dynamic year for the copyright block
  const currentYear = new Date().getFullYear();
  
  // Custom list of core expertise to fill out more space elegantly
  const services = [
    "Enterprise Solutions (ERP)",
    "Full Stack Architecture",
    "Database Optimization",
    "API Development & Integration",
    "Cloud Deployments"
  ];
</script>

<footer class="border-t border-border-color bg-background backdrop-blur-sm">
  <!-- Call to Action Banner / Top Footer Row -->
  <div class="border-b border-border-color">
    <div class="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-12">
      <div class="lg:col-span-8 p-8 md:p-16 flex flex-col justify-center">
        <span class="text-[10px] font-mono text-brand-primary uppercase tracking-[0.3em] mb-4 block">
          Get in Touch
        </span>
        <h3 class="text-3xl md:text-5xl font-light tracking-tighter text-white leading-tight max-w-2xl">
          Let's build systems that scale <br />and drive performance.
        </h3>
      </div>
      <div class="lg:col-span-4 p-8 md:p-16 border-t lg:border-t-0 lg:border-l border-border-color flex flex-col justify-center items-start lg:items-end">
        <!-- Live status indicator -->
        <div class="flex items-center gap-3 bg-white/5 border border-border-color px-4 py-3 rounded-full mb-6">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary/80 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
          </span>
          <span class="text-xs font-mono text-gray-300 tracking-wider uppercase">
            Available for select projects
          </span>
        </div>
        <a 
          href="mailto:dagmawinapoleon02@gmail.com" 
          class="text-sm font-mono text-white hover:text-brand-primary transition-colors border-b border-white hover:border-brand-primary pb-1"
        >
          dagmawinapoleon02@gmail.com &rarr;
        </a>
      </div>
    </div>
  </div>

  <!-- Main Navigation & Links Grid -->
  <div class="border-b border-border-color">
    <div class="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
      
      <!-- Brand & Bio Column -->
      <div class="p-8 md:p-12 lg:col-span-4 border-b md:border-b-0 md:border-r border-border-color">
        <a href="#home" class="text-2xl font-semibold tracking-tighter group inline-flex items-center">
          <span class="group-hover:text-brand-primary transition-colors">Dagmawi</span>
          <span class="text-brand-primary group-hover:text-white transition-colors">.et</span>
        </a>
        <p class="mt-6 text-xs md:text-sm font-light text-gray-400 leading-relaxed max-w-sm">
          Full Stack Developer specialized in building high-impact, high-performance ERP systems, custom integrations, and robust cloud architectures.
        </p>
      </div>

      <!-- Core Services / Expertise Column -->
      <div class="p-8 md:p-12 lg:col-span-3 border-b lg:border-b-0 lg:border-r border-border-color">
        <h4 class="text-[10px] font-mono text-brand-primary uppercase tracking-[0.2em] mb-6">
          Focus Area
        </h4>
        <ul class="space-y-3.5 text-xs md:text-sm font-light text-gray-400">
          {#each services as service}
            <li class="flex items-center gap-2">
              <span class="w-1 h-1 bg-brand-primary rounded-full opacity-60"></span>
              {service}
            </li>
          {/each}
        </ul>
      </div>

      <!-- Sitemap Column -->
      <div class="p-8 md:p-12 lg:col-span-2 border-b md:border-b-0 md:border-r border-border-color">
        <h4 class="text-[10px] font-mono text-brand-primary uppercase tracking-[0.2em] mb-6">
          Sitemap
        </h4>
        <ul class="space-y-4 text-xs md:text-sm font-light">
          {#each navLinks as navlink}
            <li>
              <a
                href={navlink.href}
                class="text-gray-400 hover:text-brand-primary transition-colors block"
              >
                {navlink.id}. {navlink.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Connect Column -->
      <div class="p-8 md:p-12 lg:col-span-3">
        <h4 class="text-[10px] font-mono text-brand-primary uppercase tracking-[0.2em] mb-6">
          Connect
        </h4>
        <ul class="space-y-4 text-xs md:text-sm font-light">
          <li>
            <a
              href="https://t.me/dagi_n34"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-brand-primary transition-colors flex items-center justify-between group"
            >
              <span>Telegram</span>
              <span class="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-mono">&nearr;</span>
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/dagin34"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-brand-primary transition-colors flex items-center justify-between group"
            >
              <span>LinkedIn</span>
              <span class="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-mono">&nearr;</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/dagin34"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-brand-primary transition-colors flex items-center justify-between group"
            >
              <span>GitHub</span>
              <span class="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-mono">&nearr;</span>
            </a>
          </li>
          <li>
            <a
              href="/resume.pdf"
              class="text-gray-400 hover:text-brand-primary transition-colors italic flex items-center justify-between group"
            >
              <span>Download CV</span>
              <span class="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-mono">&darr;</span>
            </a>
          </li>
        </ul>
      </div>

    </div>
  </div>

  <!-- Bottom Utility Bar -->
  <div class="bg-black/40">
    <div class="max-w-360] mx-auto flex flex-col md:flex-row justify-between items-center px-8 py-10 md:px-12 text-[10px] font-mono tracking-widest uppercase text-gray-500">
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
        <p>&copy; {currentYear} Dagmawi. All Rights Reserved.</p>
        <span class="hidden md:inline text-border-color">|</span>
        <p>Based in Addis Ababa, Ethiopia</p>
      </div>
      <p class="mt-4 md:mt-0 opacity-80">
        Designed & Developed by Me
      </p>
    </div>
  </div>
</footer>