#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const extractor = require('../src/extractor')
const path = require('path')
const constants = require('../src/constants')

yargs(hideBin(process.argv))
    .command('run [locales]', 'extract localisable strings from your project path', (yargs) => {
        return yargs.positional('locales', {
            describe: 'Comma separated list of locales'
        })
        .demandOption('locales')
        .options({
            'path': {
                alias: 'p',
                describe: 'Source path where start finding for your project\'s code (can be relative)',
                default: path.join(process.cwd(), 'resources', 'js')
            },
            'extensions': {
                alias: 'e',
                describe: 'Files extensions to match as input',
                default: constants.extensions
            },
            'output': {
                alias: 'o',
                describe: 'Output path to place all generated locales',
                default: path.join(process.cwd(), 'resources', 'lang')
            },
            'match': {
                alias: 'm',
                describe: 'Customize match regexp to search within input files',
                default: constants.match
            }
        })
    }, (argv) => {
        extractor(argv.locales, argv)
    })
    .help()
    .parse()