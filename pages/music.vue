<script setup lang="ts">
import type { AudioResponse } from "~/types/message.type";

const proModalStore = useProModal();
const prompt = ref("");
const isLoading = ref(false);
const music = ref<string>();

const submitForm = async () => {
	isLoading.value = true;

	const { data, error } = await useFetch<AudioResponse>("/api/music", {
		method: "POST",
		body: {
			prompt: prompt.value,
		},
	});

	isLoading.value = false;
	prompt.value = "";
	if (data.value) {
		music.value = data.value.audio;

		await refreshNuxtData("userData");
	}

	if (error.value) {
		if (error.value.statusCode === 403) {
			proModalStore.onOpen();
		}
	}
};
</script>

<template>
	<div>
		<!-- === Heading === -->
		<Heading
			title="Music Generation"
			description="Turn your prompt into music."
			icon="lucide:music"
			icon-color="text-emerald-500"
			bg-color="bg-emerald-500/10"
		/>

		<!-- === Main === -->
		<div class="px-4 lg:px-8">
			<!-- === Form === -->
			<form
				class="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
				@submit.prevent="submitForm"
			>
				<div class="col-span-12 flex flex-col justify-center lg:col-span-10">
					<div class="m-0 p-0">
						<input
							v-model="prompt"
							type="text"
							placeholder="A funky sound"
							class="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
						/>
					</div>
				</div>

				<Button
					class="col-span-12 lg:col-span-2"
					type="submit"
					:disabled="!prompt || isLoading"
				>
					Generate
				</Button>
			</form>

			<!-- === Loader === -->
			<div class="mt-4 space-y-4" />
			<div
				v-if="isLoading"
				class="flex w-full items-center justify-center rounded-lg bg-muted p-8"
			>
				<Loader />
			</div>

			<!-- === Empty === -->
			<Empty v-if="!music && !isLoading" label="No music generated." />

			<!-- === Content === -->
			<audio v-if="music" controls class="mt-8 w-full">
				<source :src="music" />
			</audio>
		</div>
	</div>
</template>
