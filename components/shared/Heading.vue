<script setup lang="ts">
interface Props {
	title: string;
	description: string;
	icon: string;
	iconColor?: string;
	bgColor?: string;
}

defineProps<Props>();
</script>

<template>
	<div class="mb-6 flex items-center gap-x-3 px-4 lg:px-3">
		<div :class="`w-fit rounded-md p-2 ${bgColor}`">
			<Icon :name="icon" :class="`h-10 w-10 ${iconColor}`" />
		</div>

		<div>
			<h2 class="text-3xl font-bold">{{ title }}</h2>
			<p class="text-sm text-muted-foreground">{{ description }}</p>
		</div>
	</div>
</template>

<style lang="css" scoped></style>
