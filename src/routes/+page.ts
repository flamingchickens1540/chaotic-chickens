import type { PageLoad } from './$types';
import { goto } from '$app/navigation';

export const load: PageLoad = async () => {
	const id = localStorage.getItem('scout_id');
	const name = localStorage.getItem('username');
	if (!id || !name) {
		goto('/login');
	}
};
