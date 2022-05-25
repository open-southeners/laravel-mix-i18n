const File = require('laravel-mix/src/File')
const path = require('path');
const extractor = require('./extractor');
const constants = require('./constants');
const defaults = require('lodash.defaultsdeep');

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
     */
    dependencies() {
        const loaderPackageName = '@intlify/vue-i18n-loader'
        const vueLoaderDependency = Mix.dependencies.items.filter(dep => dep.package.includes('vue-loader'))?.[0]

        if (vueLoaderDependency.package.includes('15')) {
            return [`${loaderPackageName}@^1.1.0`]
        }

        return [loaderPackageName];
    }

    /**
     * Register the component.
     *
     * @param {string} entry
     * @param {string} output
     * @param {import('./types').I18nMixOptions} options
     */
    register(entry, output, options = {}) {
        this.options = defaults({
            extractor: {
                path: entry,
                output
            }
        }, {
            extractor: constants
        }, options);

        if ('locales' in this.options.extractor) {
            const entries = extractor(this.options.extractor.locales, this.options.extractor)

            this.entry = entries.map(entry => new File(entry));
        }
    }

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