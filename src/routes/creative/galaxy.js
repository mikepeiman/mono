const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const Color = require('canvas-sketch-util/color');
const Tweakpane = require('tweakpane');



width = 2048
height = 2048


// =============================================================================
// basic animation example below; canvas-sketch 'animate' setting calls this on main return function
// =============================================================================
const animate = () => {
  console.log(`Mike animate`)
  requestAnimationFrame(animate)
}
// animate()
// ============================================================================= 

let agents = []
let stares = []
const params = {
  numNodes: 1,
  range: 200,
  lineCap: 'butt',
  showNode: true,
  showLines: true,
  nodeType: 'circle',
  lineWidthMax: 5,
  radiusMin: 20,
  radiusMax: 40,
  orbitMin: 20,
  orbitMax: 40,
  orbitBuffer: 30,
  animate: true
}

const settings = {
  dimensions: [width, height],
  animate: params.animate
};

const createTweakpane = () => {
  const pane = new Tweakpane.Pane()
  let folder
  folder = pane.addFolder({ title: "Params" })
  folder.addInput(params, 'range', {
    min: 10,
    max: 500,
    step: 10
  })
  folder.addInput(params, 'numNodes', {
    min: 1,
    max: 500,
    step: 10
  }).on('change', (e) => {
    constructNodes(width, height)
  }),
    folder.addInput(params, 'lineWidthMax', {
      min: 5,
      max: 100,
      step: 1
    })
  folder.addInput(params, 'radiusMin', {
    min: 1,
    max: 200,
    step: 1
  })
    .on('change', (e) => {
      constructNodes(width, height)
    }),
    folder.addInput(params, 'radiusMax', {
      min: 10,
      max: 500,
      step: 10
    })
      .on('change', (e) => {
        constructNodes(width, height)
      }),
    folder.addInput(params, 'lineCap', {
      options: {
        butt: 'butt',
        round: 'round',
        square: 'square'
      }
    })
  folder.addInput(params, 'nodeType', {
    options: {
      star: 'star',
      circle: 'circle',
    }
  })
  folder.addInput(params, 'animate', {
  })
  folder.addInput(params, 'showNode', {
  })
  folder.addInput(params, 'showLines', {
  })
}

