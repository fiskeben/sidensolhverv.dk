require 'test/unit'
require 'geolocator'

class GeolocatorTest < Test::Unit::TestCase
  def test_working_ip_address
    ip = "173.194.32.0"
    locator = Geolocator.new ip
    assert(locator.success?, "Geolocation unsuccessful")
    assert(locator.latitude.to_f > 0, "Latitude is not a number")
  end
  
  def test_class_c_ip_address
    ip = "10.0.0.1"
    locator = Geolocator.new ip
    assert(!locator.success?, "Geolocation unexpectedly successful")
  end
end