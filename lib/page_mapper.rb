class PageMapper < ContentfulMiddleman::Mapper::Base
  def map(context, entry)
    super

    product_pages = entry.fields[:product_pages]
    if product_pages && product_pages.count > 1
      product_pages.each_with_index do |product_page, index|
        start_date = product_page.fields[:availability_start_date]
        if start_date
          context.product_pages[index].availability_start_date = start_date.iso8601
        end

        end_date = product_page.fields[:availability_end_date]
        if end_date
          context.product_pages[index].availability_end_date = end_date.iso8601
        end
      end
    end

    context.path = "/#{context.url}/"
    context.file_path = "#{context.path}index.html"
  end
end
