# myapp.rb
require 'sinatra'

require './person.rb'
require './car.rb'
require './sim.rb'

set :public_folder, 'public'

top_road = Sim.new
bottom_road = Sim.new

# web app routes
get '/' do
  redirect '/index.html'
end

get '/top' do
  top_road.step
  top_road.cars.to_dh.to_json
end

get '/bottom' do
  bottom_road.step
  bottom_road.cars.to_dh.to_json
end
