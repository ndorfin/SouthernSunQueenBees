class ProductPageMapper < ContentfulMiddleman::Mapper::Base
  def map(context, entry)
    super

    if entry.fields[:availability_start_date]
      context.availability_start_date = context.availability_start_date.iso8601
    end

    if entry.fields[:availability_end_date]
      context.availability_end_date = context.availability_end_date.iso8601
    end

    context.path = "/products/#{context.slug}/"
    context.file_path = "#{context.path}index.html"
  end
end
