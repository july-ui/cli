import * as fs from 'fs';
import * as https from 'https';

export const downloadFile = (
	url: string,
	outputPath: string
): Promise<boolean> => {
	return new Promise<boolean>((res, rej) => {
		const request = https.get(url, (response) => {
			if (response.statusCode === 200) {
				const file = fs.createWriteStream(outputPath);
				response.pipe(file);

				file.on('finish', () => {
					file.close();
					res(true);
				});
        
				return;
			}
			res(false);
		});

		request.on('error', (error) => {
			res(false);
		});
	});
};
