import { afterEach, describe, test } from 'mocha';
import { fileURLToPath } from 'url';
import assert from 'yeoman-assert';
import helpers, { result } from 'yeoman-test';
import RedwerksCosmosAppGenerator from './index.js';

describe('@redwerks/generator-cosmos:app', () => {
	afterEach(function () {
		result.cleanup();
	});

	function setup() {
		return helpers.create(RedwerksCosmosAppGenerator, {
			resolved: fileURLToPath(new URL('./index.ts', import.meta.url)),
			namespace: '@redwerks/generator-cosmos:app',
		});
	}

	test('creates files', async () => {
		await setup().withAnswers({ someAnswer: true });

		assert.file(['dummyfile.txt']);
	});
});
