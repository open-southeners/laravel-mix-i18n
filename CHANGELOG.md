# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.1] - 2022-05-25

### Fixed

- Webpack loader rule matching now by i18n block

## [1.2.0] - 2022-05-25

### Added

- Json indentation option for prettify file content writing

### Fixed

- Issue with predefined options (constants)
- Removed deepmerge still in use in extractor (changed)

## [1.1.0] - 2022-05-25

### Added

- Compatibility with Vue 2

### Fixed

- Options object key-values didn't get merged properly with defaults (user options not respected)
- Removing NodeJS engine restriction

## [1.0.1] - 2022-05-20

### Changed

- Minor corrections to laravel-mix method args types

## [1.0.0] - 2022-05-20

### Fixed

- Webpack plugin doesn't output the right files

### Changed

- Options & default options to work with webpack (CLI remains the same)

## [0.2.0] - 2022-05-20

### Added

- Locale files are now generated leaving previously translated values
- Multiple options now available in the CLI + Laravel Mix plugin like: `match`, `output`, `extensions`

### Changed

- Multiple internal API changes

## [0.1.0] - 2022-05-08

### Added

- Initial release!