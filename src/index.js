const mix = require('laravel-mix');
const I18n = require('./plugin');

mix.extend('i18n', new I18n);
