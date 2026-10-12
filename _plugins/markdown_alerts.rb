# Turns GitHub-style alerts into styled callouts at build time.
#
#   > [!NOTE]
#   > Some text
#
# kramdown renders that as a plain blockquote starting with "[!NOTE]". This hook rewrites it
# into the same markup assets/js/markdown-alerts.js produces, so alerts also look right in
# feed.xml and on sites that mirror the posts (such as zenithmoon.com), where the JS never runs.
# The JS skips blockquotes that are already converted, and still handles older "Note:" callouts.

module MarkdownAlerts
  TYPES = %w[note tip important warning caution].freeze
  OPENING = %r{<blockquote>(\s*)<p>\[!(#{TYPES.join('|')})\][ \t]*\n?}i
  EMPTY_AFTER_TITLE = %r{(<p class="markdown-alert__title">[^<]*</p>\s*)<p>\s*</p>\s*}

  def self.convert(html)
    return html unless html.include?('[!')

    html = html.gsub(OPENING) do
      space = Regexp.last_match(1)
      type = Regexp.last_match(2).downcase
      title = type.capitalize
      %(<blockquote class="markdown-alert markdown-alert--#{type}" role="note" aria-label="#{title}">) +
        %(#{space}<p class="markdown-alert__title">#{title}</p>#{space}<p>)
    end
    html.gsub(EMPTY_AFTER_TITLE, '\1')
  end
end

Jekyll::Hooks.register [:documents, :pages], :post_convert do |doc|
  next unless doc.respond_to?(:output_ext) && doc.output_ext == '.html'
  next unless doc.content.is_a?(String)

  doc.content = MarkdownAlerts.convert(doc.content)
end
