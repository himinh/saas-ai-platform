<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
	<div>
		{{ user }}
	</div>
</template>
