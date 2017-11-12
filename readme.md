# A Simple Traffic Simulator

This is an example of Object Oriented Programing with Ruby. The driver and passengers are objects, instances of the Person class. Each car on the road is an object, an instance of a subclass, either Truck, Sport, Sedan or SUV that inherits from the Car class. A simulation object, instance of the Sim class, controls the cars on each road. The simulation is set as a Sinatra app running on Heroku. The Simulation is stepped forward with http requests. These requests, to a top and bottom routes return a JSON. The JSON represents the state of the simulated objects at that point in time. An HTML/CSS/JavaScript UI renders and refreshes the cars and info for each road.

## Getting Started

Clone the repo.
From within the folder run:

```
$ bundle install
$ ruby app.rb
```

Open http://localhost:4567/ in a browser.

## Online demo

https://traffic-simulation.herokuapp.com/
