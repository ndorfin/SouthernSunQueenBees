# Southern Sun Queen Bees

Company website for Southern Sun Queen Bees

## Installation

1. Clone this repo into a local directory
2. Change to your new local directory
3. `brew install ImageMagick` (Required for the `middleman-favicon-maker` gem)
4. `bundle install`
5. `npm i`
6. `middleman`

## Development

### Defining JS manifests

To create the link between Webpack bundles and Middleman's HTML, you need to define each manifest or entry as follows:

- Define the Webpack entries in `config/entries.js`
- Create corresonding `<script>` references in in `source/_layouts/layout.erb`

### Defining CSS manifests

- Define the Webpack entries in `config/entries.js`
- Create corresonding `<link>` references in in `source/_layouts/layout.erb`

## Build

### Doing environment-specific builds

All builds default to production mode

    middleman build

If you want a STAGING specific build use the following:

    APP_ENV=staging middleman build

## Building for STAGING:

    git checkout develop
    git pull origin develop
    APP_ENV=staging middleman build

## Building for PRODUCTION:

    git checkout master
    git pull origin master
    APP_ENV=production middleman build

