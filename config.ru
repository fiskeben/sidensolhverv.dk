$:.push("./app/lib").uniq!
$:.push("./app").uniq!

require 'app'
require 'api'

map '/api/v1' do
	run Api
end

map '/' do
	run App
end
