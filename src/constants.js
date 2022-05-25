/** @type {import('./types').I18nExtractorOptions} */
module.exports = {
    match: /(\$t|\$tc|t|trans|__)\(['"`](.+)['"`]\)/,
    extensions: 'ts,tsx,js,jsx,vue,blade.php',
}