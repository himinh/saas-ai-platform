import { serverSupabaseUser } from "#supabase/server";
import { H3Event } from "h3";

export const protectRoute = async (event: H3Event) => {
	const user = await serverSupabaseUser(event);

	if (!user) {
		throw createError({
			status: 402,
			statusMessage: "Unauthorized",
		});
	}

	event.context.user = user;
};
