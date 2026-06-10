<script lang='ts'>
    import { onMount } from 'svelte';
    import navLinks from '$lib/navigation';
    import { goto } from '$app/navigation';

    let scrolled = $state(false);
    let mobileMenuOpen = $state(false);

    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 20;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    });

    function handleNavigation(link: string) {
        const isNotRoot = typeof window !== 'undefined' && window.location.pathname === '/projects';

        if (link.startsWith('/#')) {
            if (!isNotRoot) {
                const targetId = link.slice(2);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } else {
                goto(link);
            }
        } else if (link.startsWith('/')) {
            goto(link);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    function toggleMenu() {
        mobileMenuOpen = !mobileMenuOpen;
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    }

    function closeMenu() {
        mobileMenuOpen = false;
        document.body.style.overflow = "";
    }
</script>

<!-- Floating Wrapper -->
<div
    class="fixed top-0 left-0 w-full z-100 transition-all duration-500 ease-in-out flex justify-center pointer-events-none
    {scrolled ? 'pt-4 px-4' : 'pt-0 px-0'}"
>
    <nav
        class="w-full transition-all duration-500 ease-in-out pointer-events-auto
        {scrolled
            ? 'max-w-5xl bg-white/6 backdrop-blur-xs border-2 border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.15)] px-8 py-4'
            : 'max-w-7xl bg-background/0 border-b border-border-color/10 px-8 py-5 md:py-6'}"
    >
        <div class="flex items-center justify-between">
            <a
                href="/"
                onclick={closeMenu}
                class="group flex items-center text-xl md:text-2xl font-semibold tracking-tighter relative z-120 transition-transform duration-300 active:scale-95"
            >
                <span
                    class="text-white group-hover:text-brand-primary transition-colors duration-300 ease-out"
                    >Dagmawi</span
                >
                <span
                    class="text-brand-primary group-hover:text-white transition-colors duration-300 ease-out"
                    >{".et"}</span
                >
            </a>

            <ul class="hidden md:flex items-center gap-1.5">
                {#each navLinks as link}
                    <li>
                        <button 
                            onclick={() => handleNavigation(link.href)} 
                            class="relative px-4 py-1.5 text-sm font-medium border border-transparent 
                                   text-white/80 hover:text-white hover:border-brand-primary/80 hover:bg-brand-primary/20
                                   transition-all duration-300 ease-out group flex items-center"
                        >
                            <span class="text-[10px] font-mono opacity-40 mr-1.5 transition-opacity duration-300 group-hover:opacity-75">{link.id}.</span>
                            {link.label}
                    </button>
                    </li>
                {/each}
            </ul>

            <!-- Mobile Menu Trigger -->
            <button
                onclick={toggleMenu}
                class="md:hidden relative z-120 p-2 text-white focus:outline-none group"
                aria-label="Toggle Menu"
            >
                <div class="w-6 h-5 relative flex flex-col justify-between">
                    <span
                        class="w-full h-px bg-white transition-all duration-300 {mobileMenuOpen
                            ? 'rotate-45 translate-y-2.25'
                            : 'group-hover:-translate-y-px'}"
                    ></span>
                    <span
                        class="w-full h-px bg-white transition-all duration-300 {mobileMenuOpen
                            ? 'opacity-0'
                            : 'group-hover:opacity-80'}"
                    ></span>
                    <span
                        class="w-full h-px bg-white transition-all duration-300 {mobileMenuOpen
                            ? '-rotate-45 -translate-y-2.5'
                            : 'group-hover:translate-y-px'}"
                    ></span>
                </div>
            </button>
        </div>
    </nav>
</div>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
    <div
        role="presentation"
        onclick={closeMenu}
        class="fixed inset-0 z-110 bg-background flex flex-col justify-center items-center md:hidden"
    >
        <div class="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div
                class="absolute left-1/4 top-0 h-full w-px bg-border-color"
            ></div>
            <div
                class="absolute right-1/4 top-0 h-full w-px bg-border-color"
            ></div>
            <div class="absolute inset-0 separator-pattern"></div>
        </div>

        <!-- Mobile Navigation Items (Translates right slightly on hover) -->
        <ul
            role="presentation"
            onclick={(e) => e.stopPropagation()}
            class="relative z-120 flex flex-col items-start gap-8 px-6 w-full max-w-xs"
        >
            {#each navLinks as link, i}
                <li class="overflow-hidden w-full">
                    <a
                        href={link.href}
                        onclick={closeMenu}
                        class="group flex items-baseline text-4xl sm:text-5xl font-light tracking-tighter text-white/70 hover:text-white transition-all duration-300 ease-out transform hover:translate-x-3"
                    >
                        <span
                            class="text-xs sm:text-sm font-mono text-brand-primary opacity-40 mr-4 transition-all duration-300 group-hover:opacity-100"
                            >0{i + 1}.</span
                        >
                        {link.label}
                    </a>
                </li>
            {/each}
        </ul>

        <div
            role="presentation"
            onclick={(e) => e.stopPropagation()}
            class="absolute bottom-12 flex gap-8 opacity-60 text-[10px] font-mono uppercase tracking-widest z-120"
        >
            <a
                href="https://github.com/dagin34"
                target="_blank"
                rel="noreferrer"
                class="hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >Github</a
            >
            <a
                href="https://linkedin.com/in/dagin34"
                target="_blank"
                rel="noreferrer"
                class="hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >LinkedIn</a
            >
            <a
                href="mailto:dagmawinapoleon02@gmail.com"
                class="hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-out"
                >Email</a
            >
        </div>
    </div>
{/if}