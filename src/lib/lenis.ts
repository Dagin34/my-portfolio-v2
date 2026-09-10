import type Lenis from 'lenis';

/**
 * Lenis owns the viewport (see the `scroll-behavior: initial !important`
 * override in layout.css), so there must only ever be one of it. It is created
 * once by the root layout and reached for through `getLenis` / `scrollToTop`
 * everywhere else — anything calling `window.scrollTo` directly ends up
 * fighting the instance for control of the same scroll position.
 */
let instance: Lenis | null = null;
let frame = 0;
let destroyed = false;

export function getLenis(): Lenis | null {
	return instance;
}

export async function initLenis(): Promise<() => void> {
	// Guard against a second mount (HMR, or a stray call from a route) quietly
	// stacking another instance and another rAF loop on top of the live one.
	if (instance) return destroyLenis;

	destroyed = false;
	const { default: LenisModule } = await import('lenis');

	// A navigation can unmount the layout while the dynamic import is still in
	// flight; bailing here keeps an orphaned instance from being created.
	if (destroyed) return destroyLenis;

	instance = new LenisModule({
		// Velocity scaling (higher is smoother & slower)
		duration: 2.4,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		orientation: 'vertical',
		gestureOrientation: 'vertical',
		smoothWheel: true,

		// Slows down scroll step increments
		wheelMultiplier: 0.9,
		infinite: false
	});

	function raf(time: number) {
		instance?.raf(time);
		frame = requestAnimationFrame(raf);
	}

	frame = requestAnimationFrame(raf);

	return destroyLenis;
}

export function destroyLenis(): void {
	destroyed = true;
	cancelAnimationFrame(frame);
	instance?.destroy();
	instance = null;
}

/**
 * Jumps or glides the viewport to the top. `immediate` skips the easing
 * entirely — the page transition uses it to reset scroll while the overlay is
 * covering, so the new route is never seen mid-glide.
 */
export function scrollToTop(options: { immediate?: boolean } = {}): void {
	const { immediate = false } = options;

	if (instance) {
		instance.scrollTo(0, { immediate });
		return;
	}

	// Lenis is dynamically imported, so a very early click can land before it
	// exists. Native scrolling is the right fallback in that window.
	window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

/**
 * Scrolls to the element a URL hash points at, falling back to the top when the
 * hash is absent or matches nothing. The page transition needs this because it
 * resets scroll itself — going from /projects to `/#experience` has to land on
 * the section, not the top of the page.
 */
export function scrollToHash(hash: string | undefined, options: { immediate?: boolean } = {}): void {
	const { immediate = false } = options;

	let target: Element | null = null;
	try {
		target = hash ? document.querySelector(hash) : null;
	} catch {
		// A hash that isn't a valid selector is just a miss, not an error.
		target = null;
	}

	if (!target) {
		scrollToTop(options);
		return;
	}

	if (instance) {
		instance.scrollTo(target as HTMLElement, { immediate });
		return;
	}

	(target as HTMLElement).scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
}
