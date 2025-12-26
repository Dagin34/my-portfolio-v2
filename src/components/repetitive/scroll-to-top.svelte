<script>
    import { ArrowRight } from "lucide-svelte";
</script>

<button 
    onclick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
    class="fixed bottom-8 right-8 z-50 w-12 h-12 border border-border-color bg-white/10 flex items-center justify-center hover:border-brand-primary group transition-all"
>
    <span class="group-hover:-translate-y-1 transition-transform -rotate-90"><ArrowRight size={20} /></span>
</button>