<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Card from './Card.svelte';

	import Chart from 'chart.js/auto';

	let completions: HTMLCanvasElement;
	let workerCount: HTMLCanvasElement;
	let backlog: HTMLCanvasElement;

	let completionsChart: Chart;
	let workerCountChart: Chart;
	let backlogChart: Chart;

	let workerCountChartData = {
		labels: [] as string[],
		datasets: [
			{
				label: 'Order',
				data: [] as number[],
				borderColor: 'green',
				tension: 0.1
			},
			{
				label: 'Shipment',
				data: [] as number[],
				borderColor: 'blue',
				tension: 0.1
			},
			{
				label: 'Charge',
				data: [] as number[],
				borderColor: 'orange',
				tension: 0.1
			}
		]
	};

	let completeChartData = {
		labels: [] as string[],
		datasets: [
			{
				label: 'Order',
				data: [] as number[],
				borderColor: 'green',
				tension: 0.1
			}
		]
	};

	let backlogChartData = {
		labels: [] as string[],
		datasets: [
			{
				label: 'Order',
				data: [] as number[],
				borderColor: 'green',
				tension: 0.1
			},
			{
				label: 'Shipment',
				data: [] as number[],
				borderColor: 'blue',
				tension: 0.1
			},
			{
				label: 'Charge',
				data: [] as number[],
				borderColor: 'orange',
				tension: 0.1
			}
		]
	};

	let refreshInterval: number;

	const updateChartData = async () => {
		const now = new Date().toLocaleTimeString();

		workerCountChartData.labels = [...workerCountChartData.labels.slice(-20), now];
		completeChartData.labels = [...completeChartData.labels.slice(-20), now];
		backlogChartData.labels = [...backlogChartData.labels.slice(-20), now];

		const responses = await Promise.all([
			fetch('/api/order/stats'),
			fetch('/api/shipment/stats'),
			fetch('/api/charge/stats')
		]);

		const allStats = await Promise.all(responses.map((response) => response.json()));

		allStats.forEach((stats, i) => {
			let { workerCount, completeRate, backlog } = stats;
			if (completeRate != undefined) {
				completeChartData.datasets[i].data = [
					...completeChartData.datasets[i].data.slice(-20),
					completeRate
				];
			}
			workerCountChartData.datasets[i].data = [
				...workerCountChartData.datasets[i].data.slice(-20),
				workerCount
			];
			backlogChartData.datasets[i].data = [
				...backlogChartData.datasets[i].data.slice(-20),
				backlog
			];
		});

		workerCountChartData = workerCountChartData;
		completeChartData = completeChartData;
		backlogChartData = backlogChartData;

		completionsChart.update();
		workerCountChart.update();
		backlogChart.update();
	};

	onMount(() => {
		completionsChart = new Chart(completions, {
			type: 'line',
			data: completeChartData
		});
		workerCountChart = new Chart(workerCount, {
			type: 'line',
			data: workerCountChartData
		});
		backlogChart = new Chart(backlog, {
			type: 'line',
			data: backlogChartData
		});
		updateChartData();
		refreshInterval = setInterval(updateChartData, 10000);
	});

	onDestroy(() => {
		if (refreshInterval) clearInterval(refreshInterval);
	});
</script>

<Card>
	<div class="w-full p-4 flex flex-col gap-4">
		<h3 class="text-xl font-bold">Completions</h3>
		<div class="w-full"><canvas bind:this={completions}></canvas></div>
	</div>
</Card>
<Card>
	<div class="w-full p-4 flex flex-col gap-4">
		<h3 class="text-xl font-bold">Workers</h3>
		<div class="w-full"><canvas bind:this={workerCount}></canvas></div>
	</div>
	<div class="w-full p-4 flex flex-col gap-4">
		<h3 class="text-xl font-bold">Backlog</h3>
		<div class="w-full"><canvas bind:this={backlog}></canvas></div>
	</div>
</Card>
