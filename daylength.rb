require 'sinatra'
require 'sinatra/cookies'
require 'sinatra/multi_route'
require 'json'
require 'date'
require 'sincesolstice'
require 'month'

def get_location
  location = {}
  unless cookies[:latitude].nil?
    location[:latitude] = cookies[:latitude]
    location[:longitude] = cookies[:longitude]
    location[:ok] = true
    location[:place] = nil
  else
    location[:latitude] = 55.5
    location[:longitude] = 9.5
    location[:ok] = false
  end
  
  location
end

def calculate_solstice(latitude, date)
  data = {}
  sincesolstice = SinceSolstice.new latitude, date
  
  data[:solstice] = sincesolstice.solstice
  data[:hours] = sincesolstice.hours
  data[:minutes] = sincesolstice.minutes
  data[:difference] = sincesolstice.get_difference_since_yesterday
  data[:length_in_hours] = sincesolstice.day_length.hours
  data[:length_in_minutes] = sincesolstice.day_length.minutes
  data
end

configure do
  set :public_folder, File.dirname(__FILE__) + '/public'
end

get '/' do
  locals = { :date_error => false }
  
  if (params['date'])
    begin
      date = Date.strptime params['date'], "%Y-%m-%d"
    rescue ArgumentError
      date = Date.today
      locals[:date_error] = params['date']
    end
  else
    date = Date.today
  end
  
  if (params['lat'] && params['lng'])
    locals.merge!({:latitude => params['lat'], :longitude => params['lng'], :ok => true, :place => nil})
  end
  locals.merge!(calculate_solstice(locals[:latitude], date)) if locals[:ok]
  locals[:date] = date
  
  erb :application, :locals => {:partial => :index, :partial_locals => locals}
end

get '/api/?' do
  erb :application, :locals => { :partial => :api, :partial_locals => {} }
end

get '/om/?' do 
  erb :application, :locals => { :partial => :about, :partial_locals => {} }
end

route :post, :get, '/api/v1/calculate' do
  logger = Logger.new(STDOUT)
  logger.info "API request from #{request.ip}: #{params}"
  
  content_type :json
  
  if params['lat'].nil? or params['lng'].nil?
    logger.warn "Missing coordinate(s)"
    return { :error => "Please specify latitude and longitude"}.to_json
  end
  
  begin
    
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
    :day_length => {
      :hours => sincesolstice.day_length.hours,
      :minutes => sincesolstice.day_length.minutes
    },
    :solstice => sincesolstice.solstice.strftime("%Y-%m-%d"),
    :hours => sincesolstice.hours,
    :minutes => sincesolstice.minutes,
    :difference => sincesolstice.get_difference_since_yesterday
  }
  
  rescue => e
    logger.error "API error: #{e}"
    data = { :error => "An error occurred" }
  end
  logger.info data
  data.to_json
end

route :post, :get, '/api/v1/next-solstice' do
  logger = Logger.new(STDOUT)
  logger.info "API request from #{request.ip}: #{params}"
  
  content_type :json
  
  solstice = SinceSolstice.new nil, Date.today
  data = {
    :next_solstice => solstice.get_next_solstice.strftime("%Y-%m-%d")
  }
  
  data.to_json
end

helpers do
  def month(index)
    Month::get(index)
  end
  
  def plural(value, noun, plu)
    "#{value} #{noun}#{(value == 1) ? "" : plu}"
  end
end