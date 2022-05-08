#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const extractor = require('../extractor')

yargs(hideBin(process.argv))
    .command('run [locales]', 'extract localisable strings from the following input', (yargs) => {
        return yargs.positional('locales', {
            describe: 'Comma separated list of locales to generate into files'
        })
        .demandOption('locales')
        .options({
            'path': {
                alias: 'p',
                describe: 'Source path where start finding resources',
                default: process.cwd()
            }
        })
    }, (argv) => {
        extractor(argv.locales, {
            path: argv.path
        })
    })
    .help()
    .parse()