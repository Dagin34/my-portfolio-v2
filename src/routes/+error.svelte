<script>
    import { goto } from '$app/navigation';
    import { MoveLeft } from 'lucide-svelte';
    import SEO from '$components/repetitive/SEO.svelte';
</script>

<svelte:head>
    <SEO
        title="Dagmawi Napoleon Bogale | 404 - Lost in Space (Ethiopia)"
    />
</svelte:head>

<div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
    <div class="absolute top-1/4 -left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]"></div>

    <div class="relative z-10 text-center px-6">
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[2.5rem] shadow-2xl">
            
            <h1 class="text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter text-white/5 select-none absolute left-1/2 -top-10 -translate-x-1/2 md:-top-20">
                404
            </h1>

            <div class="relative">
                <h2 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    You've drifted <span class="text-orange-500 italic font-serif">off-course.</span>
                </h2>
                <p class="text-gray-400 text-lg mb-10 max-w-sm mx-auto">
                    The project or page you're looking for has moved or doesn't exist.
                </p>

                <button
                    onclick={() => goto('/')}
                    class="group relative inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
                >
                    <MoveLeft class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    Back to Safety
                    
                    <span class="absolute inset-0 rounded-2xl bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </button>
            </div>
        </div>

        <div class="mt-8 font-mono text-xs opacity-40 uppercase tracking-[0.2em]">
            Error_Code: PAGE_NOT_FOUND // root/dagmawi.et
        </div>
    </div>
</div>