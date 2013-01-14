require 'test/unit'
require 'sincesolstice'
require 'date'

class TestSinceSolstice < Test::Unit::TestCase
  
  @@date_format = "%Y-%m-%d"
  
  def test_getting_hours_and_minutes_since_winter_solstice
    since_solstice = SinceSolstice.new(56, Date.new(2013, 3, 2))
    assert_equal(2012, since_solstice.solstice.year, "Winter solstice is in wrong year")
    assert_equal(12, since_solstice.solstice.month, "Winter solstice is in wrong month")
    assert_equal(21, since_solstice.solstice.day, "Winter solstice is on wrong day")
    assert_equal(3, since_solstice.hours, "Number of hours since solstice is wrong")
    assert_equal(43, since_solstice.minutes, "Number of minutes since solstice is wrong")
  end
  
  def test_getting_hours_and_minutes_since_summer_solstice
    since_solstice = SinceSolstice.new(56, Date.new(2012, 9, 24))
    assert_equal(2012, since_solstice.solstice.year, "Summer solstice is in wrong year")
    assert_equal(6, since_solstice.solstice.month, "Summer solstice is in wrong month")
    assert_equal(20, since_solstice.solstice.day, "Summer solstice is on wrong day")
    assert_equal(5, since_solstice.hours, "Number of hours since summer solstice is wrong")
    assert_equal(42, since_solstice.minutes, "Number of minutes since summer solstice is wrong")
  end
  
  def test_hours_and_minutes_at_solstice
    since_solstice = SinceSolstice.new(56, Date.new(2012, 12, 22))
    assert_equal(0, since_solstice.hours, "Number of hours since solstice is wrong")
    assert_equal(0, since_solstice.minutes, "Number of minutes since solstice is wrong")
  end
  
  def test_getting_next_solstice_before_summer_solstice
    since_solstice = SinceSolstice.new(nil, Date.new(2013, 3, 2))
    solstice = since_solstice.get_next_solstice
    
    assert_equal(Date.new(2013, 6, 21).strftime(@@date_format), solstice.strftime(@@date_format))
  end
  
  def test_getting_next_solstice_after_summer_solstice
    since_solstice = SinceSolstice.new(nil, Date.new(2013, 8, 2))
    solstice = since_solstice.get_next_solstice
    
    assert_equal(Date.new(2013, 12, 21).strftime(@@date_format), solstice.strftime(@@date_format))
  end
  
end