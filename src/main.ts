import ReadConfig from "./read-config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import yargs, { strictCommands } from "yargs";
import { hideBin } from "yargs/helpers";
import initProj from './init/init.js';

// path globals
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cwd = process.cwd();

// get arguments
const argv = yargs(hideBin(process.argv))
    .command('init <name>', 'Initialize a new project', (yargs) => {
        return yargs.positional('name', {
            describe: 'Name of the project',
            type: 'string'
        });
    }, () => {}).strictCommands().demandCommand(1).parse();

// @ts-ignore
const command = argv._[0];
// @ts-check

if (command == 'init') {
    // initialize repo
    initProj(__filename, __dirname, cwd, argv);
}