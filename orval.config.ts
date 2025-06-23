// orval.config.ts

export default {
	api: {
		input: "http://185.73.113.53:7777/openapi.json",
		biome: true,
		prettier: true,
		output: {
			namingConvention: "PascalCase",
			mode: "tags",
			target: "./src/http/generated",
			schemas: "./src/http/generated/models",
			client: "react-query",
			mock: false,
			override: {
				mutator: {
					path: "./src/http/orval-mutator.ts",
					name: "orvalMutator",
				},
				query: {
					shouldExportMutatorHooks: false,
					shouldExportQueryKey: false,
					shouldSplitQueryKey: false,
				},
			},
		},
		hooks: {
			useQuery: true,
			useMutation: true,
		},
	},
};
