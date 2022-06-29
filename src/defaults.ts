const Defaults = {
    markup: "infer", // infer from the file extension, .md or .pd
    js: "false", // load javascript
    "universal-js": "true", // one file for all components
    jsfile: "default", // path to the javascript file
    "markdown-spec": "simplemark", // simplemark | github | commonmark
    css: "default", // load default css
    assets: "default", // path to the assets folder
    favicon: "default", // path to the favicon
    routing: "standard", // default routing options,
    templates: "none", // template engine
    transpile: "true", // should transpile javascript
    target: "es5"
};

export default Defaults;