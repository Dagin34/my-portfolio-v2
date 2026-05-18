<script lang="ts">
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	// Svelte 5 props
	let { message = "Success!", visible = false, type = 'primary' } = $props();
</script>

{#if visible}
	<div class="toast-wrapper">
		<div 
			class="toast-pill" 
			in:fly={{ y: -40, duration: 600, easing: backOut }} 
			out:fly={{ y: -20, opacity: 0 }}
		>
			<!-- Brand Accent Line -->
			<div class="brand-line"></div>

			<div class="content">
				{#if type === 'primary'}
					<span class="icon">✦</span>
				{/if}
				<span class="message">{message}</span>
			</div>

			<!-- Subtle Glass Reflection -->
			<div class="reflection"></div>
		</div>
	</div>
{/if}

<style>
	.toast-wrapper {
		position: fixed;
		top: 2rem;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		z-index: 10001; /* Above the cursor */
		pointer-events: none;
	}

	.toast-pill {
		pointer-events: auto;
		position: relative;
		display: flex;
		align-items: center;
		padding: 0.6rem 1.5rem;
		gap: 12px;

		/* Colors from your brand */
		background: rgba(3, 7, 18, 0.85); /* var(--color-background) */
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		
		border: 1px solid var(--color-border-color);
		border-radius: 9999px;
		
		/* Sexy Shadow using Brand Orange */
		box-shadow: 
			0 10px 25px -5px rgba(0, 0, 0, 0.4),
			0 0 15px rgba(255, 105, 0, 0.1); 
            
		overflow: hidden;
	}

	.brand-line {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 40px;
		height: 2px;
		background: var(--color-brand-primary);
		border-radius: 0 0 4px 4px;
		box-shadow: 0 0 8px var(--color-brand-primary);
	}

	.content {
		display: flex;
		align-items: center;
		gap: 10px;
		z-index: 2;
	}

	.icon {
		color: var(--color-brand-primary);
		font-size: 1.2rem;
	}

	.message {
		color: var(--color-primary-text);
		font-family: var(--font-cooper-black);
		font-size: 0.9rem;
		letter-spacing: 0.03em;
		white-space: nowrap;
	}

	/* Sexy shimmer effect */
	.reflection {
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.05),
			transparent
		);
		animation: shimmer 4s infinite;
	}

	@keyframes shimmer {
		0% { left: -100%; }
		30% { left: 100%; }
		100% { left: 100%; }
	}
</style>