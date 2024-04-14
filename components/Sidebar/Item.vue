<script setup lang="ts">
interface Props {
	label: string;
	icon: string;
	href: string;
}

const route = useRoute();
const router = useRouter();
const props = defineProps<Props>();

const isActive = computed(() => {
	return (
		(route.path === "/" && props.href === "/") ||
		route.path === props.href ||
		route.path?.startsWith(`${props.href}/`)
	);
});

const onClick = () => {
	router.push(props.href);
};
</script>

<template>
	<button
		class="flex items-center gap-x-2 p-0 pl-6 text-sm font-medium outline-none transition-all"
		:class="{
			'bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700':
				isActive,
			'text-slate-500 hover:bg-slate-300/20 hover:text-slate-600': !isActive,
		}"
		@click="onClick()"
	>
		<div class="flex items-center gap-x-2 py-4">
			<Icon
				:name="icon"
				size="22"
				class="text-slate-500"
				:class="{ 'text-sky-700': isActive }"
			/>
			{{ label }}
		</div>

		<div
			class="ml-auto h-full border-2 border-sky-700 opacity-0 transition-all"
			:class="{ 'opacity-100': isActive }"
		></div>
	</button>
</template>

<style lang="css" scoped></style>
