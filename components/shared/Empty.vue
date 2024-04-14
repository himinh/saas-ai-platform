<script setup lang="ts">
interface Props {
	label: string;
}

defineProps<Props>();
</script>

<template>
	<div class="flex h-full flex-col items-center justify-center p-20">
		<div class="relative h-72 w-72">
			<img src="/images/empty.png" alt="" />
		</div>

		<p class="text text-center text-sm text-muted-foreground">{{ label }}</p>
	</div>
</template>
