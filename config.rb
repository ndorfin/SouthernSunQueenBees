set :env, ENV['APP_ENV'] || 'development'
activate :dotenv, env: ".env.#{ENV['APP_ENV'] || 'development'}"

# Ignore all templates in build output
ignore 'templates/*'
ignore '**/.keep'
ignore 'partials/*'
ignore 'home/*'

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

  activate :gzip do |gzip|
    gzip.exts = %w[.js .css .html .htm .svg .xml .ico .map .json]
  end

end
