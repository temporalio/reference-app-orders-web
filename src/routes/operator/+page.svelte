<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Line } from 'svelte-chartjs';
	import { invalidateAll } from '$app/navigation';
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
	}

	let completeChartData = {
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

	const updateChartData = async() => {
		const now = new Date().toLocaleTimeString();

		workerCountChartData.labels = [...workerCountChartData.labels.slice(-20), now];
		completeChartData.labels = [...completeChartData.labels.slice(-20), now];
		backlogChartData.labels = [...backlogChartData.labels.slice(-20), now];

		let response = await fetch('/api/order/stats');
		let { workerCount, completeRate, backlog } = await response.json();

		workerCountChartData.datasets[0].data = [...workerCountChartData.datasets[0].data.slice(-20), workerCount];
		completeChartData.datasets[0].data = [...completeChartData.datasets[0].data.slice(-20), completeRate];
		backlogChartData.datasets[0].data = [...backlogChartData.datasets[0].data.slice(-20), backlog];

		response = await fetch('/api/shipment/stats');
		({ workerCount, completeRate, backlog } = await response.json());

		workerCountChartData.datasets[1].data = [...workerCountChartData.datasets[1].data.slice(-20), workerCount];
		completeChartData.datasets[1].data = [...completeChartData.datasets[1].data.slice(-20), completeRate];
		backlogChartData.datasets[1].data = [...backlogChartData.datasets[1].data.slice(-20), backlog];

		response = await fetch('/api/charge/stats');
		({ workerCount, completeRate, backlog } = await response.json());

		workerCountChartData.datasets[2].data = [...workerCountChartData.datasets[2].data.slice(-20), workerCount];
		completeChartData.datasets[2].data = [...completeChartData.datasets[2].data.slice(-20), completeRate];
		backlogChartData.datasets[2].data = [...backlogChartData.datasets[2].data.slice(-20), backlog];

		workerCountChartData = workerCountChartData
		completeChartData = completeChartData
		backlogChartData = backlogChartData
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
			<h3 class="text-xl font-bold">Completions</h3>
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
		</div>
		<div class="flex gap-2 w-full">
			<div class="w-full p-4 flex flex-col gap-4 bg-white border border-black rounded">
				<h3 class="text-xl font-bold">Workers</h3>
				<div class="w-full h-[300px]">
					<Line
							data={workerCountChartData}
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
				<h3 class="text-xl font-bold">Backlog</h3>
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
