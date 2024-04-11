import { Color } from '@utils/color';
import { Commands } from '@commands';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

try {
	const julyYargs = yargs(hideBin(process.argv));

	for (let i = 0; i < Commands.length; i++) {
		console.log(Commands[i].command);
		julyYargs.command(
			Commands[i].command,
			Commands[i].description,
			Commands[i].options,
			Commands[i].handler
		);
	}

	julyYargs.parse();
} catch (e) {
	console.log(Color.LIGHT_RED, e.message);
}
