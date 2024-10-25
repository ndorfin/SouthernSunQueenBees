class MenuMapper < ContentfulMiddleman::Mapper::Base
  def map(context, entry)
    super

    page_links = entry.fields[:page_links]
    if page_links && page_links.count > 1
      page_links.each_with_index do |page, page_index|
        product_pages = page.fields[:product_pages]
        if product_pages
          product_pages.each_with_index do |product_page, index|
            start_date = product_page.fields[:availability_start_date]
            if start_date
              context.page_links[page_index].product_pages[index].availability_start_date = start_date.iso8601
            end
            end_date = product_page.fields[:availability_end_date]
            if end_date
              context.page_links[page_index].product_pages[index].availability_end_date = end_date.iso8601
            end
          end
        end
      end
    end

    context.path = "/#{context.slug}/"
    context.file_path = "#{context.path}index.html"
  end
end
