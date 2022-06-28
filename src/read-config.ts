import { readFileSync } from 'fs-extra'
import vars from './vars.js';
import Coalesce from './coalesce.js';
import Defaults from './defaults.js';
export default function ReadConfig(path: string): object {
    let file: string = readFileSync(path, 'utf8');
    let pkgConfig: object = JSON.parse(file);
    // remove unnecessary keys
    for (let key in pkgConfig) {
        if (!vars.includes(key)) {
            delete pkgConfig[key];
        };
    };
    // add defaults
    let config: object = Coalesce(Defaults, pkgConfig);
    return config;
}