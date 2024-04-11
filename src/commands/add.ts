const baseUrl =
	'https://raw.githubusercontent.com/july-ui/ui/main/projects/components/src/lib/';

import { downloadFile } from '@utils/downloadFile';
import yargs from 'yargs';

const options = (
	yarg: yargs.Argv<Record<string, unknown>>
): yargs.Argv<Record<string, unknown>> => {
	return yarg.positional('component', {
		describe: 'The component you want to add',
		choices: ['button'],
	});
};

const handler = async (argv: Record<string, unknown>): Promise<void> => {
	const url = `${baseUrl}${argv.component}/${argv.component}.component.ts`;

	await downloadFile(url, './b');
};

const AddCommand = {
	command: 'add <component>',
	description: 'Adds a specific component to your project',
	options,
	handler,
};

export default AddCommand;
