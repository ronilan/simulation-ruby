/** Class encapsulating the HTML Visualisation. */
class Vis {
  constructor(roadId, direction) {
    this.roadId = roadId;
    this.direction = direction;
  }

  /**
  * Renders HTML cars onto the HTML road.
  * @param {Array} cars - an array of car objects.
  * @param {string} roadId - the HTML id of the road element.
  */
  render(cars) {
    let i;
    let max = cars.length;

    for (i = 0; i < max; i++) {
      let el = document.getElementById(`car-${cars[i].plate}`);

      if (!el) {
        el = document.getElementById(cars[i].type).cloneNode(true);
        this._refreshSprites(cars[i], el);
        document.getElementById(this.roadId).appendChild(el);
      } else {
        this._refreshSprites(cars[i], el);
      }
    }
  }

  /**
  * Renders HTML of car info onto the page
  * @param {object} car - car object.
  * @param {string} roadId - the HTML id of the container element.
  */
  render_info(car) {
    let passengers = car.passengers.map( (item) => {
      return `${item.name} [${item.age}]`;
    }).join('<br/>');

    document.getElementById(this.roadId+'-car-info').innerHTML = `
      ${car.type.toUpperCase()} <strong>${car.plate}</strong> (${car.serial})<br /> 
      ${car.driver.name} [${car.driver.age}]<br />
      <div class='passenger-list'>${passengers}</div>
    `;
  }

  /**
  * Refresh the car DOM element (sprite)
  * @param {object} car - a car object.
  * @param {object} roadId - the DOM element.
  */
  _refreshSprites(car, sprite) {
    sprite.id = `car-${car.plate}`;

    let speed = sprite.getElementsByClassName('speed')[0];
    if (car.speed >= parseInt(speed.innerHTML)) {
      speed.classList.add('faster');
      speed.classList.remove('slower');
    } else {
      speed.classList.add('slower');
      speed.classList.remove('faster');
    }
    car.speed > 20
      ? (speed.innerHTML = `${car.speed}`)
      : (speed.innerHTML = '');

    let i;
    let seats = sprite.getElementsByClassName('seat');
    for (i = 0; i < car.passengers.length; i++) {
      seats[i].classList.add('passenger');
    }

    if (this.direction === 'east') {
      sprite.style.left = car.x + 'px';
    } else {
      sprite.style.left = window.innerWidth - car.x + 'px';
      sprite.classList.add('flip');
      speed.classList.add('flip');
    }

    sprite.parentNode && car.x > 1600 ? sprite.parentNode.removeChild(sprite) : null;
  }
}

// run it

let topVis = new Vis('top', 'east');
let bottomVis = new Vis('bottom', 'west');

let iteration = 0;

let runner = setInterval(() => {
  fetch('/top')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      topVis.render(data);
      topVis.render_info(data[data.length-1]);
    });

  fetch('/bottom')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      bottomVis.render(data);
      bottomVis.render_info(data[data.length-1]);
    });

  iteration ++;
  iteration > 3000 ? clearInterval(runner) : null;
}, 40);
