declare module 'laravel-mix' {
    interface Api {
        /**
         * Compile JavaScript or TypeScript using SWC
         *
         * `src` may be a glob pattern
         **/
        i18n(src: string | string [], options: I18nMixOptions): Api
    }
}

export interface I18nExtractorOptions {
    path?: string
    match?: RegExp
    locales: string
}

export interface I18nMixOptions {
    extract?: boolean
    extractor?: I18nExtractorOptions
}

