<script lang="ts">
    import { Mail, ArrowRight, Loader } from "lucide-svelte";
    import { sendContactEmail } from "$lib/email";
    import { copyToClipboard } from "$utils/utils";

    let { onMissing } = $props<{ 
        onMissing: (msg: string) => void;
    }>();

    let name = $state("");
    let email = $state("");
    let message = $state("");
    let selectedService = $state("Development");

    let isSending = $state(false);
    const services = ["Development", "Design", "Consulting", "Other"];

    function copyEmail(){
        copyToClipboard('dagmawinapoleon02@gmail.com');
        onMissing('Address copied to Clipboard!')
    }

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

<section id="contact" class="relative py-20 lg:py-32 border border-border-color overflow-hidden">
    <!-- Subtle organic background glow -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--color-brand-primary-rgb,255,255,255),0.02),transparent_45%)] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-0 lg:px-6">
        
        <!-- Section Header -->
        <div class="mb-12 lg:mb-16 max-lg:px-6">
            <span class="text-brand-primary font-mono text-xs uppercase tracking-[0.25em] block mb-3">Connection</span>
            <h2 class="text-4xl md:text-6xl tracking-tight text-white leading-none">
                Let's build <span class="text-transparent bg-clip-text bg-brand-primary/40 uppercase">together</span>
            </h2>
        </div>

        <!-- Integrated Interface Card -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white/1 border border-white/10 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
            
            <!-- Left Info Panel -->
            <div class="lg:col-span-5 p-5 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between space-y-12">
                <div class="space-y-4">
                    <h3 class="text-lg font-medium text-white">Project Scope</h3>
                    <p class="text-sm font-light text-white/50 leading-relaxed max-w-sm">
                        Have an idea, project blueprint, or integration goal? Get in touch to discuss technical parameters, scope details, and availability.
                    </p>
                </div>

                <div class="space-y-6">
                    <div class="flex items-center gap-3.5 text-xs text-white/80 group">
                        <div class="p-2.5 bg-white/3 border border-white/5 group-hover:border-brand-primary/30 group-hover:bg-brand-primary/2 transition-colors duration-300">
                            <Mail size={16} class="text-brand-primary" />
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[10px] uppercase tracking-wider font-mono text-white/30">Direct Email</span>
                            <button 
                                class="text-white font-medium transition-colors group-hover:text-brand-primary"
                                onclick={copyEmail}
                            >dagmawinapoleon02@gmail.com</button>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        <span>Average Response</span>
                        <span class="text-brand-primary font-bold">~12 Hours</span>
                    </div>
                </div>
            </div>

            <!-- Right Form Panel -->
            <form 
                onsubmit={handleSubmit}
                class="lg:col-span-7 p-5 lg:p-12 space-y-8 bg-white/1"
            >
                <div class="space-y-3">
                    <span class="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Select Service</span>
                    <div class="flex flex-wrap gap-2">
                        {#each services as service}
                            <button
                                type="button"
                                onclick={() => selectedService = service}
                                class="px-4 py-2 border text-xs font-medium tracking-wide transition-all duration-300
                                       {selectedService === service 
                                           ? 'border-brand-primary bg-brand-primary/10 text-brand-primary shadow-[0_0_15px_rgba(var(--brand-primary-rgb,255,255,255),0.1)]' 
                                           : 'border-white/10 hover:border-white/20 text-white/60 hover:text-white bg-white/1'}"
                            >
                                {service}
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Input Fields Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div class="space-y-2">
                        <span class="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Your Name</span>
                        <input 
                            type="text" 
                            bind:value={name}
                            placeholder="John Doe" 
                            required
                            disabled={isSending}
                            class="w-full bg-white/2 border border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 px-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none transition-all disabled:opacity-40"
                        />
                    </div>
                    <div class="space-y-2">
                        <span class="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Email Address</span>
                        <input 
                            type="email" 
                            bind:value={email}
                            placeholder="john@example.com" 
                            required
                            disabled={isSending}
                            class="w-full bg-white/2 border border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 px-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none transition-all disabled:opacity-40"
                        />
                    </div>
                </div>

                <!-- Textarea Message Field -->
                <div class="space-y-2">
                    <span class="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Project Details</span>
                    <textarea 
                        bind:value={message}
                        placeholder="Tell me about your specifications, objectives, and timeline details..." 
                        rows="4"
                        required
                        disabled={isSending}
                        class="w-full bg-white/2 border border-white/10 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 px-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none transition-all resize-none disabled:opacity-40"
                    ></textarea>
                </div>

                <!-- Rounded Submit Action Button -->
                <div class="pt-4">
                    <button
                        type="submit"
                        disabled={isSending}
                        class="w-full py-4 px-6 border border-brand-primary bg-brand-primary/5 hover:bg-brand-primary text-brand-primary hover:text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-brand-primary flex items-center justify-center gap-2"
                    >
                        {#if isSending}
                            <Loader class="animate-spin" size={14} />
                            <span>Sending Request</span>
                        {:else}
                            <span>Submit Inquiry</span>
                            <ArrowRight size={14} />
                        {/if}
                    </button>
                </div>
            </form>

        </div>
    </div>
</section>