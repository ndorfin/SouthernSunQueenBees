class ProductPageMapper < ContentfulMiddleman::Mapper::Base
  def map(context, entry)
    super
    context.path = "/products/#{context.slug}/"
    context.file_path = "#{context.path}index.html"
  end
end