const sketch = ({ context, width, height }) => {
  let stars = []
  const generateShips = (context, starId) => {
    let star = stars.find(star => star.id == starId)
    // star.drawShips(context)
  }

  const constructNodes = (width, height) => {

    for (let i = 0; i < params.numNodes; i++) {
      let x = random.range(0, width)
      let y = random.range(0, height)
      let id = `ID_${i}`
      let star = new Star(id, parseInt(x), parseInt(y), parseInt(random.range(5, 5)))
      let ships = []
      for (let j = 0; j < star.numberOfShips; j++) {
        // console.log(`🚀 ~ file: galaxy.js ~ line 114 ~ constructNodes ~ x, y, star`, x, y, star.id)
        let ship = new Ship(x, y, star.id)
        ship.draw(context, star)
        star.ships = [...star.ships, ship]
      }
      // star.ships = ships
      stars = [...stars, star]
    }
  }


  constructNodes(width, height)
  stars.forEach(star => {
    console.log(`🚀 ~ file: galaxy.js ~ line 136 ~ sketch ~ star`, star)
    generateShips(context, star.id)
    star.drawShips(context)
  })

  // =============================================================================
  // Timer
  // =============================================================================
  const timestamp = Math.round(Date.now() / 1000);
  const date = new Date()
  let seconds = date.getSeconds()
  let counter = 0
  function runTimer() {
    counter++
    console.log(`timer running: ${counter}`)
    if (settings.animate) {
      setTimeout(runTimer, 1000)
    }
  }
  runTimer()
  // =============================================================================
  //  / timer
  // =============================================================================


  return ({ context, width, height }) => {
    const pen = context
    const curTime = new Date();
    const elapsedMs = curTime - timestamp;
    pen.fillStyle = 'black';
    pen.fillRect(0, 0, width, height);


    // let exampleShip = stars[0].ships[0]
    // exampleShip.radius = 750
    // exampleShip.draw(stars[0])
    // exampleShip.update(pen, elapsedMs)
    // console.log(exampleShip)
    // =========================================================================
    // loop within loop to draw lines between stars for original sketch
    // =========================================================================
    // for (let i = 0; i < params.numNodes; i++) {
    //   const star = stars[i];
    //   for (let j = i + 1; j < stars.length; j++) {
    //     const other = stars[j];
    //     const dist = star.pos.getDistance(other.pos)
    //     if (dist > params.range) continue
    //     pen.lineWidth = math.mapRange(dist, 0, params.range, params.lineWidthMax, 1)
    //     pen.beginPath()
    //     pen.moveTo(star.pos.x, star.pos.y)
    //     params.showLines ? pen.lineTo(other.pos.x, other.pos.y) : 0
    //     let a = rangeAlpha(params.range, dist)
    //     let h = Color.parse(star.color).hsla[0]
    //     let s = Color.parse(star.color).hsla[1]
    //     let l = Color.parse(star.color).hsla[2]
    //     pen.strokeStyle = hsla(h, s, l, a)
    //     pen.lineCap = params.lineCap
    //     pen.stroke()
    //   }
    // }
    // =========================================================================
    // end ranged lines loop
    // =========================================================================

    stars.forEach(star => {
      // star.updateShips(pen, elapsedMs)
      // generateShips(pen, star.id)
      if (params.showNode) {
        params.nodeType == 'star' ? star.drawStar(pen) : star.drawCircle(pen)
      }
      // star.wrap(width, height)
      star['ships'].forEach(ship => {
        // console.log(`🚀 ~ file: galaxy.js ~ line 202 ~ return ~ ship`, ship)
        // ship.update(pen, elapsedMs)
      })
    })
  }
};
createTweakpane()
canvasSketch(sketch, settings);


class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getDistance(v) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1))
    this.radius = random.range(params.radiusMin, params.radiusMax)
  }
  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1
    }
  }

  wrap(width, height) {
    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
  }
  // ===========================================================================

  drawCircle(pen) {
    pen.save()
    pen.translate(this.pos.x, this.pos.y)
    pen.beginPath()
    pen.arc(0, 0, this.radius, 0, Math.PI * 2)
    pen.fill()
    pen.lineWidth = 4
    pen.strokeStyle = this.color
    pen.stroke()
    pen.restore()
  }
}

class Star extends Agent {
  constructor(id, x, y, numberOfShips = 50, ships = [], numOfSides = 6, positiveVelSum = 0, color = "hsla(180,50%,50%,1)") {
    super(x, y)
    this.id = id
    this.numOfSides = numOfSides
    this.positiveVelSum = parseFloat(makePositive(this.vel.x).toFixed(3) + makePositive(this.vel.y).toFixed(3))
    this.color = hsla(((this.positiveVelSum * 360) % 360), 50, 50, 1)
    this.numberOfShips = numberOfShips
    this.ships = ships
    this.angle = 0
  }

  drawStar(pen) {
    pen.save()
    pen.beginPath()
    pen.moveTo(this.pos.x + this.radius * Math.cos(0), this.pos.y + this.radius * Math.sin(0))

    for (let i = 0; i < this.numOfSides; i++) {
      let xCoord = this.pos.x + this.radius * Math.cos(i * 2 * Math.PI / this.numOfSides)
      let yCoord = this.pos.y + this.radius * Math.sin(i * 2 * Math.PI / this.numOfSides)
      pen.lineTo(xCoord, yCoord)
      pen.fillStyle = this.color
    }
    pen.fill()
    pen.restore()
  }

