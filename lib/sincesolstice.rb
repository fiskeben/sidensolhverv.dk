require 'date'
require 'lib/daylengthcalculator'
require 'lib/solstice'
require 'lib/wintersolstice'
require 'lib/summersolstice'

class SinceSolstice
  attr_accessor :latitude, :date, :solstice, :days_since_solstice
  
  def initialize(latitude, date)
    @latitude = latitude
    @date = date
    @solstice = get_previous_solstice(date)
    @days_since_solstice = (date - @solstice).to_i
    @time_difference = get_time_difference
  end
  
  def hours
    (@time_difference / 60).to_s.split(".").first.to_i
  end
  
  def minutes
    (@time_difference - hours * 60).round(0)
  end
  
  private
  
  def get_time_difference
    calculator = DayLengthCalculator.new @latitude
    length_of_day_at_solstice = calculator.calculate_length_of_day 0
    length_of_today = calculator.calculate_length_of_day(@days_since_solstice)
    length_of_today - length_of_day_at_solstice
  end
  
  private
  
  def get_previous_solstice(date)
    previous_winter_solstice = WinterSolstice.previous(date)
    previous_summer_solstice = SummerSolstice.previous(date)
    if previous_winter_solstice > previous_summer_solstice
      previous_winter_solstice
    else
      previous_summer_solstice
    end
  end
end
