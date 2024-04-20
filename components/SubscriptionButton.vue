<script setup lang="ts">
const isLoading = ref(false);

const { data: isPro, pending } = useFetch<boolean>("/api/stripe/checkStatus", {
	method: "get",
	key: "proStatus",
});

const manageSubscription = async () => {
	isLoading.value = true;

	const { data } = await useFetch("/api/stripe");
	if (data.value?.url) {
		// @ts-ignore
		window.location.href = data.value.url;
	}

	isLoading.value = false;
};
</script>

<template>
	<div>
		<div
			v-if="isLoading || pending"
			class="flex w-full items-center justify-center rounded-lg bg-muted p-8"
		>
			<Loader :processing="false" />
		</div>

		<div v-else class="space-y-4 px-4 lg:px-8">
			<p class="text-mu text-sm text-muted-foreground">
				{{
					isPro
						? "You are currently on a Pro Plan"
						: "You are currently on a Free Plan"
				}}
			</p>
			<Button
				v-if="!isPro"
				variant="premium"
				class="w-full"
				:disabled="isLoading || pending"
				@click="manageSubscription"
			>
				Upgrade
				<Icon name="lucide:zap" class="ml-2 h-4 w-4 fill-white" />
			</Button>

			<Button
				v-else
				:disabled="isLoading || pending"
				class="bg-gray-900 text-white shadow-none"
				@click="manageSubscription"
			>
				Manage Subscription
			</Button>
		</div>
	</div>
</template>

<style lang="css" scoped></style>
