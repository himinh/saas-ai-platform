<script setup lang="ts">
import { tools } from "~/utils/tools";
</script>

<template>
	<div>
		<div class="mb-8">
			<h2 class="text-center text-2xl font-bold md:text-4xl">
				Explore the power of AI
			</h2>
			<p
				class="text-center text-sm font-light text-muted-foreground md:text-lg"
			>
				Chat with the smartest AI - Experience the power of AI
			</p>
		</div>

		<div class="space-y-4 px-4 md:px-20 lg:px-32">
			<div
				v-for="tool in tools"
				:key="tool.link"
				class="flex cursor-pointer items-center justify-between border border-muted p-4 transition hover:shadow-sm"
				@click="navigateTo(tool.link)"
			>
				<div class="flex items-center gap-x-4">
					<div :class="`w-fit rounded-md p-2 ${tool.bgColor}`">
						<Icon :name="tool.icon" :class="`h-8 w-8 ${tool.color}`" />
					</div>

					<div class="font-semibold">{{ tool.label }}</div>
				</div>

				<Icon name="lucide:arrow-right" class="h-5 w-5" />
			</div>
			``
		</div>
	</div>
</template>
