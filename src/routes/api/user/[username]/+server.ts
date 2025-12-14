import { prisma } from '$lib/prisma';
import { error, json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

// All of this is very insecure - fine for bunnybots, but for the main season I would like a better implementation

// Create account / Login
export const POST: RequestHandler = async ({ params: { username } }: RequestEvent) => {
	if (!username) {
		return error(400, { message: 'Username must be provided' });
	}

	const user = await prisma.user.create({ data: { username } });
	return json(user);
};

// Login
export const GET: RequestHandler = async ({ params: { username } }: RequestEvent) => {
	if (!username) {
		return error(400, { message: 'Username must be provided' });
	}
	const user = await prisma.user.findFirst({ where: { username } });

	return json(user ?? (await prisma.user.create({ data: { username } })));
};
// Update name, admin status
export const PATCH: RequestHandler = async ({ request, params: { username } }: RequestEvent) => {
	const { id }: { id: number } = await request.json();
	return json(
		await prisma.user.update({
			where: { id },
			data: { username }
		})
	);
};
