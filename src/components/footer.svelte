<script>
  import navLinks from "$lib/navigation";
</script>

<footer class=" border-t border-border-color bg-white/1">
  <div class="grid grid-cols-1 md:grid-cols-4 border-x border-border-color">
    <div
      class="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-color col-span-1 md:col-span-2"
    >
      <a
        href="#home"
        class="text-2xl font-semibold tracking-tighter group flex"
      >
        <span class="group-hover:text-brand-primary transition-colors"
          >Dagmawi</span
        >
        <span
          class="text-brand-primary group-hover:text-white transition-colors"
          >.et</span
        >
      </a>
      <p
        class="mt-6 text-xs md:text-sm font-light text-gray-400 leading-relaxed max-w-sm"
      >
        Full Stack Dev specialized in building high-impact, high-performance ERP
        systems.
      </p>
    </div>

    <div
      class="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-color"
    >
      <h4
        class="text-[10px] font-mono text-brand-primary uppercase tracking-[0.2em] mb-6"
      >
        Sitemap
      </h4>
      <ul class="space-y-4 text-sm font-light opacity-60">
        {#each navLinks as navlink}
          <li>
            <a
              href={navlink.href}
              class="hover:text-brand-primary hover:opacity-100 transition-all"
              >{navlink.id}. {navlink.label}</a
            >
          </li>
        {/each}
      </ul>
    </div>

    <div class="p-8 md:p-12">
      <h4
        class="text-[10px] font-mono text-brand-primary uppercase tracking-[0.2em] mb-6"
      >
        Connect
      </h4>
      <ul class="space-y-4 text-sm font-light opacity-60">
        <li>
          <a
            href="https://t.me/dagi_n34"
            target="_blank"
            class="hover:text-brand-primary hover:opacity-100 transition-all"
            >Telegram</a
          >
        </li>
        <li>
          <a
            href="https://linkedin.com/in/dagin34"
            target="_blank"
            class="hover:text-brand-primary hover:opacity-100 transition-all"
            >LinkedIn</a
          >
        </li>
        <li>
          <a
            href="https://github.com/dagin34"
            target="_blank"
            class="hover:text-brand-primary hover:opacity-100 transition-all"
            >GitHub
          </a>
        </li>
        <li>
          <a
            href="mailto:dagmawinapoleon02@gmail.com"
            class="hover:text-brand-primary hover:opacity-100 transition-all"
            >Email
          </a>
        </li>
        <li>
          <a
            href="/resume.pdf"
            class="hover:text-brand-primary hover:opacity-100 transition-all italic"
            >Download CV</a
          >
        </li>
      </ul>
    </div>
  </div>

  <div
    class="flex flex-col md:flex-row justify-between items-center p-8 border-t border-x border-border-color"
  >
    <p
      class="mt-4 md:mt-0 text-[10px] font-mono opacity-40 uppercase tracking-widest"
    >
      Designed and Developed by Me
    </p>
  </div>
</footer>
