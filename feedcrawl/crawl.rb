require 'json'
require 'httpclient'
require "uri"
require "nokogiri"

def process_url(base, url)
  fullurl = "#{base}#{url}"
  puts(fullurl)
  resp = @cli.get(fullurl, {}, {"Accept": "application/json"})
  abort("ERROR: #{resp.status}") unless resp.status == 200
  doc = Nokogiri::XML(resp.body)
  nurl = doc.xpath("/xmlns:feed/xmlns:link[@rel='next']/@href")
  ids = doc.xpath("/xmlns:feed/xmlns:entry/xmlns:id/text()")
  ids.each do |id|
    @count = @count + 1
    # puts "\t#{id}"
  end
  return nurl
end

base = ARGV[0]
url = ARGV[1]
abort "ERROR: Supply feed base and url" if base.nil? || url.nil?

@cli = HTTPClient.new
@cli.ssl_config.verify_mode = OpenSSL::SSL::VERIFY_NONE
@max_pages = 0
@max_objects = 5000
@count = 0
@page = 0
until url.nil? || url.empty? do
  url = process_url(base, url)
  @page = @page + 1
  break unless @max_pages == 0 || @page < @max_pages
  break unless @max_objects == 0 || @count < @max_objects
end
puts("Object count: #{@count}")

