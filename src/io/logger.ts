import chalk from 'chalk';

export default class Logger {
    public static info(message: string): void {
        console.info(`${chalk.blue('(info)')} ${message}`);
    };

    public static warn(message: string): void {
        console.warn(`${chalk.yellow('(warn)')} ${message}`);
    };

    public static error(message: string): void {
        console.error(`${chalk.red('(error)')} ${message}`);
    }

    public static success(message: string): void {
        console.log(`${chalk.green('(success)')} ${message}`);
    };

    public static module(mod: string, message: string): void {
        console.log(`${chalk.magenta(mod)} ${message}`);
    };
}