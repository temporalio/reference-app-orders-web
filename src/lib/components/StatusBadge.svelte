<script lang="ts">
	let { status } = $props();

	const capitalize = (word?: string): string => {
		if (!word) return '';
		return word[0].toUpperCase() + word.slice(1);
	};

	const spaceBetweenCapitalLetters = (word: string): string => {
		return capitalize(word)
			.replace(/([A-Z])/g, ' $1')
			.trim()
			.toUpperCase();
	};

	const formattedStatus =
		$derived(status === 'customerActionRequired'
			? spaceBetweenCapitalLetters('actionRequired')
			: spaceBetweenCapitalLetters(status))
</script>

<div class="border-2 text-black rounded-md px-4 max-w-fit py-0.5 mx-auto bg-green-300 text-sm whitespace-nowrap font-bold {status}">
	{formattedStatus}
</div>

<style>
	.customerActionRequired {
		background-color: lightcoral;
	}

	.failed {
		background-color: lightcoral;
	}
</style>
