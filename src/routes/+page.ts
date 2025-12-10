import { prisma } from '$lib/prisma';
import type { PageLoad } from './$types';
import { localStore } from '@/localStore.svelte';
import { goto } from '$app/navigation';

export const load: PageLoad = async () => {
	const id = localStore('scout_id', -1);
	if (!id.value) {
		goto('/login');
	}

	const user: { id: number; username: string } | null = await prisma.user.findUnique({
		where: { id: id.value },
		select: {
			id: true,
			username: true
		}
	});

	if (!user) {
		goto('/login');
	}

	return user?.username;
};
