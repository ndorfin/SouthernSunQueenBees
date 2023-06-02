class PageMapper < ContentfulMiddleman::Mapper::Base
  def map(context, entry)
    super
    context.path = "/#{context.url}/"
    context.file_path = "#{context.path}index.html"
  end
end
