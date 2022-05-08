const path = require('path')
const { writeJson, readFile, copyFile, constants } = require('fs-extra')
const glob = require('glob-promise')

/**
 * @param {string} currentDir
 * @param {RegExp|null} match
 */
async function jsonMatchingContent(currentDir, match = null) {
    const regex = match || /(trans|__)\(['"`]([a-zA-Z0-9: ]+)['"`]/gm
    const files = await glob(`${currentDir}/**/*.{js,vue,blade.php}`)
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

    const contentMatched = await jsonMatchingContent(currentDir, options.match)
    
    const filePath = generatedLocaleFilePathArr.shift()

    try {
        await writeJson(filePath, contentMatched)
    } catch (err) {
        console.debug(err)
        console.error('Something happened trying to write the locale file. Please try again.')
    } finally {
        if (generatedLocaleFilePathArr.length > 0) {
            for (const toCopyFilePath of generatedLocaleFilePathArr) {
                copyFile(filePath, toCopyFilePath, constants.COPYFILE_EXCL, (err) => {
                    if (err) {
                        console.error(`Error copying file ${toCopyFilePath} :`, err)
                    }
                })
            }

            console.log(`${locales} files generated successfully!`)
        }

        console.log(`${filePath} file generated successfully!`)
    }
}
