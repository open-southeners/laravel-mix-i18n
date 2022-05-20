/** @type {import('./types').I18nExtractorOptions} */
module.exports = {
    match: '(trans|__)([\'"`]([a-zA-Z0-9: ]+)[\'"`]',
    extensions: 'ts,tsx,js,jsx,vue,blade.php',
}