<script setup lang="ts"></script>

<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button
				variant="outline"
				class="pr-4 transition hover:opacity-75 md:hidden"
			>
				<Icon name="lucide:menu" />
			</Button>
		</SheetTrigger>

		<SheetContent side="left" class="bg-white p-0"> </SheetContent>
	</Sheet>
</template>

<style lang="css" scoped></style>
