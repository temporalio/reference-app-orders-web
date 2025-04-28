<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		loading?: boolean;
		onClick?: () => void;
	};
	let { type = 'button', disabled = false, loading = false, onClick, children }: Props = $props();
</script>

<button
	onclick={onClick}
	{type}
	{disabled}
	class="cursor-pointer block rounded-md min-w-24 transition-colors bg-blue-500 px-3 py-2 text-center text-base font-medium text-white shadow-xs hover:bg-blue-700/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
	class:disabled
	class:loading
>
	<div class="flex items-center justify-center">
		{#if loading}
			<div
				class="h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent mr-2"
			></div>
		{/if}
		{@render children()}
	</div>
</button>

<style lang="postcss">
	@reference "tailwindcss";
	.disabled {
		@apply opacity-50 cursor-not-allowed hover:bg-blue-700/50;
	}

	.loading {
		@apply relative cursor-wait;
	}
</style>
