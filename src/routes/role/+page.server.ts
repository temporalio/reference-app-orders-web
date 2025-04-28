export const load = () => {
	const personas = [
		{
			role: 'Customer',
			description: 'Someone who orders products from the store',
			link: '/orders'
		},
		{
			role: 'Courier',
			description: 'Someone who delivers products to the customer',
			link: '/shipments'
		},
		{
			role: 'Store Manager',
			description: 'Someone who performs administrative functions',
			link: '/admin'
		},
		{
			role: 'Operator',
			description: "Someone who manages deployments and tests the system's performance",
			link: '/operator'
		}
	];

	return { personas };
};
