// import SimpleMark from './simplemark.js';
import CommonMark from './commonmark.js';
// import GitHub from './github.js';

export type Specification = 'github' | 'simplemark' | 'commonmark';
export interface CodeSource {
    path: string,
    source: string
}


export class Compile {
    private readonly spec: Specification;
    private readonly src: string;
    private readonly path: string;
    private html: string;
    private readonly options: any;

    constructor(code: CodeSource, specification: Specification, options: any) {
        this.spec = specification;
        this.src = code.source;
        this.path = code.path;
        this.html = "";
        this.options = options;
    };

    compile(): string {
        switch (this.spec) {
            // case 'simplemark':
                // this.html = SimpleMark(this.src);
                // break;
            case 'commonmark':
                this.html = CommonMark(this.src, this.options.theme);
                break;
            // case 'github':
                // this.html = GitHub(this.src);
                // break;
            default:
                throw new Error(`Unknown specification: ${this.spec}`);
        };
        return this.html;
    };

    getPath(): string {
        return this.path;
    }

    getHTML(): string {
        return this.html;
    };

    getSource(): string {
        return this.src;
    };
};