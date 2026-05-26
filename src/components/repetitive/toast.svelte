<script lang="ts">
    import { fly } from 'svelte/transition';
    import { backOut } from 'svelte/easing';
    import { MessageCircleCheck } from 'lucide-svelte';

    let { message = "Success!", visible = false, type = 'primary' } = $props<{
        message?: string;
        visible?: boolean;
        type?: string;
    }>();

    // Dynamically format the message string based on punctuation rules
    let formattedMessage = $derived.by(() => {
        const trimmed = message.trim();
        if (trimmed.endsWith('.') || trimmed.endsWith('!')) {
            return trimmed;
        }
        return `${trimmed}!`;
    });
</script>

{#if visible}
    <div class="fixed top-8 left-0 right-0 flex justify-center z-10001 pointer-events-none px-4">
        <div 
            class="pointer-events-auto relative flex items-center gap-4 px-6 py-4 bg-background/95 backdrop-blur-xl border border-success/30 border-l-4 border-l-success shadow-[0_15px_40px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(255,105,0,0.15)] overflow-hidden rounded-none"
            in:fly={{ y: -40, duration: 600, easing: backOut }} 
            out:fly={{ y: -20, opacity: 0 }}
        >
            <div class="absolute top-0 right-0 w-1.5 h-1.5 bg-success/40"></div>

            <div class="relative z-10 flex items-center gap-3">
                {#if type === 'primary'}
                    <span class="text-success font-mono text-xs select-none animate-pulse"><MessageCircleCheck size={18} /></span>
                {/if}
                <span class="text-white text-xs capitalize font-light tracking-[0.18em] whitespace-nowrap">
                    {formattedMessage}
                </span>
            </div>

            <div class="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,transparent_42%,transparent_42%,rgba(29,185,84,0.35)_50%,transparent_58%,transparent_100%)] -translate-x-full animate-[shimmer_4s_infinite] pointer-events-none"></div>
        </div>
    </div>
{/if}