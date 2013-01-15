require 'date'
require 'daylengthcalculator'
require 'solstice'
require 'wintersolstice'
require 'summersolstice'

class SinceSolstice
  attr_accessor :latitude, :date, :solstice, :days_since_solstice
  
  def initialize(latitude, date)
    @latitude = latitude
    @date = date
    @solstice = get_previous_solstice
    
    @days_since_solstice = (@date - @solstice).to_i
    @time_difference = get_time_difference
  end
  
  def hours
    minutes_to_hours(@time_difference)
  end
  
  def minutes
    remaining_minutes(@time_difference)
  end
  
  def day_length
    if @length.nil?
      hours = minutes_to_hours(@length_of_today)
      minutes = remaining_minutes(@length_of_today)
      @length = Length.new(hours, minutes)
    end
    @length
  end
  
  def get_difference_since_yesterday
    return 0 if @days_since_solstice == 0
    
    todays_length = @calculator.calculate_length_of_day(@days_since_solstice)
    yesterdays_length = @calculator.calculate_length_of_day(@days_since_solstice - 1)
    todays_length - yesterdays_length
  end
  
  def get_next_solstice
    if next_summer_solstice < next_winter_solstice
      next_summer_solstice
    else
      next_winter_solstice
    end
  end
  
  def get_previous_solstice
    foo = previous_winter_solstice
    bar = previous_summer_solstice

    if foo > bar
      previous_winter_solstice
    else
      previous_summer_solstice
    end
  end
  
  private
  
  def get_time_difference
    @calculator = DayLengthCalculator.new @latitude
    length_of_day_at_solstice = @calculator.calculate_length_of_day 0
    @length_of_today = @calculator.calculate_length_of_day(@days_since_solstice)
    @length_of_today - length_of_day_at_solstice
  end
  
  def next_summer_solstice
    SummerSolstice.next(@date)
  end
  
  def next_winter_solstice
    WinterSolstice.next(@date)
  end
  
  def previous_summer_solstice
    SummerSolstice.previous(@date)
  end
  
  def previous_winter_solstice
    WinterSolstice.previous(@date)
  end
  
  def minutes_to_hours(minutes)
    (minutes / 60).to_s.split(".").first.to_i
  end
  
  def remaining_minutes(minutes)
    minutes - (minutes_to_hours(minutes) * 60).round(0)
  end
  
  class Length
    attr_reader :hours, :minutes
    
    def initialize(hours, minutes)
      @hours = hours
      @minutes = minutes
    end
  end
end
