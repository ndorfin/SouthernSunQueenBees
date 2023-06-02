# Southern Sun Queen Bees

Company website for Southern Sun Queen Bees

## Environment

This project uses the following:

- [Middleman](https://middlemanapp.com/) on Ruby v3+. A static site generator similar to Jekyll with Rails-like conventions
- [Contentful](https://www.contentful.com/). A headless CMS with the content broken up into several types of blocks across a number of pages.
- [CircleCI](https://circleci.com/). Build environment that listens to Webhook requests from Contentful
- [GitHub Pages](https://pages.github.com/). CircleCI will push built content to the `gh-pages` branch on this repo, which GitHub Pages then serves at [`southernsun.co.nz`](https://southernsun.co.nz).

## Installation

1. Clone this repo into a local directory
1. Change to your new local directory
1. `bundle install`
1. Get the latest content from Contentful: `middleman contentful`
1. `middleman`

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

