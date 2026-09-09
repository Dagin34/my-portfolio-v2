<script lang="ts">
  import { onMount } from "svelte";

  // TypeScript interface for Svelte 5 Props
  interface Props {
    onComplete?: () => void;
  }

  let { onComplete }: Props = $props();

  let isExiting = $state(false); // Manages slide-up transition
  let showLoader = $state(true); // Manages unmounting from DOM

  let canvas: HTMLCanvasElement = $state()!;

  // Tight bounding box of the "DNB" glyphs — the DOM box the caption's spacing
  // is anchored to. The canvas itself is padded well beyond this and offset
  // by -pad so the wider scatter field overflows visually without pushing
  // any other layout around.
  let markWidth = $state(0);
  let markHeight = $state(0);
  let pad = $state(0);

  const TEXT = "DNB";
  const DURATION = 1800; // Matches the previous fill duration
  // Negative tracking, matching the `tracking-tighter` treatment the mark used to have
  const TRACKING = 0.03;

  interface Particle {
    hx: number; // Home position — the sampled pixel this particle draws
    hy: number;
    sx: number; // Start position — scattered anywhere across the padded field
    sy: number;
    delay: number;
  }

  function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  onMount(() => {
    document.body.style.overflow = "hidden";

    const context = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dotSize = 3;
    let frame = 0;

    function build() {
      if (!context) return;

      // Same sizing logic as the `clamp(5rem, 18vw, 13rem)` type this replaces
      const fontSize = Math.min(208, Math.max(80, window.innerWidth * 0.18));
      const step = Math.max(2, Math.min(4, Math.round(fontSize / 38)));
      dotSize = step * 0.75;

      const measure = document.createElement("canvas").getContext("2d");
      if (!measure) return;
      measure.font = `900 ${fontSize}px Poppins, sans-serif`;
      let textWidth = 0;
      for (const char of TEXT) {
        textWidth += measure.measureText(char).width - fontSize * TRACKING;
      }
      textWidth += fontSize * TRACKING;
      const textHeight = fontSize * 1.2;

      // Particles start scattered across a field padded well beyond the glyphs
      // themselves, so the intro reads as dust collecting in from all over,
      // not just drifting out from around each letter.
      const fieldPad = Math.min(fontSize * 1.6, window.innerWidth * 0.25, window.innerHeight * 0.25);
      width = textWidth + fieldPad * 2;
      height = textHeight + fieldPad * 2;
      pad = fieldPad;
      markWidth = textWidth;
      markHeight = textHeight;

      const source = document.createElement("canvas");
      source.width = Math.ceil(textWidth);
      source.height = Math.ceil(textHeight);
      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      if (!sourceContext) return;

      sourceContext.fillStyle = "#fff";
      sourceContext.font = `900 ${fontSize}px 'Poppins', sans-serif`;
      sourceContext.textBaseline = "middle";
      let cursor = 0;
      const y = textHeight / 2 + fontSize * 0.1;
      for (const char of TEXT) {
        sourceContext.fillText(char, cursor, y);
        cursor += sourceContext.measureText(char).width - fontSize * TRACKING;
      }

      const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data;
      particles = [];

      for (let py = 0; py < source.height; py += step) {
        for (let px = 0; px < source.width; px += step) {
          if (pixels[(py * source.width + px) * 4 + 3] < 128) continue;

          particles.push({
            hx: pad + px,
            hy: pad + py,
            sx: reduceMotion ? pad + px : Math.random() * width,
            sy: reduceMotion ? pad + py : Math.random() * height,
            delay: reduceMotion ? 0 : Math.random() * DURATION * 0.4
          });
        }
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Bucketed by how far along its own convergence a particle is, so the whole
    // field still only costs a handful of fillStyle switches per frame.
    const ALPHA_STEPS = 8;

    function draw(now: number) {
      if (!context) return;
      context.clearRect(0, 0, width, height);

      const buckets: number[][] = Array.from({ length: ALPHA_STEPS }, () => []);

      for (const p of particles) {
        const local = now - p.delay;
        const travel = DURATION - p.delay || 1;
        const t = local <= 0 ? 0 : Math.min(1, local / travel);
        const eased = easeOutCubic(t);

        const x = p.sx + (p.hx - p.sx) * eased;
        const y = p.sy + (p.hy - p.sy) * eased;
        const size = dotSize * (0.55 + 0.45 * eased);
        const bucket = Math.min(ALPHA_STEPS - 1, Math.floor(eased * ALPHA_STEPS));

        buckets[bucket].push(x, y, size);
      }

      buckets.forEach((bucket, index) => {
        if (bucket.length === 0) return;
        const alpha = 0.12 + (index / (ALPHA_STEPS - 1)) * 0.88;
        context.fillStyle = `rgba(255, 105, 0, ${alpha})`;
        for (let i = 0; i < bucket.length; i += 3) {
          context.fillRect(bucket[i], bucket[i + 1], bucket[i + 2], bucket[i + 2]);
        }
      });
    }

    function finish() {
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

    function animate(startedAt: number) {
      function tick(now: number) {
        const elapsed = now - startedAt;
        draw(Math.min(elapsed, DURATION));

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
        build();
        if (reduceMotion) {
          draw(DURATION);
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
          style="left: {-pad}px; top: {-pad}px;"
        ></canvas>
      </div>

      <!-- Loading Text -->
      <p class="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mt-6 animate-pulse">
        Initializing Portfolio
      </p>
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
