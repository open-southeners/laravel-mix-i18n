# Laravel Mix i18n

[![npm](https://img.shields.io/npm/v/laravel-mix-i18n)](https://www.npmjs.com/package/laravel-mix-i18n) [![npm](https://img.shields.io/npm/dm/laravel-mix-i18n)](https://www.npmjs.com/package/laravel-mix-i18n)

Integrate Laravel Mix with [vue-i18n](https://vue-i18n.intlify.dev/) and its official Webpack loader + extract localisable strings from all around your project code.

## Getting started

```sh
yarn add -D laravel-mix-i18n
# or
npm i --dev laravel-mix-i18n
```

And add in your `webpack.mix.js`:

```js
const mix = require('laravel-mix')
require('laravel-mix-i18n')

// Rest of your mix tasks here...

mix.i18n('resources/views', {
    extensions: '.blade.php',
    output: 'resources/lang'
})
```

## Advanced usage

### Command line

You can also use this from your terminal just type:

```sh
./node_modules/.bin/i18n-extractor run es,en,fr,ch,jp
```

For more help just run it with `--help` or check the options below for more reference.

### Options

**Note: These are the options available for the extractor both in CLI, and webpack through `extractor` key**

| **Name**   | **Type**           | **Default**                                            |
|------------|--------------------|--------------------------------------------------------|
| path       | `string`           | {currentDir}/resources/js                              |
| extensions | `string`           | ts,tsx,js,jsx,vue,blade.php                            |
| output     | `string`           | {currentDir}/resources/lang                            |
| match      | `RegExp \| string` | ```/(\$t\|trans\|__)\([\'"`]([a-zA-Z0-9: ]+)[\'"`]/``` |

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).