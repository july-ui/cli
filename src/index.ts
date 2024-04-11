import { Color } from './util/color';
import { hideBin } from 'yargs/helpers';
import { init } from './commands/init';
import yargs from 'yargs';

try {
	yargs(hideBin(process.argv))
		.command(
			'init <path>',
			'Sets the download path for the components',
			() => {},
			init
		)
		.parse();
} catch (e) {
	console.log(Color.LIGHT_RED, e.message);
}
