#!/usr/bin/env node
import { exec } from 'child_process';
import { join as joinPath, resolve as resolvePath } from 'path';

// CLI
if (require.main === module) {
  fastFolderSize(process.argv[2])
      .then(console.log)
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
}

/**
 * @param path The path to a directory (absolute path is recommended)
 *
 * @return The size of the directory in byte
 */
export async function fastFolderSize(path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    if (process.platform === 'win32') { // Windows
      exec(`"${resolvePath(joinPath(__dirname, '..', 'bin', 'du.exe'))}" -nobanner -accepteula .`,
          {cwd: path}, (err, stdout) => {
            if (err) return reject(err);

            const match = /Size:\s+(.+) bytes/.exec(stdout);

            if (!match) {
              return reject(new Error(`Failed to extract bytes from stdout`));
            }

            const size = Number(match[1].replace(/[.,]/g, ''));

            resolve(size);
          }
      );
    } else if (process.platform === 'darwin') {  // Mac
      exec(`du -sk .`, {cwd: path}, (err, stdout) => {
        if (err) return reject(err);

        const match = /^(\d+)/.exec(stdout);

        if (!match) {
          return reject(new Error(`Failed to extract bytes from stdout`));
        }

        const size = Number(match[1]) * 1024;

        resolve(size);
      });
    } else { // Linux and everything else
      exec(`du -sb .`, {cwd: path}, (err, stdout) => {
        if (err) return reject(err);

        const match = /^(\d+)/.exec(stdout);

        if (!match) {
          return reject(new Error(`Failed to extract bytes from stdout`));
        }

        const size = Number(match[1]);

        resolve(size);
      });
    }
  });
}
