const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
let manager
let fontFamily = "Century"
let width = height = 1080
const settings = {
  dimensions: [width, height]
};

let text = "A"
let fontSize = 1200

const typeCanvas = document.createElement('canvas')
const typeContext = typeCanvas.getContext('2d')


const sketch = ({ context, width, height }) => {
  const cell = 20
  const cols = Math.floor(width / cell)
  const rows = Math.floor(height / cell)
  const numCells = cols * rows
  typeCanvas.width = cols
  typeCanvas.height = rows


  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);
    const pen = context
    fontSize = cols
    typeContext.fillStyle = 'white'
    typeContext.font = `${fontSize}px ${fontFamily}`
    typeContext.textBaseline = 'top'
    let metrics = typeContext.measureText(text)
    // console.log(`🚀 ~ file: sketch-05.js ~ line 20 ~ return ~ metrics `, metrics)
    let mx = metrics.actualBoundingBoxLeft * -1
    let my = metrics.actualBoundingBoxAscent * -1
    let mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    let mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    let tx = (cols - mw) * .5 - mx
    let ty = (rows - mh) * .5 - my

    typeContext.save()
    typeContext.translate(tx, ty)
    typeContext.beginPath()
    // typeContext.rect(mx, my, mw, mh)
    // typeContext.strokeStyle = "#aabbff"
    // typeContext.stroke()
    typeContext.fillText(text, 0, 0)
    typeContext.restore()

    let typeData = typeContext.getImageData(0, 0, cols, rows).data
    // console.log(`🚀 ~ file: sketch-05.js ~ line 53 ~ return ~ typeData`, typeData)

    for (let i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i/ cols)
      const x = col * cell
      const y = row * cell

      const r = typeData[i * 4 + 0]
      const g = typeData[i * 4 + 1]
      const b = typeData[i * 4 + 2]
      const a = typeData[i * 4 + 3]

      // pen.fillStyle = randomRGBA()
      pen.fillStyle = `rgba(${r},${g},${b},${a})`
      pen.save()
      pen.translate(x, y)
      pen.translate(cell * .5, cell * .5)

      // pen.fillRect(0,0, cell, cell)
      pen.beginPath()
      pen.arc(0,0, cell / 2, 0, Math.PI * 2)
      pen.fill()
      pen.restore()
    }

    pen.drawImage(typeCanvas, 0, 0)

  };
};

const onKeyUp = (e) => {
  console.log(`🚀 ~ file: sketch-05.js ~ line 50 ~ onKeyUp ~ e`, e)
  text = e.key.toUpperCase()
  manager.render()
}
document.addEventListener('keyup', onKeyUp)

const start =  async () => {
 manager = await canvasSketch(sketch, settings);
}

start()


const randomRGBA = (r = random.range(0, 255), g  = random.range(0, 255), b = random.range(0, 255), a = random.range(0.1, 1)) => {
  let color = `hsla(${r},${g}%,${b}%,${a})`
  return color
}


/*

const url = 'https://picsum.photos/200'
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
}

const start = async () => {
  const img = await loadImage(url)
  console.log(`🚀 ~ file: sketch-05.js ~ line 67 ~ loadImage ~ img`, img)
  console.log(`This line`)
}
// const start = () => {
//   loadImage(url).then(img => {
//   console.log(`🚀 ~ file: sketch-05.js ~ line 67 ~ loadImage ~ img`, img)
//   })
//   console.log(`This line`)
// }

start()
*/