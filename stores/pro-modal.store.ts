export const useProModal = defineStore("ProModal", () => {
	const isOpen = ref(false);

	const onOpen = () => {
		isOpen.value = true;
	};

	const onClose = () => {
		isOpen.value = false;
	};

	return {
		isOpen,
		onOpen,
		onClose,
	};
});
