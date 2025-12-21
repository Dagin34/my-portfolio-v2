<script>
  export let position = 'left';
</script>

<div
  class={`absolute ${position}-0 top-0 h-full w-4 md:w-12 border border-border-color bg-background overflow-hidden`}
>
  <div class="absolute inset-0 separator-pattern"></div>
</div>

<style>
  .separator-pattern {
    background-image: repeating-linear-gradient(
      -45deg, 
      transparent,
      transparent 15px,
      rgba(255, 255, 255, 0.08) 15px,
      rgba(255, 255, 255, 0.08) 16px
    );
    width: 100%;
    height: 100%;
  }
</style>