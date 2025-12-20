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

<nav 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-4 py-4 md:px-10"
    class:py-3={scrolled}
>
    <div 
        class="max-w-7xl mx-auto rounded-2xl transition-all duration-300 border border-transparent
        {scrolled ? 'bg-background/70 backdrop-blur-md border-white/10 shadow-lg px-6 py-3' : 'bg-transparent px-2 py-4'}"
    >
        <div class="flex items-center justify-between">
            <a href="/" class="group flex items-center text-2xl font-semibold tracking-tighter">
                <!-- <span class="text-orange-500 text-3xl font-light transition-transform group-hover:rotate-12">{'<'}</span> -->
                <span class="group-hover:text-orange-500 transition-all ease-in duration-150">Dagmawi</span>
                <span class="group-hover:text-white text-orange-500 transition-all ease-in duration-150">{'.et'}</span>
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
                            class="relative px-3 py-4 text-md font-medium transition-colors hover:text-orange-500 group"
                        >
                            <span class="text-[12px] font-mono opacity-50 mr-1">{link.id}.</span>
                            {link.label}
                            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-orange-500 transition-all group-hover:w-full"></span>
                        </a>
                    </li>
                {/each}
            </ul>

            <div class="md:hidden">
                <a href="#contact" class="bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors">
                    Hire Me
                </a>
            </div>
        </div>
    </div>
</nav>