import chalk from 'chalk';
import Log from '../io/logger.js';
import { join, basename } from "path";
import fs from 'fs-extra';
import fmt from 'pretty-ms';

export default function initProj(__filename: string, root: string, cwd: string, argv: any): void {
    // init
    const __dirname = join(root, 'init');
    const project = join(cwd, argv.name);
    Log.info('Creating project in: ' + chalk.gray(project));

    // check if directory exists
    if (fs.existsSync(project)) {
        Log.error('Directory already exists: ' + chalk.gray(project));
        process.exit(1);
    };

    let start = process.hrtime();

    // copy files from ./template to project
    fs.copy(join(__dirname, 'template'), project, { overwrite: true, filter: (src: string, dest: string) => {
        Log.success('Copied ' + chalk.gray(basename(src)));
        return true;
    }}).then(() => {
        let stop = process.hrtime(start);
        Log.info('✨ created project in '  + chalk.gray(fmt(stop[0] * 1e9 + stop[1]/1e9)));
    });
};