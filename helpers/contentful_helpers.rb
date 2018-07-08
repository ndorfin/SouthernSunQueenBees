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

  def get_top_level_menu_items
    top_level_pages = get_pages().select do |page_id, page|
      page.show_in_top_level_menu == true
    end
    print "top_level_pages: #{top_level_pages}\n"
    top_level_pages.to_a
  end
end
