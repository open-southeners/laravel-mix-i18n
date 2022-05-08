const mix = require('laravel-mix');
const i18n = require('./plugin');

mix.extend('i18n', new i18n);
