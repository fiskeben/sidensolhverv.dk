module Month
  def self.get(month)
    ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"][month-1]
  end
end