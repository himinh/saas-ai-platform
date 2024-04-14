<script setup lang="ts">
const user = useSupabaseUser();
const supabaseClient = useSupabaseClient();

const logout = async () => {
	await supabaseClient.auth.signOut();
	navigateTo("/login");
};
</script>

<template>
	<div class="flex items-center p-4">
		<NavbarMobile />

		<div class="flex w-full justify-end">
			<DropdownMenu>
				<DropdownMenuTrigger as-child>
					<Button variant="outline">
						<Icon name="lucide:user-circle" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" class="left-24 w-72">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<div class="flex w-full items-center p-2 pl-3">
						<Avatar class="mr-2">
							<AvatarImage
								v-if="user?.user_metadata.avatar_url"
								:src="user?.user_metadata.avatar_url"
							/>

							<AvatarFallback>
								{{ user?.email?.charAt(0).toUpperCase() }}
								{{ user?.email?.charAt(1).toUpperCase() }}
							</AvatarFallback>
						</Avatar>

						<div>
							<div class="font-bold">
								{{
									user?.user_metadata.full_name || user?.email?.split("@")[0]
								}}
							</div>
							<div class="text-sm">{{ user?.email }}</div>
						</div>
					</div>

					<DropdownMenuSeparator />

					<DropdownMenuItem @click="logout">
						<Icon name="lucide:log-out" class="mr-2 h-4 w-4" />
						<span class="ml-2">Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>

		<!-- <NavbarRoutes /> -->
	</div>
</template>

<style lang="css" scoped></style>
