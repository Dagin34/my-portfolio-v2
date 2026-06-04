<script lang="ts">
    import { Mail, ArrowRight, Loader } from "lucide-svelte";
    import { sendContactEmail } from "$lib/email";

    let { onMissing } = $props<{ 
        onMissing: (msg: string) => void;
    }>();

    let name = $state("");
    let email = $state("");
    let message = $state("");
    let selectedService = $state("Development");

    let isSending = $state(false);
    const services = ["Development", "Design", "Consulting", "Other"];

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        isSending = true;

        const response = await sendContactEmail({
            name,
            email,
            message,
            serviceType: selectedService
        });

        isSending = false;

        // Dispatches the message directly to your existing toast system
        onMissing(response.message);

        if (response.success) {
            // Reset input fields upon successful delivery
            name = "";
            email = "";
            message = "";
        }
    }
</script>

<section id="contact" class="my-auto mb-0! border-t border-b border-border-color">
    <!-- Header Block -->
    <div class="w-full px-8 lg:px-12 py-8 lg:py-18">
        <p class="text-brand-primary font-mono text-sm mb-4 tracking-widest uppercase">Connection</p>
        <h2 class="text-3xl md:text-5xl font-light tracking-tighter text-white leading-tight">
            Let's build <br /> <span class="opacity-40 italic">Together</span>
        </h2>
        <div class="mt-8 h-px w-20 bg-brand-primary opacity-50"></div>
    </div>

    <!-- Interface Body -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 border-l border-t border-border-color">
        
        <!-- Left Sidebar: Informational Callout -->
        <div class="lg:col-span-5 p-8 lg:p-12 border-r border-b lg:border-b-0 border-border-color flex flex-col justify-between space-y-12">
            <div class="max-w-sm">
                <p class="text-sm font-light text-white/70 leading-relaxed">
                    Have an idea, project blueprint, or integration goal? Get in touch to discuss technical parameters, scope details, and scheduling availability.
                </p>
            </div>

            <div class="space-y-4">
                <div class="flex items-center gap-4 text-xs font-mono text-white">
                    <Mail size={16} class="text-brand-primary" />
                    <span class="tracking-wide">dagmawinapoleon02@gmail.com</span>
                </div>
                <div class="text-[10px] text-white/70 font-mono tracking-wider">
                    Average Response Time: <span class="text-brand-primary">12hrs</span>
                </div>
            </div>
        </div>

        <!-- Right Side: Interactive Request Form -->
        <form 
            onsubmit={handleSubmit}
            class="lg:col-span-7 p-8 lg:p-12 border-r border-border-color space-y-8 bg-black/10 backdrop-blur-sm"
        >
            <!-- Service Tag Selection -->
            <div class="space-y-3">
                <div class="flex flex-wrap gap-2">
                    {#each services as service}
                        <button
                            type="button"
                            onclick={() => selectedService = service}
                            class="bg-white/10 px-3 py-1.5 border font-mono text-[9px] uppercase tracking-wider transition-all duration-300 {selectedService === service ? 'border-brand-primary text-brand-primary bg-brand-primary/5' : 'border-border-color hover:border-brand-primary/50 text-white/70 hover:text-white opacity-60 hover:opacity-100'}"
                        >
                            {service}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Input Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div class="relative">
                    <input 
                        type="text" 
                        bind:value={name}
                        placeholder="Name" 
                        required
                        disabled={isSending}
                        class="w-full bg-black/10 pl-4 border-b border-white/20 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-brand-primary transition-colors disabled:opacity-40"
                    />
                </div>
                <div class="relative">
                    <input 
                        type="email" 
                        bind:value={email}
                        placeholder="Email Address" 
                        required
                        disabled={isSending}
                        class="w-full bg-black/10 pl-4 border-b border-white/20 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-brand-primary transition-colors disabled:opacity-40"
                    />
                </div>
            </div>

            <div class="relative">
                <textarea 
                    bind:value={message}
                    placeholder="Provide details about your project specifications or objectives..." 
                    rows="4"
                    required
                    disabled={isSending}
                    class="w-full bg-black/10 pl-4 border-b border-white/20 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-brand-primary transition-colors resize-none disabled:opacity-40"
                ></textarea>
            </div>

            <!-- Submission Area -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                    type="submit"
                    disabled={isSending}
                    class="min-w-full py-4 px-6 border border-brand-primary text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-brand-primary flex items-center justify-center gap-2"
                >
                    {#if isSending}
                        <Loader class="animate-spin" size={12} />
                        <span>Sending Request</span>
                    {:else}
                        <span>Submit Inquiry</span>
                        <ArrowRight size={12} />
                    {/if}
                </button>
            </div>
        </form>

    </div>
</section>