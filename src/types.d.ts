declare module 'laravel-mix' {
    interface Api {
        /**
         * Process code to generate translation files from them
         **/
        i18n(src: string, output: string, options: I18nMixOptions): Api
    }
}

export interface I18nExtractorOptions {
    path?: string
    match?: RegExp | string
    output?: string
    locales: string
    extensions?: string
    indentation?: string | number
}

export interface I18nMixOptions {
    loader?: boolean
    extractor?: Partial<Omit<I18nExtractorOptions, 'path' | 'output'>>
}
