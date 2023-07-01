'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@redwerks/generator-cosmos:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
