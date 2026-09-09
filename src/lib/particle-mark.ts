/**
 * The particle engine behind the "DNB" mark.
 *
 * It owns glyph sampling and rendering, but deliberately owns *no* timeline —
 * callers drive it by handing `render()` a normalised progress value. That is
 * what lets the same engine serve two very different motions: the intro loader
 * runs it 0 -> 1 over ~1.8s, while the page transition runs it 0 -> 1, holds,
 * then 1 -> 0 in a few hundred milliseconds.
 */

export interface Vec {
	x: number;
	y: number;
}

/** Which way a particle is travelling: onto the mark, or away from it. */
export type Phase = 'enter' | 'exit';

interface Particle {
	hx: number; // Home — the sampled glyph pixel this particle draws
	hy: number;
	sx: number; // Enter — where it travels in from
	sy: number;
	ex: number; // Exit — where it comes apart to
	ey: number;
	delay: number; // 0..1, the slice of the timeline this particle waits out first
}

export interface MarkMetrics {
	width: number;
	height: number;
}

/** Produces an off-screen point for a particle whose home is (hx, hy). */
export type Trajectory = (hx: number, hy: number) => Vec;

export interface BuildOptions {
	fontSize: number;
	/** CSS size of the canvas being drawn into. */
	width: number;
	height: number;
	/** Top-left of the glyph bitmap within that canvas, in CSS px. */
	originX: number;
	originY: number;
	enter: Trajectory;
	exit: Trajectory;
	/** Fraction of the timeline spent staggering starts. 0 disables the stagger. */
	stagger?: number;
}

export interface ParticleMarkOptions {
	text?: string;
	tracking?: number;
	/** Ink colour, as the "r, g, b" body of an rgba() string. */
	rgb?: string;
}

/**
 * Particles are bucketed by how far along their own travel they are, so a field
 * of a couple of thousand still only costs a handful of fillStyle switches per
 * frame.
 */
const ALPHA_STEPS = 8;

const FONT_STACK = "'Poppins', sans-serif";

function easeOutCubic(t: number): number {
	return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number): number {
	return t * t * t;
}

function fontString(fontSize: number): string {
	return `900 ${fontSize}px ${FONT_STACK}`;
}

/** Matches the `clamp(5rem, 18vw, 13rem)` type treatment the mark replaced. */
export function fontSizeFor(viewportWidth: number): number {
	return Math.min(208, Math.max(80, viewportWidth * 0.18));
}

/**
 * The tight bounding box of the rendered glyphs. Callers need this before they
 * can size or position a canvas, so it is measurable without building.
 *
 * Only meaningful once Poppins has actually loaded — measuring earlier returns
 * the fallback face's metrics.
 */
export function measureMark(fontSize: number, text = 'DNB', tracking = 0.03): MarkMetrics | null {
	const measure = document.createElement('canvas').getContext('2d');
	if (!measure) return null;

	measure.font = fontString(fontSize);
	let width = 0;
	for (const char of text) {
		width += measure.measureText(char).width - fontSize * tracking;
	}
	// Tracking applies between glyphs, so the trailing one is added back.
	width += fontSize * tracking;

	return { width, height: fontSize * 1.2 };
}

