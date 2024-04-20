<script setup lang="ts">
const proModalStore = useProModal();
const prompt = ref("");
const isLoading = ref(false);
const videos = ref<string[]>([]);

const submitForm = async () => {
	isLoading.value = true;

	const { data, error } = await useFetch<string[]>("/api/video", {
		method: "POST",
		body: {
			prompt: prompt.value,
		},
	});

	isLoading.value = false;
	prompt.value = "";

	if (data.value) {
		videos.value = data.value;

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
			title="Video Generation"
			description="Turn your prompt into video."
			icon="lucide:video"
			icon-color="text-orange-500"
			bg-color="bg-orange-500/10"
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
							placeholder="An astronaut riding a spaceship"
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
			<Empty v-if="!videos.length && !isLoading" label="No video generated." />

			<!-- === Content === -->
			<div
				v-if="videos.length"
				class="grid w-full grid-cols-12 gap-2 rounded-lg border p-4"
			>
				<div class="col-span-12 lg:col-span-12">
					<video
						v-for="(video, index) in videos"
						:key="index"
						controls
						class="mt-8 w-full rounded-lg border bg-black"
					>
						<source :src="video" />
					</video>
				</div>
			</div>
		</div>
	</div>
</template>
