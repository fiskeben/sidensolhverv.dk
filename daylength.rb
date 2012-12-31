require 'sinatra'
require 'date'
require './lib/geolocator'
require './lib/sincesolstice'

configure do
  set :public_folder, File.dirname(__FILE__) + '/public'
end

get '/' do
  today = Date.today
  locator = Geolocator.new request.ip
  locals = { :ok => true }
  
  if locator.success?
    sincesolstice = SinceSolstice.new locator.latitude, today
  
    locals[:place] = locator.city
    locals[:solstice] = sincesolstice.solstice.strftime "%d.%m %Y"
    locals[:hours] = sincesolstice.hours
    locals[:minutes] = sincesolstice.minutes
  else
    locals[:ok] = false
  end
  
  erb :index, :locals => locals
end