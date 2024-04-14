<script setup lang="ts">
const guestRoutes = [
	{
		icon: "i-heroicons-squares-2x2",
		label: "Dashboard",
		href: "/",
	},
	{
		icon: "i-ph-compass-duotone",
		label: "Browse",
		href: "/search",
	},
];

const teacherRoutes = [
	{
		icon: "i-heroicons-squares-2x2",
		label: "Courses",
		href: "/teacher/courses",
	},
	{
		icon: "i-lucide-bar-chart",
		label: "Analytics",
		href: "/teacher/analytics",
	},
];

const route = useRoute();
const isTeacherPage = computed(() => route.path.startsWith("/teacher"));
const routes = computed(() =>
	isTeacherPage.value ? teacherRoutes : guestRoutes,
);
</script>

<template>
	<div class="flex w-full flex-col">
		<SidebarItem
			v-for="item in routes"
			:key="item.href"
			:icon="item.icon"
			:label="item.label"
			:href="item.href"
		/>
	</div>
</template>

<style lang="scss" scoped></style>
