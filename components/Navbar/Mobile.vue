<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
	<div class="md:hidden">
		<UButton
			icon="i-lucide-menu"
			size="md"
			class="cursor-pointer"
			variant="ghost"
			color="gray"
			@click="isOpen = true"
		/>

		<USlideover v-model="isOpen" side="left" :transition="true">
			<UButton
				color="gray"
				variant="ghost"
				icon="i-heroicons-x-mark-20-solid"
				class="absolute right-0 my-2 mr-2"
				@click="isOpen = false"
			/>
			<Sidebar />
		</USlideover>
	</div>
</template>

<style lang="css" scoped></style>
