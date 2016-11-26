require 'sinatra'
require 'sinatra/cookies'
require 'sinatra/multi_route'
require 'date'

class App < Sinatra::Application
  set :root, File.join(File.dirname(__FILE__), '..')
  set :views, Proc.new { File.join(root, 'views') }
  set :google_maps_api_key, ENV['GOOGLE_MAPS_API_KEY']

  configure do
    set :public_folder, root + '/public'
  end

  get '/' do
    locals = {}

    if (params['date'] && params['lat'] && params['lng'])
      begin
        date = Date.strptime params['date'], "%Y-%m-%d"
      rescue ArgumentError
        date = Date.today
      end
      locals[:presets] = {:latitude => params['lat'], :longitude => params['lng'], :date => date}
    else
      locals[:presets] = {}
    end

    erb :application, :locals => {:partial => :index, :partial_locals => locals, :google_maps_api_key => settings.google_maps_api_key}
  end

  get '/api/?' do
    erb :application, :locals => { :partial => :api, :partial_locals => {} }
  end

  get '/om/?' do
    erb :application, :locals => { :partial => :about, :partial_locals => {} }
  end
end
