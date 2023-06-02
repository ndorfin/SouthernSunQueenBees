set :env, ENV['APP_ENV'] || 'development'
activate :dotenv, env: ".env.#{ENV['APP_ENV'] || 'development'}"

require 'helpers/contentful_helpers.rb'
include ContentfulHelpers

# Configuration
# =================================================================================

# Dependencies
# See ./helpers

# Path settings
set :css_dir, 'css'
set :fonts_dir, 'fonts'
set :images_dir, 'img'

activate :directory_indexes
activate :relative_assets
set :relative_links, true
set :base_url, '/'

if config[:env] == 'production'
  set :host, 'https://southernsun.co.nz'
else
  set :host, 'http://localhost:4567'
end

# Layout settings
# =================================================================================

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page "/google*.html", :directory_index => false, layout: false

# Server config (Development by default)
# =================================================================================

configure :server do

  create_pages()

  activate :livereload,
    no_swf: true,
    livereload_css_target: 'css/style.main.css'

end

# Build config (Production by default)
# =================================================================================

configure :build do

  ignore '**/.keep'
  ignore 'templates/*'
  ignore 'partials/*'

  create_pages() # First-pass through the content so we can use the sitemap data Middleman provides

  activate :asset_hash, ignore: %w[
    opengraph.*
    opengraph*.*
    *touch-icon*.*
    *ms-tile*.*
    service-worker.js
    *.xml
    *.txt
    *.json
    favicon.ico
    *.woff
    *.woff2
  ]

  activate :minify_css

  activate :minify_html do |html|
    html.remove_http_protocol    = false
    html.remove_input_attributes = false
    html.remove_quotes           = true
    html.remove_intertag_spaces  = true
  end

  activate :gzip do |gzip|
    gzip.exts = %w[.js .css .html .htm .svg .xml .ico .map .json]
  end

end

# Contentful
# ==============================================================================

activate :contentful do |f|
  f.space           = { content: ENV['CONTENTFUL_SPACE_ID'] }
  f.access_token    = ENV['CONTENTFUL_ACCESS_TOKEN']
  f.use_preview_api = false
  f.cda_query       = { limit: 1000 }
  f.content_types   = {
    pages: 'page',
    services: 'service',
    products: 'product',
    biographies: 'biography',
    notices: 'notices',
    testimonials: 'testimonial',
    menus: 'menu',
    icons: 'icon',
    universal: 'universal',
    areas: 'contentAreas',
    term_types: 'termTypes'
  }
end
