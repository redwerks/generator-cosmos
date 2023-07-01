import chalk from 'chalk';
import invariant from 'invariant';
import Generator from 'yeoman-generator';
import yosay from 'yosay';
import { CheckboxChoiceOptions } from 'inquirer';

const FileTypes = {
	default: {
		value: 'default',
		short: 'Default',
		name: 'Default for TypeScript, and other files',
	},
	json: { value: 'json', name: 'JSON' },
	yaml: { value: 'yaml', name: 'YAML' },
	'code-snippets': { value: 'code-snippets', name: 'VSCode Snippets' },
	md: { value: 'md', name: 'Markdown' },
} as const satisfies Record<string, CheckboxChoiceOptions>;

export interface Answers {
	fileTypes: (keyof typeof FileTypes)[];
}

export default class RedwerksCosmosPrettierGenerator extends Generator {
	answers: Answers | undefined;

	async prompting() {
		// Have Yeoman greet the user.
		this.log(
			yosay(
				`Welcome to the terrific ${chalk.red(
					'@redwerks/generator-cosmos'
				)} Prettier generator!`
			)
		);

		this.answers = await this.prompt<Answers>([
			{
				type: 'checkbox',
				name: 'fileTypes',
				message:
					'What file types should the EditorConfig define formatting for?',
				default: ['default', 'json', 'yaml', 'code-snippets', 'md'],
				choices: Object.values(FileTypes),
			},
		]);
	}

	writing() {
		invariant(this.answers, 'Prompts must be answered before writing');

		// EditorConfig
		const editorconfig = this.answers.fileTypes
			.map((fileType) => this.fs.read(this.templatePath(`${fileType}.ini`)))
			.join('\n');

		this.fs.write(this.destinationPath('.editorconfig'), editorconfig);

		// Prettier RC
		this.fs.writeJSON(this.destinationPath('.prettierrc.json'), {
			trailingComma: 'es5',
			singleQuote: true,
		});

		// Prettier NPM Script
		this.packageJson.setPath('scripts.format', 'prettier --write .');
	}

	install() {
		this.addDevDependencies('prettier');
	}
}
