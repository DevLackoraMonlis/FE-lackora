module.exports = {
	// this will check Typescript files
	// This will lint and format TypeScript and                                             //JavaScript files
	"**/*.(ts|tsx)": () => ["tsc --noEmit --noErrorTruncation","biome check --write --unsafe --staged --error-on-warnings --linter-enabled=true"],
};
