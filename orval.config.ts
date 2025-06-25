// orval.config.ts

export default {
	api: {
		input: "http://193.151.146.46/openapi.json",
		biome: true,
		prettier: true,
		clean: true,
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
