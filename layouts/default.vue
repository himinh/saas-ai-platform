<script setup lang="ts"></script>

<template>
	<div>
		<!-- === Navbar === -->
		<div class="fixed inset-y-0 z-50 h-20 w-full md:pl-56">
			<Navbar />
		</div>

		<!-- === Sidebar === -->
		<div class="fixed inset-y-0 z-50 hidden w-56 md:block">
			<Sidebar />
		</div>

		<!-- === Main === -->
		<main class="mt-20 md:pl-56">
			<slot />
		</main>
	</div>
</template>

<style lang="css" scoped></style>
