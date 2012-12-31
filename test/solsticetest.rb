require 'test/unit'
require 'lib/solstice'
require 'lib/wintersolstice'
require 'lib/summersolstice'

class TestSolstices < Test::Unit::TestCase
    def test_previous_winter_solstice_before_new_years
      date = Date.parse("28.12.2012")
      solstice = WinterSolstice.previous(date)
      
      assert(date > solstice, "Winter solstice is later than given date")
      assert_equal(date.year, solstice.year, "Winter solstice is in wrong year")
    end
    
    def test_next_winter_solstice_before_new_years
      date = Date.parse("29.12.2012")
      solstice = WinterSolstice.next(date)
      
      assert(solstice > date, "Next winter solstice is before given date")
      assert_equal(date.year + 1, solstice.year, "Year of next winter solstice is not the year after given date")
    end
    
    def test_previous_winter_solstice_after_new_years
      date = Date.parse("02.03.2013")
      solstice = WinterSolstice.previous(date)
      
      assert(solstice < date, "Previous winter solstice is not before given date")
      assert_equal(date.year - 1, solstice.year, "Previous winter solstice is not the year before given date")
    end
    
    def test_next_winter_solstice_after_new_years
      date = Date.parse("05.05.2013")
      solstice = WinterSolstice.next(date)
      
      assert(solstice > date, "Next winter solstice is not after given date")
      assert_equal(date.year, solstice.year, "Next winter solstice is not the same year")
    end
    
    def test_next_summer_solstice
      date = Date.parse("05.05.2013")
      solstice = SummerSolstice.next(date)
      
      assert(solstice > date, "Next summer solstice is not after given date")
      assert_equal(date.year, solstice.year, "Next summer solstice is not the same year")
    end
    
    def test_previous_summer_solstice
      date = Date.parse("19.09.2013")
      solstice = SummerSolstice.previous(date)
      
      assert(solstice < date, "Previous summer solstice is not before given date")
      assert_equal(date.year, solstice.year, "Previous summer solstice is not the same year")
    end
    
    def test_next_summer_solstice_before_new_years
      date = Date.parse("19.09.2013")
      solstice = SummerSolstice.next(date)
      
      assert(solstice > date, "Next summer solstice is not after given date")
      assert_equal(date.year + 1, solstice.year, "Next summer solstice is not the next year")
    end
    
    def text_previous_summer_solstice_after_new_years
      date = Date.parse("03.01.2013")
      solstice = SummerSolstice.previous(date)
      
      assert(solstice < date, "Previous summer solstice is not before given date")
      assert_equal(date.year - 1, solstice.year, "Previous summer solstice is not the year before given date")
    end
    
    def test_summer_solstice_is_in_june
      date = Date.parse("05.05.2013")
      solstice = SummerSolstice.next(date)
      
      assert_equal(6, solstice.month, "Summer solstice is not in June")
    end
    
    def test_winter_solstice_is_in_december
      date = Date.parse("05.05.2013")
      solstice = WinterSolstice.next(date)
      
      assert(solstice.month == 12, "Winter solstice is not in December")
    end
end