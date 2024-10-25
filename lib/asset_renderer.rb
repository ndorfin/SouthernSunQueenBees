class AssetRenderer < RichTextRenderer::BaseNodeRenderer
  def render(node)
    entry = node['data']['target']
    if entry.url.end_with?('.jpg', '.jpeg', '.png', '.webp')
      "
      <picture>
        <source srcset=\"#{ entry.url }?fm=avif&q=70\" type=\"image/avif\">
        <source srcset=\"#{ entry.url }?fm=webp&q=70\" type=\"image/webp\">
        <img src=\"#{ entry.url }?fm=jpg&fl=progressive&q=70\" alt=\"#{ entry.title }\">
      </picture>
      "
    elsif entry.url.end_with?('.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.csv')
      "
      <p>
        <a href=\"#{ entry.url }\" download>
          #{ entry.title }
        </a>
      </p>
      "
    else
      ""
    end
  end
end

# data:
#   target:
#     :title: IMG 5754
#     :description:
#     :url: "//images.ctfassets.net/mgfk1lgkyuzl/4h4x84mHzOimcKucE6Semm/369abafea581e29b4cbdda50df1ea44d/IMG_5754.jpg"
#     :_meta:
#       :updated_at: '2018-09-30T04:31:28+00:00'
#       :created_at: '2018-09-30T04:31:28+00:00'
#       :id: 4h4x84mHzOimcKucE6Semm
