<script>
  import basketball from "$assets/about/basketball.jpg";
  import arbaminch from "$assets/about/arbaminch.jpg";
  import kuriftu from "$assets/about/kuriftu.jpg";
  import se7en from "$assets/about/se7en.jpg";

  // Using Svelte 5 runes for the item data
  let items = $state([
    { type: "img", src: kuriftu, area: "1/3", range: "2% 40%" },
    { type: "text", content: "Addis Ababa Based", area: "1/3", range: "2% 40%" },
    { type: "text", content: "Full Stack Dev", area: "3/3", range: "10% 40%" },
    { type: "text", content: "A2SVian", area: "4/2", range: "15% 40%" },
    { type: "text", content: "Backed by Google", area: "4/2", range: "20% 50%" },
    { type: "img", src: basketball, area: "2/2", range: "10% 50%" },
    { type: "text", content: "BasketBall Lover", area: "2/2", range: "10% 50%" },
    { type: "img", src: arbaminch, area: "2/3", range: "20% 70%" },
    { type: "text", content: "Problem Solver", area: "2/3", range: "20% 70%" },
    { type: "text", content: "Continuous Learner", area: "1/2", range: "16% 60%" },
    { type: "img", src: se7en, area: "3/1", range: "15% 50%" },
    { type: "text", content: "Movie Lover", area: "3/1", range: "15% 50%" },
    { type: "img", src: "./headshot.jpg", area: "4/3", range: "25% 70%" },
    { type: "text", content: "Dagmawi Napoleon", area: "4/3", range: "25% 70%" },
  ]);
</script>

<!-- Wrap in a very tall container (400vh) to allow scrolling to drive the animation -->
<section id="about" class="h-[600vh] relative border-b border-border-color">
  <div
    class="stuck-grid sticky top-0 h-screen w-full overflow-hidden flex justify-center items-center"
  >
    <!-- Center special text -->
    <div
      class="bg-white/5 p-8 border border-border-color grid-item special flex flex-col items-center justify-center text-center z-10"
      style="--range: -20% 70%; --area: 2 / 2 / span 2 / span 2;"
    >
      <p
        class="text-[10px] md:text-[12px] font-mono text-brand-primary uppercase tracking-[0.4em] opacity-80 mb-2"
      >
        Discover
      </p>
      <h2
        class="text-4xl md:text-7xl font-light tracking-tighter text-white leading-none"
      >
        More About <br /> <span class="text-brand-primary opacity-90">Me</span>
      </h2>
    </div>

    <!-- Floating dynamic items -->
    {#each items as item}
      <div
        class="grid-item flex items-center justify-center p-4"
        style="--range: {item.range}; --area: {item.area};"
      >
        {#if item.type === "text"}
          <div
            class="z-2 px-6 py-3 border border-border-color bg-black/50 backdrop-blur-sm shadow-xl"
          >
            <span
              class="text-xs md:text-sm font-mono text-gray-300 uppercase tracking-widest whitespace-nowrap"
            >
              {item.content}
            </span>
          </div>
        {:else if item.type === "img"}
          <div
            class="z-1 w-48 h-48 md:w-64 md:h-64 border border-border-color overflow-hidden shadow-2xl bg-black/20 p-2 transform -rotate-2 hover:rotate-0 transition-transform duration-500"
          >
            <img
              src={item.src}
              alt="About me detail"
              class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
            />
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>

<style>
  /* The 3D animation keyframes */
  @keyframes zoom-in {
    0% {
      transform: translateZ(-1000px) scale(0.5);
      opacity: 0;
      filter: blur(10px);
    }
    40%,
    60% {
      /* Holds in focus briefly in the middle of its timeline */
      transform: translateZ(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    100% {
      transform: translateZ(800px) scale(1.5);
      opacity: 0;
      filter: blur(10px);
    }
  }

  .stuck-grid {
    perspective: 1000px;
    transform-style: preserve-3d;
    display: grid;
    grid-template-columns: repeat(4, 25vw);
    grid-template-rows: repeat(4, 25vh);
    place-items: center;
  }

  .grid-item {
    transform-style: preserve-3d;
    grid-area: var(--area);
    /* Fallback for non-supporting browsers */
    opacity: 1;
  }

  /* Apply the scroll-timeline animations ONLY if the browser supports them */
  @supports (animation-timeline: scroll()) {
    .grid-item {
      opacity: 0; /* Hide initially, let animation reveal it */
      animation: zoom-in linear both;
      animation-timeline: scroll(root block);
      /* Inject the unique scroll ranges dynamically via the variable mapped in Svelte */
      animation-range: var(--range);
      will-change: transform, opacity, filter;
    }

    /* Prevent motion if user prefers reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .grid-item {
        animation: none;
        opacity: 1;
        transform: none !important;
        filter: none !important;
      }
      .stuck-grid {
        /* Simplify layout if reduced motion is enabled */
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        height: auto;
        position: relative;
      }
    }
  }
</style>
