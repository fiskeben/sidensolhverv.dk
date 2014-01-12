require 'sinatra'
require 'sinatra/cookies'
require 'sinatra/multi_route'
require 'json'
require 'date'
require 'sincesolstice'
require 'month'

class Api < Sinatra::Application
	route :get, :post, '/calculate' do
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
	    :difference => sincesolstice.get_difference_since_yesterday,
	    :direction => sincesolstice.get_direction
	  }
	  
	  rescue => e
	    logger.error "API error: #{e}"
	    data = { :error => "An error occurred" }
	  end
	  logger.info data
	  data.to_json
	end

	route :get, :post, '/next-solstice' do
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
end