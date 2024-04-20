import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";
import { H3Event } from "h3";
import Stripe from "stripe";
import { DAY_IN_MS, MAX_COUNT } from "~/constants";

const prisma = new PrismaClient();

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

export const incrementApiLimit = async (userId: string) => {
	const userApiLimit = await prisma.userApiLimit.findUnique({
		where: {
			userId: userId,
		},
	});

	if (userApiLimit) {
		await prisma.userApiLimit.update({
			where: { userId },
			data: {
				count: userApiLimit.count + 1,
			},
		});
	} else {
		await prisma.userApiLimit.create({
			data: {
				userId,
				count: 1,
			},
		});
	}
};

export const checkApiLimit = async (userId: string) => {
	const userApiLimit = await prisma.userApiLimit.findUnique({
		where: {
			userId: userId,
		},
	});

	if (!userApiLimit || userApiLimit.count < MAX_COUNT) return true;

	return false;
};

export const getApiLimitCount = async (userId: string) => {
	const userApiLimit = await prisma.userApiLimit.findUnique({
		where: {
			userId: userId,
		},
	});

	if (!userApiLimit) return 0;

	return userApiLimit.count;
};

const config = useRuntimeConfig();

export const stripe = new Stripe(config.stripeSecret, {
	apiVersion: "2024-04-10",
	typescript: true,
});

export const absoluteUrl = (path: string) => {
	return `${config.appUrl}${path}`;
};

export const isUserPro = async (userId: string) => {
	const userSubscription = await prisma.userSubscription.findUnique({
		where: {
			userId,
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
};