export function createParticleMark(canvas: HTMLCanvasElement, options: ParticleMarkOptions = {}) {
	const text = options.text ?? 'DNB';
	const tracking = options.tracking ?? 0.03;
	const rgb = options.rgb ?? '255, 105, 0';

	const context = canvas.getContext('2d');

	let particles: Particle[] = [];
	let cssWidth = 0;
	let cssHeight = 0;
	let dotSize = 3;

	/**
	 * Samples the glyphs and assigns every particle a trajectory. This is the
	 * expensive half — a full getImageData plus a per-pixel walk — so callers
	 * that only need new trajectories should reach for `retarget` instead.
	 */
	function build(opts: BuildOptions): MarkMetrics | null {
		if (!context) return null;

		const { fontSize } = opts;
		const metrics = measureMark(fontSize, text, tracking);
		if (!metrics) return null;

		const step = Math.max(2, Math.min(4, Math.round(fontSize / 38)));
		dotSize = step * 0.75;

		const source = document.createElement('canvas');
		source.width = Math.ceil(metrics.width);
		source.height = Math.ceil(metrics.height);
		const sourceContext = source.getContext('2d', { willReadFrequently: true });
		if (!sourceContext) return null;

		sourceContext.fillStyle = '#fff';
		sourceContext.font = fontString(fontSize);
		sourceContext.textBaseline = 'middle';
		let cursor = 0;
		const baseline = metrics.height / 2 + fontSize * 0.1;
		for (const char of text) {
			sourceContext.fillText(char, cursor, baseline);
			cursor += sourceContext.measureText(char).width - fontSize * tracking;
		}

		const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data;
		const stagger = opts.stagger ?? 0;
		particles = [];

		for (let py = 0; py < source.height; py += step) {
			for (let px = 0; px < source.width; px += step) {
				if (pixels[(py * source.width + px) * 4 + 3] < 128) continue;

				const hx = opts.originX + px;
				const hy = opts.originY + py;
				const from = opts.enter(hx, hy);
				const to = opts.exit(hx, hy);

				particles.push({
					hx,
					hy,
					sx: from.x,
					sy: from.y,
					ex: to.x,
					ey: to.y,
					delay: stagger > 0 ? Math.random() * stagger : 0
				});
			}
		}

		cssWidth = opts.width;
		cssHeight = opts.height;

		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = Math.ceil(cssWidth * dpr);
		canvas.height = Math.ceil(cssHeight * dpr);
		context.setTransform(dpr, 0, 0, dpr, 0, 0);

		return metrics;
	}

	/**
	 * Reassigns where particles fly in from and come apart to, reusing the glyph
	 * sample already in hand. The page transition calls this on every navigation
	 * — the direction of travel is not known until the click happens, and
	 * re-sampling the bitmap each time would be pure waste.
	 */
	function retarget(enter: Trajectory, exit: Trajectory): void {
		for (const p of particles) {
			const from = enter(p.hx, p.hy);
			const to = exit(p.hx, p.hy);
			p.sx = from.x;
			p.sy = from.y;
			p.ex = to.x;
			p.ey = to.y;
		}
	}

	function render(progress: number, phase: Phase = 'enter'): void {
		if (!context) return;
		context.clearRect(0, 0, cssWidth, cssHeight);

		const buckets: number[][] = Array.from({ length: ALPHA_STEPS }, () => []);

		for (const p of particles) {
			// Particles that start later travel faster, so the whole field still
			// lands together on the beat.
			const span = 1 - p.delay || 1;
			const local = (progress - p.delay) / span;
			const t = local <= 0 ? 0 : Math.min(1, local);

			const entering = phase === 'enter';
			// Assembly decelerates into place; dispersal accelerates away. Easing
			// out in both directions makes the mark rush off-frame the instant it
			// starts coming apart, which leaves nothing on screen for the reveal
			// to show the incoming page through.
			const eased = entering ? easeOutCubic(t) : easeInCubic(t);
			const fromX = entering ? p.sx : p.hx;
			const fromY = entering ? p.sy : p.hy;
			const toX = entering ? p.hx : p.ex;
			const toY = entering ? p.hy : p.ey;

			// How *assembled* the particle is, whichever way it happens to be
			// going — drives size and opacity so dispersal reads as a fade-out
			// rather than a rewind.
			const assembly = entering ? eased : 1 - eased;

			buckets[Math.min(ALPHA_STEPS - 1, Math.floor(assembly * ALPHA_STEPS))].push(
				fromX + (toX - fromX) * eased,
				fromY + (toY - fromY) * eased,
				dotSize * (0.55 + 0.45 * assembly)
			);
		}

		buckets.forEach((bucket, index) => {
			if (bucket.length === 0) return;
			const alpha = 0.12 + (index / (ALPHA_STEPS - 1)) * 0.88;
			context.fillStyle = `rgba(${rgb}, ${alpha})`;
			for (let i = 0; i < bucket.length; i += 3) {
				context.fillRect(bucket[i], bucket[i + 1], bucket[i + 2], bucket[i + 2]);
			}
		});
	}

	function clear(): void {
		context?.clearRect(0, 0, cssWidth, cssHeight);
	}

	return {
		build,
		retarget,
		render,
		clear,
		get built(): boolean {
			return particles.length > 0;
		}
	};
}
