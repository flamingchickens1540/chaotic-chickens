import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: any) => {
	const { name, isAdmin }: { name: string; isAdmin: boolean } = request.json();

	return json('');
};
