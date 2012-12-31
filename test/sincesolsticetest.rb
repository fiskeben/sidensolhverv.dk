require 'test/unit'
require 'lib/sincesolstice'
require 'date'

class TestSinceSolstice < Test::Unit::TestCase
  def test_getting_hours_and_minutes_since_solstice
    since_solstice = SinceSolstice.new(56, Date.parse("02.03.2013"))
    assert_equal(3, since_solstice.hours, "Number of hours since solstice is wrong")
    assert_equal(43, since_solstice.minutes, "Number of minutes since solstice is wrong")
  end
  
  def test_hours_and_minutes_at_solstice
    since_solstice = SinceSolstice.new(56, Date.parse("21.12.2012 18:00"))
    assert_equal(0, since_solstice.hours, "Number of hours since solstice is wrong")
    assert_equal(0, since_solstice.minutes, "Number of minutes since solstice is wrong")
  end
end