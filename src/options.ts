export const Options = {
    markup: ["infer", "markdown", "pulldown"],
    js: ["false", "true"],
    "universal-js": ["true", "false"],
    jsfile: ["default"],
    "markdown-spec": ["simplemark", "github", "commonmark"],
    css: ["default", "light", "dark"],
    assets: ["default"],
    favicon: ["default"],
    routing: ["standard", "spa"],
    templates: ["none", "handlebars", "mustache", "pug"],
    transpile: ["true", "false"],
    target: ["es5", "es6", "es2015", "es2016", "es2017", "es2018", "es2019", "es2020", "esnext"],
    navigation: ["STRING"],
    codeTheme: ["dark", "light", "monokai", "default"],
}

// options with PATH
export const DynamicOptions = ["assets", "favicon", "jsfile", "css"];