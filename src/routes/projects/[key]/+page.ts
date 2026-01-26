export async function load({ params }) {
	if (!params.key) {
		return {
			key: 'other'
		};
	}
	return {
		key: params.key
	};
}
