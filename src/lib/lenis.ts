import type Lenis from "lenis";

export async function handleLenisInit(lenisInstance: Lenis | null = null) {
    const initLenis = async () => {
        const { default: LenisModule } = await import("lenis");

        lenisInstance = new LenisModule({
            // Velocity scaling (higher is smoother & slower)
            duration: 2.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,

            // Slows down scroll step increments
            wheelMultiplier: 0.9,
            infinite: false,
        });

        function raf(time: number) {
            lenisInstance?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
        if (lenisInstance) {
            lenisInstance.destroy();
        }
    };
}