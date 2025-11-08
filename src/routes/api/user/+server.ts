import { prisma } from '$lib/prisma';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

// All of this is very insecure - fine for bunnybots, but for the main season I would like a better implementation

// Create account
export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { name }: { name: string } = await request.json();
	return json(await prisma.user.create({ data: { username: name } }));
};

// Login
export const GET: RequestHandler = async ({ request }: RequestEvent) => {
	const { name }: { name: string } = await request.json();
	return json(await prisma.user.findFirst({ where: { username: name } }));
};

// Update name, admin status
export const PATCH: RequestHandler = async ({ request }: RequestEvent) => {
	const { name, id }: { name: string | undefined; id: number } = await request.json();

	return json(
		await prisma.user.update({
			where: { id },
			data: { username: name }
		})
	);
};
