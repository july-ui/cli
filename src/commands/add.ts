const baseUrl =
	'https://raw.githubusercontent.com/july-ui/ui/main/projects/components/src/lib/';

import * as fs from 'fs';
import * as path from 'path';

import { Color } from '@utils/color';
import { JulyUiConfig } from '@commons/july-ui-config';
import { downloadFile } from '@utils/downloadFile';
import yargs from 'yargs';

const options = (
	yarg: yargs.Argv<Record<string, unknown>>
): yargs.Argv<Record<string, unknown>> => {
	return yarg
		.positional('component', {
			describe: 'The component you want to add.',
			choices: ['button'],
		})
		.option('path', {
			alias: 'p',
			type: 'string',
			description: 'Path where the component will be stored.',
		});
};

const handler = (argv: Record<string, unknown>): void => {
	if (!fs.existsSync('angular.json'))
		throw new Error(
			'ERROR This command is not available when running the July CLI outside an Angular workspace.'
		);

	const configExists = fs.existsSync('july-ui.config.json');

	if (!configExists && !argv.path)
		throw new Error('ERROR Either be in a july/ui project or specifiy a path.');

	let downloadPath: string = argv.path as string;

	if (downloadPath && downloadPath.startsWith('/')) {
		downloadPath = downloadPath.substring(1);
	}

	if (configExists) {
		const data = fs.readFileSync('july-ui.config.json', 'utf-8');
		let config: JulyUiConfig;
		try {
			config = JSON.parse(data);
		} catch (e) {
			throw new Error(
				'ERROR Something happend to the july/ui config, check it or init again.'
			);
		}

		if (!config.path) {
			throw new Error(
				'ERROR The july/ui config is not correct (path is missing).'
			);
		}

		downloadPath = downloadPath || config.path;
	}

	fs.mkdirSync(downloadPath, { recursive: true });

	downloadPath = path.join(downloadPath, `${argv.component}.component.ts`);
	const url = `${baseUrl}${argv.component}/${argv.component}.component.ts`;

	downloadFile(url, downloadPath).then((success) => {
		if (success) {
			const stats = fs.statSync(downloadPath);
			console.log(
				Color.LIGHT_GREEN,
				`CREATE`,
				Color.RESET,
				`${downloadPath} (${stats.size} bytes)`
			);
			return;
		}

		throw new Error(
			'ERROR There was an error downloading the file please try again.'
		);
	});
};

const AddCommand = {
	command: 'add <component>',
	description: 'Adds a specific component to your project',
	options,
	handler,
};

export default AddCommand;
