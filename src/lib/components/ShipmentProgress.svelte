<script lang="ts">
	let { status }: { status: string } = $props();

	const inactiveStatuses = ['pending', 'unavailable', 'cancelled', 'failed'];
	const activeStatuses = ['booked', 'dispatched', 'delivered'];

	const finalStatus = $derived(status || 'pending');
	const inactive = $derived(inactiveStatuses.includes(finalStatus))
	const statuses = $derived(inactive ? [finalStatus] : activeStatuses)
	const currentIndex = $derived(inactive ? 0 : activeStatuses.indexOf(finalStatus));
</script>

<ul class="list-style-none inline-flex px-4 relative overflow-hidden rounded-lg my-2">
	{#each statuses as s, index}
		<li
			class:active={!inactive && currentIndex === index - 1}
			class:completed={!inactive && currentIndex >= index}
			class:incomplete={!inactive && currentIndex < index}
			class:failed={s === 'failed'}
			class:pending={s === 'pending'}
			class:unavailable={s === 'unavailable'}
			class:cancelled={s === 'cancelled'}
			class:booked={s === 'booked'}
			class:dispatched={s === 'dispatched'}
			class:delivered={s === 'delivered'}
		>
			{s.toUpperCase()}
		</li>
	{/each}
</ul>

<style lang="postcss">
	@reference "tailwindcss";
	li {
		@apply px-4 py-1 text-sm font-bold relative z-1;
	}

	li::before {
		content: '';
		position: absolute;
		inset: 0;
		border-left: 2px solid black;
		transform: skew(30deg);
		z-index: -1;
	}

	li.completed::before {
		@apply bg-green-500;
	}

	li.active::before {
		animation-name: color;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-direction: alternate-reverse;
		animation-timing-function: ease;
	}

	@keyframes color {
		from {
			background-color: lightgoldenrodyellow;
		}
		to {
			background-color: #B9F8CF;
		}
	}
	li.pending::before {
		background: lightgoldenrodyellow;
	}

	li.incomplete::before,
	li.unavailable::before {
		background: lightgoldenrodyellow;
	}

	li.cancelled::before,
	li.failed::before {
		@apply bg-rose-400;
	}

	li:first-child {
		/* extend the first item leftward to fill the rest of the space */
		margin-left: -4rem;
		padding-left: 4rem;
	}

	li:last-child {
		/* extend the last item rightward to fill the rest of the space */
		margin-right: -2rem;
		padding-right: 2rem;
	}

	@media (max-width: 640px) {
		li {
			font-size: 0.75rem;
			padding: 0.5em 1em;
		}

		li:first-child {
			/* extend the first item leftward to fill the rest of the space */
			margin-left: -2rem;
			padding-left: 2rem;
		}

		li:last-child {
			/* extend the last item rightward to fill the rest of the space */
			margin-right: -2rem;
			padding-right: 2rem;
		}
	}
</style>
