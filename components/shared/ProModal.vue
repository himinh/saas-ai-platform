<script setup lang="ts">
const store = useProModal();
</script>

<template>
	<Dialog :open="store.isOpen" @update:open="store.onClose">
		<DialogContent>
			<DialogHeader>
				<DialogTitle
					class="flex-center flex flex-col items-center gap-y-4 pb-2"
				>
					<div class="flex items-center gap-x-2 text-xl font-bold">
						Upgrade to MultiGenX
						<Badge variant="premium" class="py-1 text-sm uppercase">Pro</Badge>
					</div>
				</DialogTitle>

				<DialogDescription
					class="space-x-2 pt-2 text-center font-medium text-zinc-900"
				>
					<div
						v-for="tool in tools"
						:key="tool.link"
						class="flex items-center justify-between border-black/5 p-3"
						@click="navigateTo(tool.link)"
					>
						<div class="flex items-center gap-x-4">
							<div :class="`w-fit rounded-md p-2 ${tool.bgColor}`">
								<Icon :name="tool.icon" :class="`h-8 w-8 ${tool.color}`" />
							</div>

							<div class="font-semibold">{{ tool.label }}</div>
						</div>

						<Icon name="lucide:check" class="h-5 w-5" />
					</div>
				</DialogDescription>
			</DialogHeader>

			<DialogFooter>
				<Button variant="premium" size="lg" class="w-full">
					Upgrade
					<Icon name="lucide:zap" class="ml-2 h-4 w-4 fill-white" />
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>

<style lang="css" scoped></style>
