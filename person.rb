require 'hashable'

# Class representing a person.
class Person
  include Hashable # module mixin from gem

  def initialize(name = 'Jane Doe', age = nil)
    @name = name
    @age = age
  end
end
