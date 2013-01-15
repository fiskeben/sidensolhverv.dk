require 'test/unit'
require 'month'

class TestMonths < Test::Unit::TestCase
  def test_getting_month
    assert_equal("januar", Month::get(1), "1st month is not january")
    assert_equal("april", Month::get(4), "4th month is not April")
    assert_equal("december", Month::get(12), "12th month is not december")
  end
end