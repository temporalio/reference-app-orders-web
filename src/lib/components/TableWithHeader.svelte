<script lang="ts">
	import type { TableColumns, TableData } from '$lib/types/ui';
	import type { Snippet } from 'svelte';
	import Heading from './Heading.svelte';

	type Props = {
		title: string;
		description?: string;
		action?: Snippet;
		columns: TableColumns;
		data: TableData;
	};
	let { title, description, action, columns, data }: Props = $props();
	const pageSize = 50;

	let page = $state(1);
	const pageData = $derived(data.slice((page - 1) * pageSize, page * pageSize));

	const nextPage = () => {
		if (page * pageSize < data.length) {
			page += 1;
		}
	};

	const prevPage = () => {
		if (page > 1) {
			page -= 1;
		}
	};
</script>

<div class="px-4 sm:px-6 lg:px-8 w-full">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<Heading>{title}</Heading>
			{#if description}<p class="mt-2 text-sm text-gray-700">{description}</p>{/if}
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			{@render action?.()}
		</div>
	</div>
	<div class="mt-8 flow-root">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
				<div class="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-300">
						<thead class="bg-gray-50">
							<tr class="text-left">
								{#each columns as column, i}
									<th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900">
										{column.title}
									</th>
								{/each}
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							{#each pageData as row}
								<tr>
									{#each columns as column, index}
										<td
											class="px-3 py-4 text-sm whitespace-nowrap text-gray-700"
											class:w-full={index === 0}
										>
											{#if column.formatter}
												{@const formattedValue = column.formatter(row[column.key], row)}
												{#if typeof formattedValue === 'string'}
													{formattedValue}
												{:else}
													{@const FormattedComponents = formattedValue.type}
													<FormattedComponents {...formattedValue.props} />
												{/if}
											{:else}
												{row[column.key]}
											{/if}
										</td>
									{/each}
								</tr>
							{:else}
								<tr>
									<td colspan={columns.length} class="px-3 py-4 text-sm text-gray-500 text-center"
										>No data available</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
					<div class="flex items-center justify-between bg-gray-50 p-2">
						<p class="text-xs text-gray-700">
							{(page * pageSize - pageSize + 1).toLocaleString()} - {(
								page * pageSize
							).toLocaleString()} of {data.length.toLocaleString()}
						</p>
						<div class="flex flex-1 gap-2 justify-end">
							<button
								onclick={prevPage}
								class="relative cursor-pointer inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:outline-offset-0"
								>Previous</button
							>
							<button
								onclick={nextPage}
								class="relative cursor-pointer inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:outline-offset-0"
								>Next</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
