require 'test/unit'
require 'lib/daylengthcalculator'

class DayLengthCalculatorTest < Test::Unit::TestCase
  def test_day_length_between_equator_and_polar_circle
    calc = DayLengthCalculator.new 56
    length = calc.calculate_length_of_day 9
    assert((402..406).include?(length), "Day length is outside accepted range")
  end
  
  def test_day_length_during_polar_day
    calc = DayLengthCalculator.new 71
    length = calc.calculate_length_of_day 180
    assert_equal 1440, length, "Day length should be 1440 minutes during polar day"
  end
  
  def test_day_length_during_polar_night
    calc = DayLengthCalculator.new 71
    length = calc.calculate_length_of_day 4
    assert_equal 0, length, "Day length should be 0 minutes during polar night"
  end
end