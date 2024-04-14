<script setup lang="ts">
interface Props {
	processing?: boolean;
}

withDefaults(defineProps<Props>(), {
	processing: true,
});
</script>

<template>
	<div class="flex h-full flex-col items-center justify-center gap-y-4">
		<div class="relative h-10 w-10 animate-spin">
			<img src="/images/logo.svg" alt="" />
		</div>

		<p v-if="processing" class="text-sm text-muted-foreground">
			MultiGeniX is processing...
		</p>
	</div>
</template>
