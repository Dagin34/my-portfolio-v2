<script lang="ts">
    import { Github, Linkedin, Send, Instagram, Phone } from 'lucide-svelte';
    import { copyToClipboard } from "$lib/utils.ts";

    let { onMissing } = $props<{ onMissing: (msg: string) => void }>();
</script>

<section id="contact" class="min-h-[80vh] border-t border-border-color flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute left-1/4 top-0 h-full w-px bg-border-color"></div>
        <div class="absolute right-1/4 top-0 h-full w-px bg-border-color"></div>
    </div>

    <p class="text-brand-primary font-mono text-sm mb-6 uppercase tracking-[0.3em]">Ready to build?</p>
    
    <a target="_blank" href="mailto:dagmawinapoleon02@gmail.com" class="group relative">
        <h2 class="text-6xl md:text-9xl font-light tracking-tighter text-white hover:text-brand-primary transition-colors duration-500">
            Get in <span class="italic opacity-40 group-hover:opacity-100">Touch</span>
        </h2>
        <div class="absolute -bottom-4 left-0 w-0 h-1 bg-brand-primary transition-all duration-700 group-hover:w-full"></div>
    </a>

    <div class="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div class="p-6 border border-border-color text-left flex flex-col items-center justify-center">
            <p class="text-[10px] uppercase opacity-40 mb-2">Location</p>
            <p class="text-lg font-light">Addis Ababa, Ethiopia</p>
        </div>
        <div class="p-6 border border-border-color text-left">
            <div class="grid grid-cols-4 gap-2">
                <a target="_blank" href="https://github.com/dagin34" class="border border-border-color py-6 px-8 group flex flex-col gap-y-3 items-center justify-center">
                    <span class="group-hover:text-brand-primary"><Github size={20} /></span>
                    <span class="group-hover:text-brand-primary">GitHub</span>
                </a>
                <a target="_blank" href="https://linkedIn.com/in/dagin34" class="border border-border-color py-6 px-8 group flex flex-col gap-y-3 items-center justify-center">
                    <span class="group-hover:text-brand-primary"><Linkedin size={20} /></span>
                    <span class="group-hover:text-brand-primary">LinkedIn</span>
                </a>
                <a target="_blank" href="https://instagram.com/dagi_n34" class="border border-border-color py-6 px-8 group flex flex-col gap-y-3 items-center justify-center">
                    <span class="group-hover:text-brand-primary"><Instagram size={20} /></span>
                    <span class="group-hover:text-brand-primary">Instagram</span>
                </a>
                <a target="_blank" href="https://t.me/dagi_n34" class="border border-border-color py-6 px-8 group flex flex-col gap-y-3 items-center justify-center">
                    <span class="group-hover:text-brand-primary"><Send size={20} /></span>
                    <span class="group-hover:text-brand-primary">Telegram</span>
                </a>
            </div>
            <div 
                class="group p-6 border border-border-color flex gap-x-3 items-center text-left mt-8 cursor-pointer"
                onclick={() => {
                    copyToClipboard('+251931523923');
                    onMissing('Phone number copied to clipboard');
                }}
            >
                <span class="group-hover:text-brand-primary"><Phone size={20} /></span>
                <p class="group-hover:text-brand-primary text-lg font-light">+251 931 523 923</p>
            </div>
        </div>
    </div>
</section>