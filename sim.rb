require 'faker' # used to generate person names
require 'hashable'
require 'json'

# Class representing a Simulation.
class Sim
  MAX_FRAMES_PER_SECOND = 30 # throtle requests
  CAR_LENGTH = 60

  attr_accessor :cars, :iteration, :timestamp
  def initialize
    @iteration = 0
    @timestamp = 0
    @cars = init
  end

  def step
    return if rate_limit

    @iteration += 1
    @timestamp = (Time.now.to_f * 1000).to_i

    @cars.push(generate_car) if @cars[@cars.size - 1].x > 3 * CAR_LENGTH

    @cars[0].drive
    @cars[0].faster

    @cars.each_cons(2) do |a, b|
      fender_dist = a.x - b.x
      b.drive
      b.faster if fender_dist > 3 * CAR_LENGTH
      b.slower if fender_dist < 3 * CAR_LENGTH
      b.break if fender_dist < 1.5 * CAR_LENGTH
    end

    @cars = @cars.drop(@cars.size - 20) if @cars.size > 20
  end

  private def init
    cars = [generate_car]
    cars
  end

  private def generate_car
    driver = Person.new(Faker::Name.name, 16 + rand(60))
    passengers = []

    rand(6).times do
      passengers.push(Person.new(Faker::Name.name, 1 + rand(80)))
    end

    case 1 + rand(4)
    when 1
      car = Truck.new
    when 2
      car = SUV.new
    when 3
      car = Sport.new
    when 4
      car = Sedan.new
    end

    car.load(driver, passengers)
    car.go(55)

    car
  end

  private def rate_limit
    (Time.now.to_f * 1000).to_i - @timestamp < 1000 / MAX_FRAMES_PER_SECOND
  end
end
