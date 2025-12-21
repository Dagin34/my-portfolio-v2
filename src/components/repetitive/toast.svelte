<script>
    let { message, visible } = $props();
</script>

{#if visible}
    <div class="fixed bottom-10 left-1/2 -translate-x-1/2 z-200 px-6 py-3 border border-brand-primary bg-background text-white animate-bounce shadow-[0_0_20px_rgba(255,62,0,0.2)]">
        {message}
    </div>
{/if}