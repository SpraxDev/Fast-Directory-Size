#!/usr/bin/env node
/**
 * @param path The path to a directory (absolute path is recommended)
 *
 * @return The size of the directory in byte
 */
export declare function getDirectorySize(path: string): Promise<number>;
