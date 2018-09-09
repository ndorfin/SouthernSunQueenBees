module ContentfulHelpers

  def get_pages
    data.content.pages
  end

  def create_pages
    get_pages().each do |page_id, page|
      proxy "#{page.url}/index.html",
        '/templates/template_page.html',
        locals: { page: page }
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
end
