<script setup lang="ts">
const route = useRoute();
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
	</div>
</template>

<style lang="css" scoped></style>
