<script>
    import { onMount } from 'svelte';

    // Svelte 5 Runes for state management
    let scrolled = $state(false);
    let mobileMenuOpen = $state(false);

    const navLinks = [
        { id: '01', label: 'Projects', href: '#projects' },
        { id: '02', label: 'Experience', href: '#experience' },
        { id: '03', label: 'Skills', href: '#skills' },
        { id: '04', label: 'Contact', href: '#contact' }
    ];

    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 20;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    });

    function toggleMenu() {
        mobileMenuOpen = !mobileMenuOpen;
        // Prevent scrolling when menu is open
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    }

    function closeMenu() {
        mobileMenuOpen = false;
        document.body.style.overflow = '';
    }
</script>

<nav class="fixed top-0 left-0 w-full z-100 transition-all duration-500 ease-in-out px-4 py-3 md:px-10 border-b border-border-color 
    {scrolled ? 'bg-background/80 backdrop-blur-md py-2' : 'bg-background py-4'}">
    <div class="max-w-7xl mx-auto px-6 py-2">
        <div class="flex items-center justify-between">
            <a href="/" onclick={closeMenu} class="group flex items-center text-2xl font-semibold tracking-tighter relative z-200">
                <span class="group-hover:text-brand-primary transition-all ease-in duration-150">Dagmawi</span>
                <span class="group-hover:text-white text-brand-primary transition-all ease-in duration-150">{'.et'}</span>
            </a>

            <ul class="hidden md:flex items-center gap-2">
                {#each navLinks as link}
                    <li>
                        <a 
                            href={link.href} 
                            class="relative px-3 py-7 text-md font-medium transition-colors hover:text-brand-primary group"
                        >
                            <span class="text-[12px] font-mono opacity-50 mr-1">{link.id}.</span>
                            {link.label}
                            <span class="absolute bottom-0 left-0 w-0 h-px bg-brand-primary transition-all group-hover:w-full"></span>
                        </a>
                    </li>
                {/each}
            </ul>

            <button 
                onclick={toggleMenu}
                class="md:hidden relative z-110 p-2 text-white focus:outline-none"
                aria-label="Toggle Menu"
            >
                <div class="w-6 h-5 relative flex flex-col justify-between">
                    <span class="w-full h-px bg-white transition-all duration-300 {mobileMenuOpen ? 'rotate-45 translate-y-2.25' : ''}"></span>
                    <span class="w-full h-px bg-white transition-all duration-300 {mobileMenuOpen ? 'opacity-0' : ''}"></span>
                    <span class="w-full h-px bg-white transition-all duration-300 {mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}"></span>
                </div>
            </button>
        </div>
    </div>
</nav>

{#if mobileMenuOpen}
    <div 
        role="presentation"
        onclick={closeMenu}
        class="fixed inset-0 z-105 bg-background flex flex-col justify-center items-center md:hidden"
    >
        <div class="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div class="absolute left-1/4 top-0 h-full w-px bg-border-color"></div>
            <div class="absolute right-1/4 top-0 h-full w-px bg-border-color"></div>
            <div class="absolute inset-0 separator-pattern"></div>
        </div>

        <ul 
            role="presentation"
            onclick={(e) => e.stopPropagation()} 
            class="relative z-110 flex flex-col items-center gap-8"
        >
            {#each navLinks as link, i}
                <li class="overflow-hidden">
                    <a 
                        href={link.href} 
                        onclick={closeMenu}
                        class="block text-5xl font-light tracking-tighter text-white hover:text-brand-primary transition-all duration-300 transform"
                    >
                        <span class="text-sm font-mono text-brand-primary opacity-50 mr-4">0{i+1}.</span>
                        {link.label}
                    </a>
                </li>
            {/each}
        </ul>

        <div 
            role="presentation"
            onclick={(e) => e.stopPropagation()} 
            class="absolute bottom-12 flex gap-8 opacity-40 text-[10px] font-mono uppercase tracking-widest"
        >
            <a href="https://github.com/dagin34" target="_blank" class="hover:text-brand-primary transition-colors">Github</a>
            <a href="https://linkedin.com/in/dagin34" target="_blank" class="hover:text-brand-primary transition-colors">LinkedIn</a>
            <a href="mailto:dagmawinapoleon02@gmail.com" class="hover:text-brand-primary transition-colors">Email</a>
        </div>
    </div>
{/if}

<style>
    /* Ensure the diagonal pattern stays consistent with the rest of your app */
    .separator-pattern {
        background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 15px,
            rgba(255, 255, 255, 0.05) 15px,
            rgba(255, 255, 255, 0.05) 16px
        );
        width: 100%;
        height: 100%;
    }

    /* Transition helper if not using svelte/transition */
    :global(.fade-enter) { opacity: 0; }
    :global(.fade-exit) { opacity: 0; }
</style>