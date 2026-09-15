import { spring } from 'svelte/motion';

interface MagneticOptions {
	/** Fraction of the raw pointer offset from centre that becomes motion (0-1). */
	strength?: number;
	/** Hard cap on travel in either axis, in px. */
	max?: number;
}

/**
 * Nudges an element toward the pointer while it's hovered, using the same
 * `svelte/motion` spring primitive the custom cursor is built on — a snappy
 * pull in, an elastic settle back to rest on the way out.
 *
 * Listens on the element itself, not `window`: the cost is proportional to
 * time spent hovering the element, not every pointermove on the page. The
 * bounding rect is read once per hover session (on `pointerenter`), not on
 * every move, so the per-frame work is pure arithmetic — the same
 * measure-once-then-arithmetic shape used for the experience rail and the
 * projects showcase's scroll observers, just applied to the pointer instead
 * of the scroll position.
 *
 * A deliberate tradeoff of staying element-scoped: the pull only starts once
 * the cursor is actually over the element, not a few pixels early. Doing
 * better than that would need a `window`-level listener running for every nav
 * link on every mouse move across the whole page, which is exactly the kind
 * of global per-frame cost this codebase has been burned by twice already
 * (see the experience section and projects showcase history).
 */
export function magnetic(node: HTMLElement, options: MagneticOptions = {}) {
	const { strength = 0.35, max = 6 } = options;

	if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		// No-op: the element's own hover styles (color, border) still apply,
		// just no motion — matches how reduced-motion is handled everywhere
		// else in this codebase (checked once at init, not live-toggled).
		return {};
	}

	const offset = spring({ x: 0, y: 0 }, { stiffness: 0.25, damping: 0.55 });
	const unsubscribe = offset.subscribe(({ x, y }) => {
		node.style.transform = x || y ? `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)` : '';
	});

	let rect: DOMRect | null = null;

	function handleEnter() {
		rect = node.getBoundingClientRect();
	}

	function handleMove(e: PointerEvent) {
		if (!rect) rect = node.getBoundingClientRect();
		const dx = e.clientX - (rect.left + rect.width / 2);
		const dy = e.clientY - (rect.top + rect.height / 2);
		offset.set({
			x: Math.max(-max, Math.min(max, dx * strength)),
			y: Math.max(-max, Math.min(max, dy * strength))
		});
	}

	function handleLeave() {
		rect = null;
		offset.set({ x: 0, y: 0 });
	}

	node.addEventListener('pointerenter', handleEnter);
	node.addEventListener('pointermove', handleMove);
	node.addEventListener('pointerleave', handleLeave);

	return {
		destroy() {
			node.removeEventListener('pointerenter', handleEnter);
			node.removeEventListener('pointermove', handleMove);
			node.removeEventListener('pointerleave', handleLeave);
			unsubscribe();
		}
	};
}
