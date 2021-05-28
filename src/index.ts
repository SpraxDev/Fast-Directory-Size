#!/usr/bin/env node
import { exec } from 'child_process';
import { join as joinPath, resolve as resolvePath } from 'path';

// CLI
if (require.main === module) {
  getDirectorySize(process.argv[2])
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
export async function getDirectorySize(path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    if (process.platform === 'win32') { // Windows
      exec(`"${resolvePath(joinPath(__dirname, '..', 'bin', 'du.exe'))}" -nobanner -accepteula -q -c .`,
          {cwd: path}, (err, stdout) => {
            if (err) return reject(err);

            // The query stats indexes from the end since path can contain commas as well
            const stats = stdout.split('\n')[1].split(',');
            resolve(+stats.slice(-2)[0]);
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
