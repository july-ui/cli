import * as fs from 'fs';

import { Color } from '@utils/color';
import { JulyUiConfig } from '@commons/july-ui-config';

const handler = (argv: Record<string, unknown>): void => {
	if (!fs.existsSync('angular.json'))
		throw new Error(
			'Error: This command is not available when running the Angular CLI outside a workspace.'
		);

	const config: JulyUiConfig = { path: argv.path as string };
	fs.writeFileSync('july-ui.config.json', JSON.stringify(config, null, 2));
	const stats = fs.statSync('july-ui.config.json');

	console.log(
		Color.LIGHT_GREEN,
		`CREATE`,
		Color.RESET,
		`july-ui.config.json (${stats.size} bytes)`
	);
};

const InitCommand = {
	command: 'init <path>',
	description: 'Sets the download path for the components',
	options: () => {},
	handler,
};

export default InitCommand;
