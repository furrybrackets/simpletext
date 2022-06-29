import path from 'path';
import fs from 'fs-extra';


export function RegisterJIT(directory: string, config: object): JITInstance {
    return new JITInstance(directory, config);
};

class JITInstance {
    dir: string;
    config: any;
    currentTask: any;
    tasks: Array<any>;
    src: string;
    assets: string;
    pages: Array<any>;
    files: Array<any>;
    // routes: Routes;
    routes: Array<any>;

    constructor(directory: string, config: any) {
        this.dir = directory;
        this.config = config;

        this.currentTask = null;
        this.tasks = [];

        this.src = path.join(this.dir, 'src');
        this.assets = path.join(this.dir, config.assets);

        this.pages = [];
        this.files = [];

        // this.routes = new Routes();
        this.routes = [];
    };

    addTask(task): void {
        this.tasks.push(task);
        if (this.currentTask === null) {
            this.currentTask = task;
        };
    };

    runTask(): void {
        if (this.currentTask === null) {
            return;
        };
        this.currentTask();
        this.tasks.pop();
    };

    run(): any {
        while (this.tasks.length > 0) {
            this.runTask();
        };
        return this.routes;
    }
}