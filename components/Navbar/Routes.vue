<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const isTeacherPage = computed(() => {
	return route.path.startsWith("/teacher");
});

const isPlayerPage = computed(() => {
	return route.path.startsWith("/chapter");
});
</script>

<template>
	<div class="ml-auto flex gap-x-2">
		<UButton
			v-if="isPlayerPage || isTeacherPage"
			icon="i-lucide-log-out"
			label="Exit"
			size="sm"
			variant="ghost"
			color="gray"
			@click="router.push('/')"
		/>

		<UButton
			v-else
			label="Teacher mode"
			size="sm"
			variant="ghost"
			color="gray"
			@click="router.push('/teacher/courses')"
		/>

		<UAvatar
			src="https://avatars.githubusercontent.com/u/739984?v=4"
			alt="Avatar"
		/>
	</div>
</template>

<style lang="css" scoped></style>
