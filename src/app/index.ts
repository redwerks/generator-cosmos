import chalk from 'chalk';
import Generator from 'yeoman-generator';
import yosay from 'yosay';
import fs from 'fs';

export interface Answers {
	someAnswer: boolean;
}

export default class RedwerksCosmosGenerator extends Generator {
	answers: Answers | undefined;

	async prompting() {
		// Have Yeoman greet the user.
		this.log(
			yosay(
				`Welcome to the terrific ${chalk.red(
					'@redwerks/generator-cosmos'
				)} generator!`
			)
		);

		const prompts = [
			{
				type: 'confirm',
				name: 'someAnswer',
				message: 'Would you like to enable this option?',
				default: true,
			},
		];

		this.answers = await this.prompt<Answers>(prompts);
	}

	writing() {
		console.log(fs.readdirSync(this.templatePath('..')));
		this.fs.copy(
			this.templatePath('dummyfile.txt'),
			this.destinationPath('dummyfile.txt')
		);
	}

	install() {
		console.log('Nothing to install');
	}
}
