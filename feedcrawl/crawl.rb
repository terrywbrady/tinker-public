require 'json'
require 'httpclient'
require "uri"
require "nokogiri"

def process_url(base, url, page=0)
  fullurl = "#{base}#{url}"
  puts(fullurl)
  resp = @cli.get(fullurl, {}, {"Accept": "application/json"})
  abort("ERROR: #{resp.status}") unless resp.status == 200
  doc = Nokogiri::XML(resp.body)
  nurl = doc.xpath("/xmlns:feed/xmlns:link[@rel='next']/@href")
  lurl = doc.xpath("/xmlns:feed/xmlns:link[@rel='last']/@href")
  ids = doc.xpath("/xmlns:feed/xmlns:entry/xmlns:id/text()")
  ids.each do |id|
    puts "\t#{id}"
  end
  return if nurl == lurl
  page = page + 1
  puts "Page: #{page}"
  return if page >= @max_pages
  process_url(base, nurl, page)
end

base = ARGV[0]
url = ARGV[1]
abort "ERROR: Supply feed base and url" if base.nil? || url.nil?

@cli = HTTPClient.new
@max_pages = 5
process_url(base, url)

