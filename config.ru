$:.push("./lib").uniq!
$:.push(".").uniq!
require 'daylength'
run Sinatra::Application