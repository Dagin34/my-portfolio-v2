<script lang="ts">
  import { onMount } from "svelte";

  // TypeScript interface for Svelte 5 Props
  interface Props {
    onComplete?: () => void;
  }

  let { onComplete }: Props = $props();

  let fillProgress = $state(0); // Progress tracking variable (0 to 100)
  let isExiting = $state(false); // Manages slide-up transition
  let showLoader = $state(true); // Manages unmounting from DOM

  onMount(() => {
    // Disable scrolling on the main page while loading
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1800; // Duration of filling sequence (1.8 seconds)

    function animateFill(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      fillProgress = progress * 100;

      if (progress < 1) {
        requestAnimationFrame(animateFill);
      } else {
        // Hold at 100% briefly, then slide up to exit
        setTimeout(() => {
          isExiting = true;
          document.body.style.overflow = "";
          
          setTimeout(() => {
            showLoader = false;
            if (onComplete) onComplete();
          }, 800); // Matches the exit duration
        }, 200);
      }
    }

    requestAnimationFrame(animateFill);

    return () => {
      document.body.style.overflow = "";
    };
  });
</script>

{#if showLoader}
  <div 
    class="fixed inset-0 z-9999 flex flex-col justify-center items-center bg-background transition-transform duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform"
    class:translate-y-[-100%]={isExiting}
    aria-live="polite"
    aria-busy="true"
  >
    <div class="flex flex-col items-center justify-center">
      <!-- Water Wave Text Group -->
      <div class="relative text-[clamp(5rem,18vw,13rem)] font-black leading-none tracking-tighter select-none">
        <!-- Background Shadow Layer -->
        <span class="block text-white/3 [-webkit-text-stroke:1px_rgba(255,255,255,0.1)]">
          DNB
        </span>
        
        <!-- Animated Foreground Wave Layer -->
        <span 
          class="absolute inset-0 block text-brand-primary" 
          style="clip-path: inset({100 - fillProgress}% 0px 0px 0px); transition: clip-path 0.1s ease-out;"
        >
          DNB
        </span>
      </div>
      
      <!-- Loading Text -->
      <p class="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mt-6 animate-pulse">
        Initializing Portfolio
      </p>
    </div>
  </div>
{/if}