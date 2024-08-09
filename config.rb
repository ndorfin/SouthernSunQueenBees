set :env, ENV['APP_ENV'] || 'development'
activate :dotenv, env: ".env.#{ENV['APP_ENV'] || 'development'}"

# Ignore all templates in build output
ignore 'templates/*'
ignore '**/.keep'
ignore 'partials/*'
ignore 'home/*'

# Add a custom mapper for the `middleman contentful` command
# This will append keys to the `pages` entries, which will then be used while generating pages per 'page' entry.
require 'lib/page_mapper'
require 'lib/product_page_mapper'

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

# Generate pages from the Contentful 'page' content_type.
# =================================================================================
# Ensure `pages` data exists before trying to access it
if @app.data.try('content').try('pages')
  @app.data.content.pages.each do |_id, page|
    # Generate static URLs for each of the 'page' entries
    proxy page.file_path, '/templates/template_page.html', locals: { page: page }
  end
  @app.data.content.product_pages.each do |_id, product_page|
    # Generate static URLs for each of the 'product_page' entries
    proxy product_page.file_path, '/templates/template_product_page.html', locals: { product_page: product_page }, layout: 'product_page'
  end
else
  # We can assume that no content has been fetched from Contentful yet. Let the user know.
  print "WARNING: You need to run `bundle exec middleman contentful` first.\n"
  print "Without the `content` in the `data` folder, Middleman can't generate all the relevant pages.\n"
  print "If you're seeing this message while running the `middleman contentful` command, it's safe to ignore this message.\n"
end

require 'helpers/contentful_helpers.rb'
include ContentfulHelpers

# Server config (Development by default)
# =================================================================================

configure :server do

  activate :livereload,
    no_swf: true,
    livereload_css_target: 'css/style.main.css'

end

# Build config (Production by default)
# =================================================================================

configure :build do

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
  f.cda_query       = { limit: 1000 }
  f.content_types   = {
    pages: {
      mapper: PageMapper, # See lib/page_mapper.rb
      id: 'page'
    },
    services: 'service',
    products: 'product',
    product_pages: {
      mapper: ProductPageMapper, # See lib/product_page_mapper.rb
      id: 'productPage'
    },
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
