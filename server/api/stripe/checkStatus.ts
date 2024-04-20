import { PrismaClient } from "@prisma/client";
import { DAY_IN_MS } from "~/constants";
import { User } from "~/server/types";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	await protectRoute(event);

	const user = event.context.user as User;

	const userSubscription = await prisma.userSubscription.findUnique({
		where: {
			userId: user.id,
		},
	});

	if (!userSubscription) {
		return false;
	}

	const isValid =
		userSubscription.stripePriceId &&
		userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
			Date.now();

	return !!isValid;
});
