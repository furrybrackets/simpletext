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
  "target": "es5",
  "navigation": "none",
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

> # `jsfile`
>
> Used when `universal-js` is enabled.
>
> Options: any path, `default`
>
> Will locate path and generate JavaScript from it. If `transpile` is set to `true`, it will transpile the source to support specific browsers defined with the `target` command.

> # `markdown-spec`
>
> To describe the Markdown syntax used.
>
> Options: `github`, `simplemark`, `commonmark`
>
> `github`: Uses the GitHub Markdown syntax.
> 
> `simplemark`: Uses the Simpletext Markdown syntax (adds Mathematics, basic HTML embedding).
>
> `commonmark`: Uses the CommonMark syntax.

> # `css`
>
> Adds option for pre-loaded CSS code in your pages.
>
> Options: file path, `default`, `light`, `dark`
>
> `default`: Loads the default CSS used by Simple Text. (Light or Dark inferred from system theme)
>
> `light`: Loads the light CSS used by Simple Text.
>
> `dark`: Loads the dark CSS used by Simple Text.
>
> `file path`: Loads the CSS file at the specified path.

> # `assets`
>
> Location of the assets folder.
>
> Options: any path
>
> Loads the assets folder.

> # `favicon`
>
> Path to a png, jpg, or ico file.
>
> Options: any path, `default`
>
> `default`: Loads the default favicon (boring S).
>
> `file path`: Loads the file at the specified path. Will be converted into the corresponding favicons.

> # `routing`
>
> How to route pages. Minor customization of routing styles.
>
> Options: `standard`, `spa`
>
> `standard`: Uses the standard routing, just generates HTML files with navbar.
>
> `spa`: Single Page Application. Adds a customizable navbar.

> # `templates`
>
> Templating system used.
>
> Options: `none`, `handlebars`, `mustache`, `pug`
>
> `none`: No templating.
>
> `handlebars`: Uses Handlebars.
>
> `mustache`: Uses Mustache.
>
> `pug`: Uses Pug.

> # `transpile`
>
> Whether to transpile the source to support specific browsers defined with the `target` command.
>
> Options: `true`, `false`
>

> # `target`
>
> Target browsers to transpile to.
>
> Options: `es5`, `es6`, `es2015`, `es2016`, `es2017`, `es2018`, `es2019`, `es2020`, `esnext`
>

> # `navigation`
>
> Navigation options. Formatted as a list.
>
> Options: `(string) (string) (string)...`
>
> ## Examples
>
> `top search listdown` will generate a navbar with a search bar and a list of links defined in the assets folder called `links.js`.
>
> ## Terms
>
> `top`: Top navigation bar.
>
> `left`: Left navigation bar.
>
> `right`: Right navigation bar.
>
> `bottom`: Bottom navigation bar.
>
> `search`: Add search bar. Can be refined with `search:(updated term)`. Example:
>
> `search:loose` will give loose matches.
>
> `search:strict` will not also match for typos.
>
> `listdown`: Add a list of major pages.