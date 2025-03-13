<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Line } from 'svelte-chartjs';
	import { goto, invalidateAll } from '$app/navigation';
	import {
		Chart as ChartJS,
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	} from 'chart.js';

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	export let data;

	$: ({ running, config } = data);

	let completeChartData = {
		labels: [],
		datasets: [
			{
				label: 'Order Complete RPS',
				data: [],
				borderColor: 'green',
				tension: 0.1
			},
		]
	};

	let backlogChartData = {
		labels: [],
		datasets: [
			{
				label: 'Order Backlog',
				data: [],
				borderColor: 'red',
				tension: 0.1
			},
		]
	};

	let refreshInterval: number;

	const updateChartData = async() => {
		const response = await fetch('/api/order/stats');
		const { completeRate, backlog } = await response.json();

		const now = new Date().toLocaleTimeString();

		completeChartData.labels = [...completeChartData.labels.slice(-20), now];
		backlogChartData.labels = [...backlogChartData.labels.slice(-20), now];
		completeChartData.datasets[0].data = [...completeChartData.datasets[0].data.slice(-20), completeRate];
		backlogChartData.datasets[0].data = [...backlogChartData.datasets[0].data.slice(-20), backlog];
		chartData = chartData; // trigger reactivity
	}

	onMount(() => {
			updateChartData();
			refreshInterval = setInterval(updateChartData, 10000);
	});

	onDestroy(() => {
			if (refreshInterval) clearInterval(refreshInterval);
	});

	const onStop = async () => {
		await fetch('/api/load-generator', { method: 'POST', body: JSON.stringify({ action: 'stop' }) });
		await invalidateAll();
	};

	const onStart = async () => {
		await fetch('/api/load-generator', { method: 'POST', body: JSON.stringify({ action: 'start', config }) });
		await invalidateAll();
	};

  const onToggle = async () => {
    if (running) {
      await onStop();
    } else {
      await onStart();
    }
  }
</script>

<div class="flex flex-col gap-4 items-center justify-start">
	<h1>Operator</h1>
	<div class="flex gap-2 w-full">
		<div class="w-full p-4 flex flex-col gap-4 bg-white border border-black rounded">
			<h3 class="text-xl font-bold">Load Testing</h3>
			<p>
				Orders per second: <strong>{config.ordersPerSecond}</strong>
			</p>
			<p>
				Status: <strong>{running ? 'Running' : 'Stopped'}</strong>
			</p>
			<div class="flex items-center gap-2">
				<input type="number" bind:value={config.ordersPerSecond} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
				<button on:click={onToggle} class="w-full text-nowrap">{running ? 'Stop' : 'Start'}</button>
			</div>
		</div>
	</div>
	<div class="flex gap-2 w-full">
		<div class="w-full p-4 flex flex-col gap-4 bg-white border border-black rounded">
			<h3 class="text-xl font-bold">Order Completions</h3>
			<div class="w-full h-[300px]">
				<Line 
						data={completeChartData}
						options={{
								responsive: true,
								maintainAspectRatio: false,
								animation: false,
								scales: {
									y: {
										beginAtZero: true
									}
								}
						}}
					/>
				</div>
			</div>
			<div class="w-full p-4 flex flex-col gap-4 bg-white border border-black rounded">
				<h3 class="text-xl font-bold">Order Backlog</h3>
				<div class="w-full h-[300px]">
					<Line 
					data={backlogChartData}
					options={{
							responsive: true,
							maintainAspectRatio: false,
							animation: false,
							scales: {
								y: {
									beginAtZero: true
								}
							}
					}}
				/>
			</div>
		</div>
	</div>
</div>
