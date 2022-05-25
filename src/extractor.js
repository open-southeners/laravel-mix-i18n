const path = require('path')
const { writeJsonSync, readFileSync, existsSync } = require('fs-extra')
const glob = require('glob')
const defaults = require('lodash.defaultsdeep')

/**
 * @param {string} currentDir
 * @param {RegExp|string} match
 * @param {string} filesExt
 */
function jsonMatchingContent(currentDir, match, filesExt) {
    const regex = new RegExp(match, 'gm')
    const files = glob.sync(`${currentDir}/**/*.{${filesExt}}`)
    const jsonMatchedContentObj = {}

    for (const file of files) {
        const fileContent = readFileSync(file, { encoding: 'utf8' })
        let matchedContent

        while ((matchedContent = regex.exec(fileContent)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (matchedContent.index === regex.lastIndex) {
                regex.lastIndex++
            }

            matchedContent.forEach((match, groupIndex) => {
                // Uncomment this to debug purposes
                // console.log(`Matched number ${groupIndex}: ${match}`);
                // This equals to what is inside the first param of the translate functions
                if (groupIndex === 2) {
                    jsonMatchedContentObj[match] = ''
                }
            })
        }
    }

    return jsonMatchedContentObj
}

/**
 * @param {string} locales
 * @param {import('./types').I18nExtractorOptions} options
 * @return {string[]}
 */
module.exports = function (locales, options) {
    const localesArr = locales.split(',')

    if (localesArr.length <= 0) {
        throw Error('No locales were introduced as input, some are required.')
    }

    let currentDir = options?.path || process.cwd()

    currentDir = path.isAbsolute(currentDir) ? currentDir : path.resolve(process.cwd(), currentDir)

    const generatedLocaleFilePathArr = []

    for (const locale of localesArr) {
        generatedLocaleFilePathArr.push(path.resolve(options.output, `${locale}.json`))
    }

    const outputPaths = []
    let contentMatched = jsonMatchingContent(currentDir, options.match, options.extensions)
    let filePath

    // eslint-disable-next-line no-cond-assign
    while (filePath = generatedLocaleFilePathArr.pop()) {
        if (existsSync(filePath)) {
            contentMatched = defaults(JSON.parse(readFileSync(filePath, { encoding: 'utf8' })), contentMatched)
        }

        writeJsonSync(filePath, contentMatched, { encoding: 'utf8', spaces: options.indentation })

        outputPaths.push(filePath)
    }

    return outputPaths
}
