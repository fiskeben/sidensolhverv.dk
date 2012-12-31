require 'date'

class Solstice
  def self.next(date)
    year = date.year
    this_years_solstice = self.get_solstice(year)
    
    if this_years_solstice > date
      this_years_solstice
    else
      self.get_solstice(year + 1)
    end
  end
  
  def self.previous(date)
    year = date.year
    this_years_solstice = self.get_solstice(year)
    
    if this_years_solstice < date
      this_years_solstice
    else
      self.get_solstice(year - 1)
    end
  end
  
  private
  
  def self.get_solstice(year)
    Date.parse(@solstices[year.to_s])
  end
  
end