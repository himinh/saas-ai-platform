<script setup lang="ts">
import type { ChatCompletionRequestMessage } from "~/types/message.type";

const prompt = ref("");
const isLoading = ref(false);
const messages = ref<ChatCompletionRequestMessage[]>([]);

const submitForm = async () => {
	isLoading.value = true;
	const userMessage: ChatCompletionRequestMessage = {
		role: "user",
		content: prompt.value,
	};

	const newMessages = [...messages.value, userMessage];
	const { data, error } = await useFetch("/api/conversation", {
		method: "POST",
		body: {
			messages: newMessages,
		},
	});

	if (data.value) {
		messages.value = [
			...messages.value,
			userMessage,
			{
				content: data.value.content as string,
				role: "assistant",
			},
		];
	}

	if (error.value) {
		console.log({
			error: error.value.statusMessage,
		});

		// TODO: check error type
	}

	isLoading.value = false;
	prompt.value = "";
};
</script>

<template>
	<div>
		<!-- === Heading === -->
		<Heading
			title="Conversation"
			description="Our most advance conversation model."
			icon="lucide:message-square"
			icon-color="text-violet-500"
			bg-color="bg-violet-500/10"
		/>

		<!-- === Form === -->
		<div class="px-4 lg:px-8">
			<div>
				<form
					class="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
					@submit.prevent="submitForm"
				>
					<div class="col-span-12 flex flex-col justify-center lg:col-span-10">
						<div class="m-0 p-0">
							<input
								v-model="prompt"
								type="text"
								placeholder="How do I calculate the radius of a circle?"
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
			</div>
		</div>

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
			v-if="!messages.length && !isLoading"
			label="No conversation found"
		/>

		<!-- === Content === -->
		<div class="flex flex-col-reverse gap-y-4">
			<div
				v-for="(message, index) in messages"
				:key="index"
				class="flex w-full items-center gap-x-2 rounded-lg p-8"
				:class="[
					{ 'border border-black/10 bg-white': message.role === 'user' },
					{ 'bg-slate-20': message.role === 'assistant' },
				]"
			>
				<UserAvatar v-if="message.role === 'user'" />
				<BotAvatar v-else />

				<p class="text-sm">{{ message.content }}</p>
			</div>
		</div>
	</div>
</template>
