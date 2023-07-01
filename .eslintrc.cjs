module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
	},
	plugins: ['prettier', '@typescript-eslint', 'mocha'],
	env: {
		node: true,
		es2023: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:mocha/recommended',
		'prettier',
	],
	rules: {
		'prettier/prettier': 'warn',
	},
};
