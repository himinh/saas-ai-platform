import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { absoluteUrl, stripe } from "~/server/utils";

const prisma = new PrismaClient();
const returnUrl = absoluteUrl("/settings");

const STRIPE_WEBHOOK_SECRET = useRuntimeConfig().stripeWebhookSecret;
export default defineEventHandler(async (event) => {
	const signature = getHeader(event, "Stripe-Signature") as string;
	const body = await readBody(event);

	let stripeEvent;
	try {
		stripeEvent = stripe.webhooks.constructEvent(
			body,
			signature,
			STRIPE_WEBHOOK_SECRET,
		);
	} catch (error) {
		console.log("WEBHOOK", error);
	}

	const session = stripeEvent?.data.object as Stripe.Checkout.Session;

	if (stripeEvent?.type === "checkout.session.completed") {
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string,
		);

		if (!session?.metadata?.userId) {
			throw createError({
				statusCode: 400,
				statusMessage: "User Id is required",
			});
		}

		await prisma.userSubscription.create({
			data: {
				userId: session.metadata.userId,
				stripeSubscriptionId: subscription.id,
				stripeCustomerId: subscription.customer as string,
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(
					subscription.current_period_end * 1000,
				),
			},
		});
	}

	if (stripeEvent?.type === "invoice.payment_succeeded") {
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string,
		);

		await prisma.userSubscription.update({
			where: { stripeSubscriptionId: subscription.id },
			data: {
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(
					subscription.current_period_end * 1000,
				),
			},
		});
	}

	return 200;
});
