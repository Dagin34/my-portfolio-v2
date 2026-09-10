<script lang="ts">
  import { onMount } from "svelte";
  import { createParticleMark, fontSizeFor, measureMark } from "$lib/particle-mark";

  // TypeScript interface for Svelte 5 Props
  interface Props {
    onComplete?: () => void;
  }

  let { onComplete }: Props = $props();

  let isExiting = $state(false); // Manages slide-up transition
  let showLoader = $state(true); // Manages unmounting from DOM

  let canvas: HTMLCanvasElement;

  // Tight bounding box of the "DNB" glyphs — the DOM box the caption's spacing
  // is anchored to. The canvas itself is padded well beyond this and offset
  // by -pad so the wider scatter field overflows visually without pushing
  // any other layout around.
  let markWidth = $state(0);
  let markHeight = $state(0);
  let pad = $state(0);
  // The canvas's own CSS size (the padded field). Kept in state and folded into
  // the same reactive `style` string as left/top below — setting it imperatively
  // via canvas.style.width/height instead gets silently wiped out the next time
  // Svelte re-renders that attribute from the `pad`-driven template binding.
  let canvasCssWidth = $state(0);
  let canvasCssHeight = $state(0);

  const DURATION = 1800; // Matches the previous fill duration
  // The intro is a first-impression, not a toll booth: once it has played, the
  // page transition takes over for the rest of the tab's life.
  const VISIT_KEY = "dnb:intro-played";

  function introAlreadyPlayed(): boolean {
    try {
      return sessionStorage.getItem(VISIT_KEY) === "1";
    } catch {
      // Storage can throw outright under some privacy settings; falling back to
      // playing the intro is the harmless direction to fail in.
      return false;
    }
  }

  function rememberIntro(): void {
    try {
      sessionStorage.setItem(VISIT_KEY, "1");
    } catch {
      /* nothing to do — the intro simply plays again next navigation */
    }
  }

  onMount(() => {
    // Skipped before anything paints. The loader's backdrop and the page behind
    // it are both `bg-background`, so there is nothing to flash between them.
    if (introAlreadyPlayed()) {
      showLoader = false;
      onComplete?.();
      return;
    }
    rememberIntro();

    document.body.style.overflow = "hidden";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mark = createParticleMark(canvas);
    let frame = 0;

    function build() {
      const fontSize = fontSizeFor(window.innerWidth);
      const metrics = measureMark(fontSize);
      if (!metrics) return false;

      // Particles start scattered across a field padded well beyond the glyphs
      // themselves, so the intro reads as dust collecting in from all over,
      // not just drifting out from around each letter.
      const fieldPad = Math.min(fontSize * 1.6, window.innerWidth * 0.25, window.innerHeight * 0.25);
      const width = metrics.width + fieldPad * 2;
      const height = metrics.height + fieldPad * 2;

      const built = mark.build({
        fontSize,
        width,
        height,
        originX: fieldPad,
        originY: fieldPad,
        enter: reduceMotion
          ? (hx, hy) => ({ x: hx, y: hy })
          : () => ({ x: Math.random() * width, y: Math.random() * height }),
        // The intro only ever assembles; it exits by sliding the whole panel
        // away rather than by coming apart.
        exit: (hx, hy) => ({ x: hx, y: hy }),
        stagger: reduceMotion ? 0 : 0.4
      });
      if (!built) return false;

      pad = fieldPad;
      markWidth = metrics.width;
      markHeight = metrics.height;
      canvasCssWidth = width;
      canvasCssHeight = height;
      return true;
    }

    function finish() {
      // Hold at 100% briefly, then slide up to exit
      setTimeout(() => {
        isExiting = true;
        document.body.style.overflow = "";

        setTimeout(() => {
          showLoader = false;
          onComplete?.();
        }, 800); // Matches the exit duration
      }, 200);
    }

    function animate(startedAt: number) {
      function tick(now: number) {
        const elapsed = now - startedAt;
        mark.render(Math.min(elapsed / DURATION, 1));

        if (elapsed < DURATION) {
          frame = requestAnimationFrame(tick);
        } else {
          finish();
        }
      }
      frame = requestAnimationFrame(tick);
    }

    // Sampling before Poppins arrives would rasterise the fallback face instead
    document.fonts
      .load("900 100px Poppins")
      .catch(() => {})
      .then(() => {
        if (!build()) {
          // Nothing to draw — don't strand the page behind an empty loader.
          finish();
          return;
        }
        if (reduceMotion) {
          mark.render(1);
          finish();
        } else {
          animate(performance.now());
        }
      });

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  });
</script>

{#if showLoader}
  <div
    class="fixed inset-0 z-9999 flex flex-col justify-center items-center overflow-hidden bg-background transition-transform duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform"
    class:translate-y-[-100%]={isExiting}
    aria-live="polite"
    aria-busy="true"
  >
    <div class="flex flex-col items-center justify-center">
      <h1 class="sr-only">Dagmawi Napoleon Bogale</h1>

      <!-- Sized to the tight glyph box so the caption's spacing below stays fixed;
           the canvas itself overflows this box by -pad on every side to hold the
           wider scatter field without disturbing that layout. -->
      <div class="relative" style="width: {markWidth}px; height: {markHeight}px;">
        <canvas
          bind:this={canvas}
          aria-hidden="true"
          class="absolute"
          style="left: {-pad}px; top: {-pad}px; width: {canvasCssWidth}px; height: {canvasCssHeight}px;"
        ></canvas>
      </div>
    </div>
  </div>
{/if}

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
</style>
