<script>
    import { onMount } from 'svelte';

    // Svelte 5 Rune for state
    let scrolled = $state(false);

    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 20;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<nav class="fixed top-0 left-0 w-full z-50 transition-all bg-background duration-500 ease-in-out px-4 py-3 md:px-10 border-b border-border-color">
    <div class="max-w-7xl mx-auto rounded-2xl transition-all duration-300 border border-transparent px-6 py-3">
        <div class="flex items-center justify-between">
            <a href="/" class="group flex items-center text-2xl font-semibold tracking-tighter">
                <span class="group-hover:text-brand-primary transition-all ease-in duration-150">Dagmawi</span>
                <span class="group-hover:text-white text-brand-primary transition-all ease-in duration-150">{'.et'}</span>
            </a>

            <ul class="hidden md:flex items-center gap-2">
                {#each [
                    { id: '01', label: 'Projects', href: '#projects' },
                    { id: '02', label: 'Experience', href: '#experience' },
                    { id: '03', label: 'Skills', href: '#skills' },
                    { id: '04', label: 'Contact', href: '#contact' }
                ] as link}
                    <li>
                        <a 
                            href={link.href} 
                            class="relative px-3 py-4 text-md font-medium transition-colors hover:text-brand-primary group"
                        >
                            <span class="text-[12px] font-mono opacity-50 mr-1">{link.id}.</span>
                            {link.label}
                            <span class="absolute bottom-0 left-0 w-0 h-px bg-brand-primary transition-all group-hover:w-full"></span>
                        </a>
                    </li>
                {/each}
            </ul>

            <div class="md:hidden">
                <a href="#contact" class="bg-brand-primary text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-primary transition-colors">
                    Hire Me
                </a>
            </div>
        </div>
    </div>
</nav>