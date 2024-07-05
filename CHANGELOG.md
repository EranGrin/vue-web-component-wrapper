# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [1.6.2] - 05.07.2024
### Fixed
- Fixed issue style tag injection order
- Fixed TS types issue with SFC

## [1.6.0] - 13.06.2024
### Added
- Added support for SFC custom elements

## [1.5.1] - 12.06.2024
### Fixed
- Fixed issue with HMR in Vite.js

## [1.5.0] - 03.06.2024
### Added
- Added support for web components without shadow DOM

## [1.4.4] - 03.05.2024
### Fixed
- Rollback changes with :root replacement as most use cases are for css variables and this does work web components
- Fixed package types


## [1.4.1] - 25.04.2024
### Fixed
- Issue with :root selector
### Added
- Add auto function to replace all :root selector css with :host selector


## [1.4.0] - 25.01.2024
### Added
- Added support for provide/inject
- Fixed demo app
- Added documentation for provide/inject

## [1.3.4] - 19.01.2024
### Fixed
- Fixed WEBPACK 5 support example
- Fixed issue with 'emits' option

## [1.3.0] - 19.01.2024
### Added
- Added support for slots and named slots
- Added support for event emitting
- Added support for enhanced v-model
### Fixed
- Added support for disabling style removal on unmount

## [1.2.0] - 23.10.2023
### Added
- Added support for Vue DevTools extension

## [1.1.1] - 1.8.2023
- Fixed README.md
- Fixed package.json package entry point in monorepo

## [1.1.0] - 1.6.2023
### Added 
- Added support for Vite.js
- Added support for TS
- Added linting
- Improved documentation
- Migrate project to pnpm

## [1.0.5] - 18.5.2023

### Added
- Vitepress documentation

### Changed
- Improved README.md

## [1.0.1] - 17.4.2023

### Changed
- Fixed markdown in README.md