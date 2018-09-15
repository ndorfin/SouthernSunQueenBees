module ContentfulHelpers

  def get_pages
    data.content.pages
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
    data.content.menus
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
end
