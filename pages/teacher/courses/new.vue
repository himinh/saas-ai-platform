<script setup lang="ts">
import { createCourseSchema } from "~/validations/course.validation";

const formState = reactive({
	title: "",
	description: "",
});

const onCreateCourse = () => {};
</script>

<template>
	<div class="mx-auto flex max-w-5xl p-6 md:items-center md:justify-center">
		<div>
			<h1 class="text-2xl">Name your course</h1>
			<p class="text-sm text-slate-600">
				What would you like to name your course? Don't worry, you can change it
				later.
			</p>

			<UForm
				:schema="createCourseSchema"
				:state="formState"
				@submit="onCreateCourse"
				class="my-8 space-y-8"
			>
				<UFormGroup label="Course Title" name="title">
					<UInput
						class="border-0"
						v-model="formState.title"
						placeholder="E.g. Web Development"
					/>
				</UFormGroup>

				<UFormGroup label="Description" name="description">
					<UInput v-model="formState.description" type="description" />
				</UFormGroup>

				<UButton type="submit"> Submit </UButton>
			</UForm>
		</div>
	</div>
</template>

<style lang="css" scoped></style>
