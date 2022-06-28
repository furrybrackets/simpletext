import fs from 'fs-extra';

fs.copy('./src/init/template', './dist/init/template', { overwrite: true });