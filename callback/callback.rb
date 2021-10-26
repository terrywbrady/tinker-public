require 'rubygems'
require 'bundler/setup'

require 'sinatra'
require 'sinatra/base'

require 'json'
require 'httpclient'

require "base64"
require "uri"

# ruby app.rb -o 0.0.0.0
set :port, 8098

set :bind, '0.0.0.0'

get '/*' do
  puts "GET #{params['splat'][0]}"
  puts "\t#{params}"
end

post '*' do
  puts "POST #{params['splat'][0]}"
  puts "\t#{params}"
end
