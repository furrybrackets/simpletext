import ReadConfig from "./read-config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import yargs, { strictCommands } from "yargs";
import { hideBin } from "yargs/helpers";
import initProj from "./init/init.js";
import fs from "fs-extra";
import Log from "./io/logger.js";
import { Options, DynamicOptions } from "./options.js";
import { join } from "path";
import fmt from 'pretty-ms';
import chalk from "chalk";

// path globals
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cwd = process.cwd();

// get arguments
const argv = yargs(hideBin(process.argv))
  .command(
    "init <name>",
    "Initialize a new project",
    (yargs) => {
      return yargs.positional("name", {
        describe: "Name of the project",
        type: "string",
      });
    },
    () => {}
  )
  .command("dev", "Start the development server", (yargs) => {
    return yargs.option("port", {
      alias: "p",
      describe: "Port to run the server on",
      type: "number",
      default: 3000,
    });
  })
  .strictCommands()
  .demandCommand(1)
  .parse();

// @ts-ignore
const command = argv._[0];
// @ts-check

if (command == "init") {
  // initialize repo
  initProj(__filename, __dirname, cwd, argv);
}

if (command == "dev") {
  // check for necessary files
  if (!fs.existsSync(join(cwd, "package.json"))) {
    Log.error("package.json not found");
    process.exit(1);
  }
  // validate config
  let config = ReadConfig(join(cwd, "package.json"));
  // we automatically coalesce config with defaults in ReadConfig, check for validity of values
  // Options is a list of all possible options, DynamicOptions is a list of options that can be dynamic (e.g. paths)
  let start = process.hrtime();
  for (let option in config) {
    if (
      DynamicOptions.includes(option) &&
      !Options[option].includes(config[option])
    ) {
      if (!fs.existsSync(config[option])) {
        Log.error(`${option} path does not exist: ${config[option]}`);
        process.exit(1);
      }
    }
    if (DynamicOptions.includes(option)) {
        continue;
    }
    // check if option is valid using Options
    if (!Options[option].includes(config[option])) {
      Log.error(`${option} is not a valid value: ${config[option]}`);
      process.exit(1);
    }
  }
  let stop = process.hrtime(start);
  Log.info('✨ validated config in '  + chalk.gray(fmt(stop[0] * 1e9 + stop[1]/1e9)));
}
