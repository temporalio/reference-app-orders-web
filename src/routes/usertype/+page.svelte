<svelte:head>
	<title>OMS</title>
	<meta name="description" content="OMS App" />
</svelte:head>

<section>
	<h1 style="text-align: left; margin-bottom: 20px;">
		Begin by selecting your role:
	</h1>

	<table style="width: 60%;">
		<thead>
			<tr>
				<th>Role</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><a href="/orders">Customer</a></td>
				<td>Someone who orders products from the store</td>
			</tr>
			<tr>
				<td><a href="/shipments">Courier</a></td>
				<td>Someone who delivers products to the customer</td>
			</tr>
			<tr>
				<td><a href="/admin">Store Manager</a></td>
				<td>Someone who performs administrative functions</td>
			</tr>
		</tbody>
	</table>

</section>
