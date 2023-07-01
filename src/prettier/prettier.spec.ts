import { afterEach, describe, test } from 'mocha';
import { fileURLToPath } from 'url';
import assert from 'yeoman-assert';
import helpers, { result } from 'yeoman-test';
import RedwerksCosmosPrettierGenerator from './index.js';
import { readFileSync } from 'fs';

describe('@redwerks/generator-cosmos:prettier', () => {
	afterEach(function () {
		result.cleanup();
	});

	function generator() {
		return helpers.create(RedwerksCosmosPrettierGenerator, {
			resolved: fileURLToPath(new URL('./index.ts', import.meta.url)),
			namespace: '@redwerks/generator-cosmos:prettier',
		});
	}

	test('creates a .prettierrc.json', async () => {
		await generator().withAnswers({ fileTypes: [] });

		assert.jsonFileContent('.prettierrc.json', {
			trailingComma: 'es5',
			singleQuote: true,
		});
	});

	test('creates an .editorconfig with just the default', async () => {
		await generator().withAnswers({ fileTypes: ['default'] });

		assert.fileContent(
			'.editorconfig',
			readFileSync(
				fileURLToPath(new URL('./fixtures/just-default.ini', import.meta.url)),
				'utf-8'
			)
		);
	});

	test('creates an .editorconfig with all file types', async () => {
		await generator().withAnswers({
			fileTypes: ['default', 'json', 'code-snippets', 'yaml', 'md'],
		});

		assert.fileContent(
			'.editorconfig',
			readFileSync(
				fileURLToPath(new URL('./fixtures/just-default.ini', import.meta.url)),
				'utf-8'
			)
		);
	});
});
