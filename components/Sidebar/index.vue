<script setup lang="ts">
import { MAX_COUNT } from "~/constants";
import type { User } from "~/server/types";

const route = useRoute();
const store = useProModal();

const { data: user, pending } = useFetch<User & { apiCount: number }>(
	"api/user",
	{
		method: "get",
		key: "userData",
	},
);

const progress = computed(() => {
	if (user.value && !pending.value) {
		return (user.value?.apiCount / MAX_COUNT) * 100;
	}

	return 0;
});

const { data: isPro, pending: isLoading } = useFetch<boolean>(
	"/api/stripe/checkStatus",
);
</script>

<template>
	<div class="flex h-full flex-col space-y-4 border-r bg-white py-4 shadow-sm">
		<div class="flex-1 px-3 py-2">
			<!-- Logo -->
			<NuxtLink to="/" class="my-3 flex items-center pl-3">
				<div class="relative h-8 w-8">
					<img src="/images/logo.svg" alt="Logo " />
				</div>
				<h1 class="text-2xl font-bold">MultiGenX</h1>
			</NuxtLink>

			<!-- Routes -->
			<div class="space-y-1">
				<NuxtLink
					v-for="item in sidebarLinks"
					:key="item.link"
					:to="item.link"
					class="group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium text-primary transition hover:bg-muted"
					:class="{
						'bg-muted': route.path === item.link,
					}"
				>
					<div class="flex flex-1 items-center">
						<Icon :name="item.icon" :class="`-w-5 mr-3 h-5 ${item.color}`" />
						{{ item.label }}
					</div>
				</NuxtLink>
			</div>
		</div>

		<!-- Counter -->
		<div v-if="!isPro && !isLoading" class="border-b border-t px-3">
			<div class="border-0 bg-white/10">
				<div class="px-2 py-6">
					<div class="mb-4 space-y-4 text-center text-sm">
						<p>{{ user?.apiCount || 0 }} / {{ MAX_COUNT }} Free Generations</p>
						<Progress v-model="progress" class="w-full" />
					</div>

					<Button variant="premium" class="w-full" @click="store.onOpen">
						Upgrade
						<Icon name="lucide:zap" class="ml-2 h-4 w-4 fill-white" />
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="css" scoped></style>
