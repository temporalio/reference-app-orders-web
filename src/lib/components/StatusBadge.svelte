<script lang="ts">
	import { spaceBetweenCapitalLetters } from "$lib/utils/formatting";

	let { status } = $props();


	const formattedStatus =
		$derived(status === 'customerActionRequired'
			? spaceBetweenCapitalLetters('actionRequired')
			: spaceBetweenCapitalLetters(status))
</script>

<div class="rounded-md text-white px-4 max-w-fit py-1 mx-auto bg-gray-400 text-sm whitespace-nowrap font-bold {status}">
	{formattedStatus}
</div>

<style lang="postcss">
	@reference "tailwindcss";

	.booked {
		@apply bg-blue-400;
	}

	.dispatched {
		@apply bg-teal-400;
	}

	.customerActionRequired {
		@apply bg-rose-400;
	}

	.completed, .delivered {
		@apply bg-green-500;
	}

	.failed, .timedOut, .cancelled {
		@apply bg-rose-400;
	}
</style>
