require 'sinatra'
require 'json'
require 'date'
require './lib/geolocator'
require './lib/sincesolstice'

def get_location
  locator = Geolocator.new request.ip
  if locator.success?
    latitude = locator.latitude
    longitude = locator.longitude
    ok = true
  else
    latitude = 55.5
    longitude = 9.5
    ok = false
  end
  { :latitude => latitude, :longitude => longitude, :place => locator.city, :ok => ok }
end

def calculate_solstice(latitude, date)
  data = {}
  sincesolstice = SinceSolstice.new latitude, date
  
  data[:solstice] = sincesolstice.solstice.strftime "%d.%m %Y"
  data[:hours] = sincesolstice.hours
  data[:minutes] = sincesolstice.minutes
  data[:difference] = sincesolstice.get_difference_since_yesterday
  data
end

configure do
  set :public_folder, File.dirname(__FILE__) + '/public'
end

get '/' do
  locals = {}
  date = Date.today
  
  locals = get_location
  locals.merge!(calculate_solstice(locals[:latitude], date)) if locals[:ok]
  
  erb :index, :locals => locals
end

post '/api/v1/calculate' do
  today = Date.today
  sincesolstice = SinceSolstice.new params['lat'], today
  
  data = {
    :place => nil,
    :solstice => sincesolstice.solstice.strftime("%d.%m %Y"),
    :hours => sincesolstice.hours,
    :minutes => sincesolstice.minutes,
    :difference => sincesolstice.get_difference_since_yesterday
  }
  
  content_type :json
  data.to_json
end