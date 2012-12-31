class DayLengthCalculator
  @@axis = 23.439
  @@j = 0.01720242383
  
  def initialize(latitude)
    @latitude_in_radians = degrees_to_radians latitude.to_f
    @axis_in_radians = degrees_to_radians @@axis
  end
  
  def calculate_length_of_day(days_since_solstice)
    m = 1 - Math.tan(@latitude_in_radians) * Math.tan(@axis_in_radians * Math.cos(@@j * days_since_solstice))

    if m < 0
      m = 0
    elsif m > 2
      m = 2
    end
    b = Math.acos(1 - m) / Math::PI
    (60 * 24.0 * b).to_i
  end
  
  private
  def degrees_to_radians(degrees)
    degrees * Math::PI / 180
  end
end