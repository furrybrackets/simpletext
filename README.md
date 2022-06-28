# Simple Text
Ultra-simple, zero-config Markdown/Pulldown website generator.

## Getting Started
To use `simpletext`, install it as a dev dependency:

*Yarn*
```
yarn add --dev simpletext
```

*NPM*
```
npm i simpletext --save-dev
```

## Creating a new website
Simple Text has reasonable defaults. Just add a `src` folder and start creating content.

*Demo Filestructure*
```
package.json
src/
  - index.md
  - about.md
README.md
```

To run a dev server:
```console
user@comp$ npx simple dev
✨ built in 26ms
```

To build:
```console
user@comp$ npx simple build
✨ built in 1.06s to dist/
```

## Configurables
`simpletext` supports an array of options in your package.json file.


*Node.js `package.json` template*
```json
{
  "name": "my-content",
  "version": "1.0.0",
  "description": "My amazing website.",
  "main": "src/index.md",
  "scripts": {
    "build": "simple build",
    "dev": "simple dev"
  },
  "author": "John Doe",
  "license": "MIT"
}
```

*Configurable options with defaults when omitted*
```json
{
  "markup": "infer",
  "js": "false",
  "universal-js": "true",
  "jsfile": "default",
  "markdown-spec": "simplemark",
  "css": "default",
  "assets": "assets",
  "favicon": "default",
  "routing": "standard",
  "templates": "none",
  "transpile": "true",
  "target": "es5"
}
```

### What each option does

> # `markup`
>
> Describes the markup format used.
>
> Options: `markdown`, `pulldown`, or `infer`
>
> `markdown`: Uses Markdown markup, adds markdown-spec options
>
> `pulldown`: Simpletext's custom Markup language, brief and linguistic.
>
> `infer`: Will infer type from file-ending (either `.md` or `.pd`).

> # `js`
>
> Adds option for pre-loaded JavaScript code in your pages.
>
> Options: `true`, `false`
>
> `true`: Adds JS to your page. Defaults to standard JavaScript needed for theme-switching.
>
> `false`: Do not generate or load JavaScript.

> # `universal-js`
>
> Whether to have seperate JS for each page or not.
>
> Options: `true`, `false`
>
> `true`: Search for page-specific JS in the folder specified in `assets`.
>
> `false`: Loads one JS file for all pages.

> `jsfile`
>
> Used when `universal-js` is enabled.
>
> Options: any path, `default`
>
> Will locate path and generate JavaScript from it. If `transpile` is set to `true`, it will transpile the source to support specific browsers defined with the `target` command.
