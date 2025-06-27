const { execSync } = require('child_process');

try {
    execSync('npx @biomejs/biome check --write --error-on-warnings --linter-enabled=true', { stdio: 'inherit' });
    console.info('Biome linting completed successfully.');
} catch (error) {
    console.error('Biome linting failed:', error);
    process.exit(1);
}
