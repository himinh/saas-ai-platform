<script setup lang="ts">
useHead({ title: "Log In" });
definePageMeta({ layout: "auth" });

import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@nuxtbase/auth-ui-vue";

const supabaseClient = useSupabaseClient();
</script>

<template>
	<div class="flex h-screen items-center justify-center">
		<div class="mx-auto w-[800px]">
			<Card>
				<CardTitle>
					<div class="py-4 text-center">Welcome to MultiGeniX</div>
				</CardTitle>

				<CardContent
					><Auth
						:supabase-client="supabaseClient"
						:appearance="{
							theme: ThemeSupa,
						}"
						:providers="['google', 'github']"
						redirect-to="/"
				/></CardContent>
			</Card>
		</div>
	</div>
</template>

<style lang="css" scoped></style>
