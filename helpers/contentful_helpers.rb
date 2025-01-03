module ContentfulHelpers

  def get_pages
    @app.data.content.pages
  end

  def get_product_pages
    @app.data.content.product_pages
  end

  def create_pages
    get_pages().each do |page_id, page|
      if page.url != 'home'
        proxy "#{page.url}/index.html",
          '/templates/template_page.html',
          locals: { page: page }
      end
    end
  end

  def get_menu_items
    @app.data.content.menus
  end

  def get_menu_by_slug(slug)
    matching_menu = get_menu_items().select do |menu_id, menu|
      menu.slug == slug
    end
    matching_menu.flatten[1]
  end

  def get_top_level_menu_items
    top_level_menu = get_menu_by_slug('header-menu')
    top_level_menu.page_links
  end

  def get_homepage
    homepage = get_pages().select do |page_id, page|
      page.url == 'home'
    end
    homepage.flatten[1]
  end

  def get_content_areas
    @app.data.content.areas
  end

  def get_content_area_item(slug)
    item = get_content_areas().select do |c_id, c|
      c.slug == slug
    end
    item.flatten[1]
  end

end
