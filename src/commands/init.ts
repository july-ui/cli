import * as fs from 'fs';

import { Color } from '@utils/color';
import { JulyUiConfig } from '@commons/july-ui-config';
import yargs from 'yargs';

const options = (
	yarg: yargs.Argv<Record<string, unknown>>
): yargs.Argv<Record<string, unknown>> => {
	return yargs.positional('path', {
		describe: 'Path where components will be stored',
		type: 'string',
		demandOption: true,
	});
};

const handler = (argv: Record<string, unknown>): void => {
	if (!fs.existsSync('angular.json'))
		throw new Error(
			'ERROR This command is not available when running the July CLI outside an Angular workspace.'
		);

	let path = argv.path as string;
	if (path && path.startsWith('/')) {
		path = path.substring(1);
	}

	const config: JulyUiConfig = { path };
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
	options,
	handler,
};

export default InitCommand;
