import chalk from 'chalk';
import Log from '../io/logger.js';

export default function initProj(__filename: string, __dirname: string, cwd: string, argv: object): void {
    // init
    Log.info('Creating project in: ' + chalk.gray(cwd));
}