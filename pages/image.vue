<script setup lang="ts">
import type { ChatCompletionRequestMessage } from "~/types/message.type";
import { amountOptions, resolutionOptions } from "~/utils/resolution-options";

const proModalStore = useProModal();
const prompt = ref("");
const amount = ref(amountOptions[0].value);
const resolution = ref(resolutionOptions[0].value);

const isLoading = ref(false);
const photos = ref<string[]>([]);

const submitForm = async () => {
	isLoading.value = true;
	const userMessage: ChatCompletionRequestMessage = {
		role: "user",
		content: prompt.value,
	};

	const { data, error } = await useFetch("/api/image", {
		method: "POST",
		body: {
			prompt: prompt.value,
			amount: amount.value,
			resolution: resolution.value,
		},
	});

	if (data.value) {
		photos.value = data.value.map((item) => {
			if (item.url) {
				return item.url;
			}

			return "";
		});

		await refreshNuxtData("userData");
	}

	if (error.value) {
		if (error.value.statusCode === 403) {
			proModalStore.onOpen();
		}
	}

	isLoading.value = false;
	prompt.value = "";
};
</script>

<template>
	<div>
		<!-- === Heading === -->
		<Heading
			title="Image Generation"
			description="Turn your prompt into an image."
			icon="lucide:image"
			icon-color="text-pink-700"
			bg-color="bg-pink-700/10"
		/>

		<!-- === Main === -->
		<div class="px-4 lg:px-8">
			<!-- === Form === -->
			<form
				class="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
				@submit.prevent="submitForm"
			>
				<!-- prompt -->
				<div class="col-span-12 flex flex-col justify-center lg:col-span-6">
					<div class="m-0 p-0">
						<input
							v-model="prompt"
							type="text"
							placeholder="How do I calculate the radius of a circle?"
							class="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
						/>
					</div>
				</div>

				<!-- resolution -->
				<div class="col-span-12 lg:col-span-2">
					<Select v-model="resolution">
						<SelectTrigger>
							<SelectValue placeholder="Select your resolution" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem
									v-for="(res, i) in resolutionOptions"
									:key="i"
									:value="res.value"
								>
									{{ res.text }}
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<!-- amount -->
				<div class="col-span-12 lg:col-span-2">
					<Select v-model="amount">
						<SelectTrigger>
							<SelectValue placeholder="Select your amount" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem
									v-for="(res, i) in amountOptions"
									:key="i"
									:value="res.value"
								>
									{{ res.text }}
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
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
			<Empty
				v-if="!photos.length && !isLoading"
				label="No conversation found"
			/>

			<!-- === Content === -->
			<div
				class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
			>
				<div
					v-for="photo in photos"
					:key="photo"
					class="overflow-hidden rounded-lg border border-black/5"
				>
					<div class="relative flex aspect-square items-center justify-center">
						<img :src="photo" alt="Image" />
					</div>

					<div class="p-2">
						<NuxtLink
							:to="photo"
							target="_blank"
							download
							class="flex w-full items-center justify-center bg-slate-200 px-1 py-2"
							>Download</NuxtLink
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
