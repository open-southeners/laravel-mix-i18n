const path = require('path');
const extractor = require('./extractor');

class i18n {
    /** @type {string} */
    entry = '';

    /** @type {import('./types').I18nMixOptions} */
    options = {};

    /**
     * The API name for the component.
     *
     * @return {String|Array}
     */
    name() {
        return 'i18n';
    }

    /**
     * Register the component.
     *
     * @param {string} entry
     * @param {import('./types').I18nMixOptions} options
     */
    register(entry, options = {}) {
        this.entry = entry;
        this.options = options;

        if ('extract' in this.options && this.options.extract) {
            extractor(this.options.extractor.locales, {
                path: this.options.extractor.path || this.entry,
                match: this.options.extractor.match
            });
        }
    }

    /**
     * Rules to be merged with the underlying webpack rules.
     *
     * @return {Array|Object}
     */
     webpackRules() {
        return [
            {
                test: /\.(json5?|ya?ml)$/,
                type: 'javascript/auto',
                loader: '@intlify/vue-i18n-loader',
                include: [
                    path.resolve(this.entry)
                ]
            }
        ];
    }
}

module.exports = i18n