# Southern Sun Queen Bees

Company website for Southern Sun Queen Bees

## Installation

1. Clone this repo into a local directory
2. Change to your new local directory
3. `brew install ImageMagick` (Required for the `middleman-favicon-maker` gem)
4. `bundle install`
6. `middleman`
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

