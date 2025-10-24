import { prisma } from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }: any) => {
	const id: number | undefined = cookies.get('id');
	if (id == undefined) {
		throw redirect(307, '/login');
	}

	const user: { id: number; username: string; isAdmin: boolean } | null =
		await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				username: true,
				isAdmin: true
			}
		});

	if (user == null) {
		cookies.set('id', undefined, { path: '/' });
		throw redirect(307, '/login');
	}

	return user;
};
