require 'sinatra'
require 'json'
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
    latitude = locator.latitude
    longitude = locator.longitude
    locals[:ok] = true
  else
    latitude = 55.5
    longitude = 9.5
    locals[:ok] = false
  end
  
  sincesolstice = SinceSolstice.new latitude, today
  
  locals[:place] = (!locator.city.nil? and locator.city != "" ) ? locator.city : nil
  locals[:latitude] = latitude
  locals[:longitude] = longitude
  locals[:solstice] = sincesolstice.solstice.strftime "%d.%m %Y"
  locals[:hours] = sincesolstice.hours
  locals[:minutes] = sincesolstice.minutes
  
  erb :index, :locals => locals
end

get '/updatelocation' do
  today = Date.today
  sincesolstice = SinceSolstice.new params['lat'], today
  
  data = {
    :place => nil,
    :solstice => sincesolstice.solstice.strftime("%d.%m %Y"),
    :hours => sincesolstice.hours,
    :minutes => sincesolstice.minutes
  }
  
  content_type :json
  data.to_json
end