  drawShips(pen) {
    let increment = Math.PI * 2 / (this.numberOfShips + 1)
    let shipRadius = 5
    let num = this.numberOfShips + 1
    // pen.save()
    for (let i = 0; i < this.numberOfShips; i++) {
      let ship = this.ships[i]
      // console.log(`🚀 ~ file: galaxy.js ~ line 304 ~ Star ~ drawShips ~ ship`, ship)
      ship.x = this.pos.x + (params.orbitBuffer + ship.radius * this.numberOfShips) * Math.cos(i); // in my pixijs stars, orbitBuffer was followed by `+ spiral`
      // console.log(`🚀 ~ file: galaxy.js ~ line 279 ~ Star ~ drawShips ~ ship.x`, ship.x)
      ship.y = this.pos.y + (params.orbitBuffer + ship.radius * this.numberOfShips) * Math.sin(i);
      pen.moveTo(ship.x, ship.y)

      pen.arc(ship.x, ship.y, ship.radius, 0, Math.PI * 2)
      pen.strokeStyle = this.color
      // pen.lineWidth = 40
      pen.fillStyle = randomHSLA()
      pen.stroke()
      pen.fill()
      // pen.restore()
    }
    // pen.restore()
  }

  updateShips(pen, elapsedMs) {
    // pen.save()
    // pen.rotate(Math.PI * elapsedMs / 1000)
    // pen.translate(this.radius + params.orbitBuffer, 0)
    this.ships.forEach((ship, i) => {
      console.log('i: ', i);
      // ship.x = (ship.radius * this.numberOfShips) * Math.cos(.001);
      ship.x = ship.x + 1 // in my pixijs stars, orbitBuffer was followed by `+ spiral`
      // console.log(`🚀 ~ file: galaxy.js ~ line 279 ~ Star ~ drawShips ~ ship.x`, ship.x)
      ship.y = this.pos.y + (ship.radius * this.numberOfShips) * Math.sin(ship.counter);
    })
    // pen.restore()
  }
}

class Ship {
  constructor(x, y, star) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1))
    this.radius = 10 // random.range(params.orbitMin, params.orbitMax)
    this.star = star
    this.angle = 0
  }

  draw(pen, star) {
    this.x = star.pos.x + (star.radius + params.orbitBuffer) * Math.cos(this.angle); // in my pixijs stars, orbitBuffer was followed by `+ spiral`
    this.y = star.pos.y + (star.radius + params.orbitBuffer) * Math.sin(this.angle);
    this.angle += 10
    pen.strokeStyle = this.star.color
    // pen.lineWidth = 40
    pen.fillStyle = randomHSLA()
    pen.stroke()
    pen.fill()
  }

  update(pen, elapsedMs) {
    pen.save()
    this.pos.x += this.vel.x
    pen.rotate(Math.PI * elapsedMs / 1000)
    pen.translate(this.radius + params.orbitBuffer, this.radius + params.orbitBuffer)
    pen.restore()
  }
}

const makePositive = (value) => {
  if (value < 0) return value * -1
  return value
}

const hsla = (h, s, l, a) => {
  let color = `hsla(${h},${s}%,${l}%,${a})`
  return color
}

const rangeAlpha = (range, dist) => {
  return math.mapRange(dist, 0, range, 1, 0, true)
}

const randomHSLA = (h = random.range(0, 360), s = random.range(25, 75), l = random.range(25, 75), a = random.range(0.1, 1)) => {
  let color = `hsla(${h},${s}%,${l}%,${a})`
  return color
}

const circle = (pen, point, radius) => {
  pen.beginPath()
  pen.arc(point.x, point.y, radius, 0, 2 * Math.PI)
  pen.closePath()
  pen.fillStyle = "#3399ff"
  pen.fill()
}

const orbit = (pen, point, counter) => {
  pen.save()
  pen.fillStyle = "#ff9933"
  pen.translate(point.x, point.y)
  circle(pen, { x: 700, y: 700 }, 15)
  pen.rotate(Math.PI / 180 * angle)
  counter++
  pen.restore()
}

