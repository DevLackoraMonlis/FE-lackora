// orval.config.ts

export default {
	api: {
		input: "http://91.107.144.92:8080/swagger/v1/swagger.json",
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
