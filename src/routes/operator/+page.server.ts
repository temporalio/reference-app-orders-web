export const load = async ({ fetch }) => {
	const response = await fetch(`/api/load-generator/status`);
	const { running, config } = await response.json();
	return { running, config };
};
