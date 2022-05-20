const path = require('path')
const { writeJson, readFile, existsSync } = require('fs-extra')
const glob = require('glob-promise')
const merge = require('deepmerge')

/**
 * @param {string} currentDir
 * @param {RegExp|string} match
 * @param {string} filesExt
 */
async function jsonMatchingContent(currentDir, match, filesExt) {
    const regex = new RegExp(match, 'gm')
    const files = await glob(`${currentDir}/**/*.{${filesExt}}`)
    const jsonMatchedContentObj = {}

    for (const file of files) {
        const fileContent = await readFile(file)
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
 * @return {Promise}
 */
module.exports = async function (locales, options) {
    const localesArr = locales.split(',')

    if (localesArr.length <= 0) {
        return console.error('No locales were introduced as input, some are required.', 1)
    }

    let currentDir = options?.path || process.env.PWD

    currentDir = path.isAbsolute(currentDir) ? currentDir : path.resolve(process.env.PWD, currentDir)

    const generatedLocaleFilePathArr = []

    for (const locale of localesArr) {
        generatedLocaleFilePathArr.push(path.resolve(currentDir, `${locale}.json`))
    }

    let contentMatched = await jsonMatchingContent(currentDir, options.match, options.extensions)
    let filePath

    while (filePath = generatedLocaleFilePathArr.pop()) {
        if (existsSync(filePath)) {
            const originalFileContent = await readFile(filePath)
    
            contentMatched = merge(contentMatched, JSON.parse(originalFileContent))
        }

        try {
            await writeJson(filePath, contentMatched)
        } catch (err) {
            console.error('Something happened trying to write the locale file. Please try again.')
        }
    }

    console.log(`${locales} files generated successfully!`)
}
