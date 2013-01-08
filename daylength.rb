require 'sinatra'
require 'sinatra/cookies'
require 'json'
require 'date'
require './lib/geolocator'
require './lib/sincesolstice'

def get_location
  location = {}
  unless cookies[:latitude].nil?
    location[:latitude] = cookies[:latitude]
    location[:longitude] = cookies[:longitude]
    location[:ok] = true
    location[:place] = nil
  else
    locator = Geolocator.new request.ip
    if locator.success?
      location[:latitude] = locator.latitude
      location[:longitude] = locator.longitude
      location[:place] = locator.city
      location[:ok] = true
    else
      location[:latitude] = 55.5
      location[:longitude] = 9.5
      location[:ok] = false
    end
  end
  
  location
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
  if params['date']
    date = Date.parse params['date']
  else
    date = Date.today
  end
  sincesolstice = SinceSolstice.new params['lat'], date
  
  data = {
    :date => {
      :supplied => params['date'],
      :interpreted => date.strftime("%F")
    },
    :latlng => {
      :lat => params['lat'],
      :lng => params['lng']
    },
    :solstice => sincesolstice.solstice.strftime("%d.%m %Y"),
    :hours => sincesolstice.hours,
    :minutes => sincesolstice.minutes,
    :difference => sincesolstice.get_difference_since_yesterday
  }
  
  content_type :json
  data.to_json
end