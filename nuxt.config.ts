// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@nuxtjs/tailwindcss",
		"shadcn-nuxt",
		"@nuxtjs/supabase",
		"nuxt-typed-router",
		"@pinia/nuxt",
		"@nuxtjs/eslint-module",
		"nuxt-icon",
	],

	shadcn: {
		prefix: "",
		componentDir: "./components/ui",
	},

	components: [
		{
			path: "~/components/ui",
			extensions: [".vue"],
			prefix: "",
		},
		{
			path: "~/components/shared",
			extensions: [".vue"],
			prefix: "",
		},
		{
			path: "~/components",
			extensions: [".vue"],
			prefix: "",
		},
	],

	// ssr config
	ssr: true,

	// runtime config
	runtimeConfig: {
		app: {},
		public: {},
		openaiKey: "",
		replicateKey: "",
	},

	// ts
	typescript: {
		strict: true,
		shim: false,
	},

	supabase: {
		redirectOptions: {
			login: "/login",
			callback: "/confirm",
			exclude: ["/"],
		},
	},
});
