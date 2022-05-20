const File = require('laravel-mix/src/File')
const path = require('path');
const extractor = require('./extractor');
const constants = require('./constants');
const merge = require('deepmerge');

class i18n {
    /** @type {File[]} */
    entry = [];

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
     * Specifiy one or more dependencies that must
     * be installed for this component to work
     *
     * @returns {import("laravel-mix/src/Dependencies").Dependency[]}
     **/
     dependencies() {
        return ['@intlify/vue-i18n-loader'];
    }

    /**
     * Register the component.
     *
     * @param {string} entry
     * @param {string} output
     * @param {import('./types').I18nMixOptions} options
     */
    register(entry, output, options = {}) {
        this.options = merge.all([
            {
                extractor: {
                    path: entry,
                    output
                }
            },
            options,
            {
                extractor: constants
            }
        ]);

        if ('locales' in this.options.extractor) {
            const entries = extractor(this.options.extractor.locales, this.options.extractor)

            this.entry = entries.map(entry => new File(entry));
        }
    }

    /**
     * Assets to append to the webpack entry.
     *
     * @param {import('laravel-mix/src/builder/Entry')} entry
     */
    //  webpackEntry(entry) {
    //     this.entry.forEach(file => {
    //         entry.add(this. this.options.extractor.path, file, this.entry[0]);
    //     });
    // }

    /**
     * Rules to be merged with the underlying webpack rules.
     *
     * @return {Array|Object}
     */
     webpackRules() {
        if (this.entry.length === 0 || !this.options.loader) {
            return [];
        }

        return [
            {
                test: /\.(json5?|ya?ml)$/,
                type: 'javascript/auto',
                loader: '@intlify/vue-i18n-loader',
                include: [
                    path.resolve(this.options.extractor.output),
                ]
            }
        ];
    }
}

module.exports = i18n