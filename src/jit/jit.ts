import path from "path";
import fs from "fs-extra";
import { Routes, Route, RouteSpecifier } from "./routes";

export function RegisterJIT(directory: string, config: object): JITInstance {
    return new JITInstance(directory, config);
}

class JITInstance {
    dir: string;
    config: any;
    src: string;
    assets: string;
    pages: Array<any>;
    files: Array<any>;
    routes: Routes;
    changes: Array<any>;

    constructor(directory: string, config: any) {
        this.dir = directory;
        this.config = config;

        this.src = path.join(this.dir, "src");
        this.assets = path.join(this.dir, config.assets);

        this.pages = [];
        this.files = [];

        // this.routes = new Routes();
        this.routes = new Routes();

        // register pages and files
        this.__registerPages();
        this.__registerAssets();

        // change tracking for quick diffs
        this.changes = [];
    };

    run(): any {
        // run the compiler
        // return the compiled output
        while (this.changes.length > 0) {
            // TODO: implement
        }
        return this.routes;
    }

    private __registerPages(): void {
        // go through the pages directory and register each page
        let pages = fs.readdirSync(this.src);
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            let pagePath = path.join(this.src, page);
            let pageData = fs.readFileSync(pagePath, "utf8");
            if (this.config.markup == "infer") {
                // check from end of file for .md or .mdwn
                let ext = path.extname(pagePath);
                if (ext === ".md" || ext === ".mdwn") {
                    let markup = "markdown";
                } else if (ext === ".pd") {
                    let markup = "pulldown";
                } else if (ext === ".html") {
                    let markup = "html";
                }
            }
            this.pages.push({
                path: pagePath,
                markup: this.config.markup,
                data: pageData,
            });
        }
    }

    private __registerAssets(): void {
        const assets = fs.readdirSync(this.config.assets);
        for (let i = 0; i < assets.length; i++) {
            let asset = assets[i];
            let assetPath = path.join(this.assets, asset);
            let assetExt = path.extname(assetPath);
            let assetData = fs.readFileSync(assetPath, "utf8");
            this.files.push({
                path: assetPath,
                type: assetExt.replace(".", ""),
                src: assetData,
            });
        }
    }

    registerPage(
        pagePath: string,
        FSEvent: "update" | "delete" | "create"
    ): boolean {
        let success: boolean = false;
        switch (FSEvent) {
            case "update":
                // update the page
                success = this.updatePage(pagePath);
                break;
            case "delete":
                // delete the page
                success = this.deletePage(pagePath);
                break;
            case "create":
                // create the page
                success = this.createPage(pagePath);
                break;
            default:
                throw new Error("Invalid FSEvent! Must be update, delete, or create.");
        }
        return success;
    }

    updatePage(pagePath: string): boolean {
        let pi = this.pages.findIndex((page) => page.path === pagePath);
        if (pi === -1) {
            return false;
        }
        let pageData = fs.readFileSync(pagePath, "utf8");
        this.pages[pi].data = pageData;
        this.changes.push({
            type: "page",
            path: pagePath,
            FSEvent: "update",
        });
        return true;
    }

    deletePage(pagePath: string): boolean {
        let pi = this.pages.findIndex((page) => page.path === pagePath);
        if (pi === -1) {
            return false;
        }
        this.pages.splice(pi, 1);
        this.changes.push({
            type: "page",
            path: pagePath,
            FSEvent: "delete",
        });
        return true;
    }

    createPage(pagePath: string): boolean {
        let pageData = fs.readFileSync(pagePath, "utf8");
        this.pages.push({
            path: pagePath,
            data: pageData,
        });
        this.changes.push({
            type: "page",
            path: pagePath,
            FSEvent: "create",
        });
        return true;
    };
}
