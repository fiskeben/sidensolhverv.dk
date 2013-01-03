require 'net/http'
require 'uri'
require 'json'

class Geolocator
  @@service_url = "http://freegeoip.net"
  @@datatype = "json"
  
  def initialize(ip)
    @ip = ip
    geolocate
  end
  
  def success?
    @success
  end
  
  def method_missing(name, *args, &block)
    @data[name.to_s]
  end
  
  private
  def geolocate
    url = "#{@@service_url}/#{@@datatype}/#{@ip}"
    uri = URI.parse url
    
    http = Net::HTTP.new uri.host, uri.port
    request = Net::HTTP::Get.new uri.request_uri
    
    response = http.request request

    @data = JSON::parse response.body
    set_success response
  end
  
  def set_success(response)
    if response.code != "200"
      @success = false
    elsif country_code == "RD"
      @success = false
    elsif latitude.nil?
      @success = false
    else
      @success = true
    end
  end
end