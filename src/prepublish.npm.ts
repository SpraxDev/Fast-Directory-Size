import * as fs from 'fs';
import { get as httpsGet } from 'https';
import { dirname as getParentFile, join as joinPath } from 'path';
import { ParseOne as zipParseOne } from 'unzipper';

// Only run for Windows
if (process.platform != 'win32') process.exit();

/* Download DU.zip */
const zipUrl = 'https://download.sysinternals.com/files/DU.zip';
const exePath = joinPath(__dirname, '..', 'bin', 'du.exe');

console.info(`Downloading 'du' for your system from '${zipUrl}'...`);
httpsGet(zipUrl, (res) => {
  if (res.statusCode != 200) {
    console.error(`Error while downloading '${zipUrl}'`);
    process.exit(1);
  }

  if (!fs.existsSync(getParentFile(exePath))) {
    fs.mkdirSync(getParentFile(exePath));
  }

  res.pipe(zipParseOne(/du\.exe/))
      .pipe(fs.createWriteStream(exePath))
      .on('close', () => {
        console.info(`Successfully downloaded 'du'!`);
      });
});
