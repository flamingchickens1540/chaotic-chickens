import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

// All of this is very insecure - fine for bunnybots, but for the main season I would like a better implementation

// Create account
export const POST: RequestHandler = async ({ request }: any) => {
	const { name }: { name: string } = request.json();
	return json(await prisma.user.create({ data: { username: name } }));
};

// Login
export const GET: RequestHandler = async ({ request }: any) => {
	const { name }: { name: string } = request.json();
	return json(await prisma.user.findFirst({ where: { username: name } }));
};

// Update name, admin status
export const PATCH: RequestHandler = async ({ request }: any) => {
	const { name, id }: { name: string | undefined; id: number } = await request.json();

	return json(
		await prisma.user.update({
			where: { id },
			data: { username: name }
		})
	);
};
