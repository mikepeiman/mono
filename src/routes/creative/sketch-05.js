const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const load = require('load-asset')
const Tweakpane = require('tweakpane');


let manager
let fontFamily = "Century"
let width = height = 1080
const settings = {
  dimensions: [width, height],
  // cellSize: 2,
  // animate: true
};

let text = "A"
let fontSize = 1200
let image, dimensions
const typeCanvas = document.createElement('canvas')
const typeContext = typeCanvas.getContext('2d')
const imageCanvas = document.createElement('canvas')
const imageContext = imageCanvas.getContext('2d')


params = {
  cellSize: 12,
  images: [
    '8040ebabaa90d7ac5908a1a50e7b7b40.jpg',
    '1600-Iguazu-Falls-Argentina-shutterstock_172190801.jpg',
    '1024px-Martin,_John_-_The_Seventh_Plague_-_1823.jpg',
    '1200px-Paracas_National_Reserve._Ica,_Peru.jpg',
    'download-_8_.jpg',
    'download-_11_.jpg',
    'download-_12_.jpg',
    'download-_18_.jpg',
    'Evening-light-on-Mount-Thor-in-Auyuittuq-National-Park-Nunavut-Baffin-Island.jpg',
    'gettyimages-919352240-1024x1024.jpg',
    'main-qimg-e61354cfbf095d6f10f71dae9d578369.jpg',
    'springbrook national park, australia-2.jpg',
    'svaneti-georgia-min.jpg',
    'Thor-Peak-The-Greatest-Vertical-Drop-on-Earth.jpg',
    'vinicunza peru.jpg',
    '20211106_151003.jpg',
    '20211101_151335.jpg',
    '20211110_125044.jpg',
    '20211110_125818_HDR.jpg',
  ],
  image: 'Evening-light-on-Mount-Thor-in-Auyuittuq-National-Park-Nunavut-Baffin-Island.jpg',
}

const createTweakpane = () => {
  const pane = new Tweakpane.Pane()
  let folder
  folder = pane.addFolder({ title: "Settings" })
  folder.addInput(params, 'cellSize', {
    min: 1,
    max: 50,
    step: 1
  }).on('change', (e) => {
    console.log(`🚀 ~ file: sketch-05.js ~ line 58 ~ createTweakpane ~ e`, e)
    let props = manager.props
    console.log(`🚀 ~ file: sketch-05.js ~ line 61 ~ createTweakpane ~ props `, props)
    manager.update()
  })
  folder.addInput(params, 'image', {
    options: {
      '8040ebabaa90d7ac5908a1a50e7b7b40.jpg': '8040ebabaa90d7ac5908a1a50e7b7b40.jpg',
      '1600-Iguazu-Falls-Argentina-shutterstock_172190801.jpg': '1600-Iguazu-Falls-Argentina-shutterstock_172190801.jpg',
      '8040ebabaa90d7ac5908a1a50e7b7b40.jpg': '8040ebabaa90d7ac5908a1a50e7b7b40.jpg',
      '1600-Iguazu-Falls-Argentina-shutterstock_172190801.jpg': '1600-Iguazu-Falls-Argentina-shutterstock_172190801.jpg',
      '1024px-Martin,_John_-_The_Seventh_Plague_-_1823.jpg': '1024px-Martin,_John_-_The_Seventh_Plague_-_1823.jpg',
      '1200px-Paracas_National_Reserve._Ica,_Peru.jpg': '1200px-Paracas_National_Reserve._Ica,_Peru.jpg',
      'download-_8_.jpg': 'download-_8_.jpg',
      'download-_11_.jpg': 'download-_11_.jpg',
      'download-_12_.jpg': 'download-_12_.jpg',
      'download-_18_.jpg': 'download-_18_.jpg',
      'Evening-light-on-Mount-Thor-in-Auyuittuq-National-Park-Nunavut-Baffin-Island.jpg': 'Evening-light-on-Mount-Thor-in-Auyuittuq-National-Park-Nunavut-Baffin-Island.jpg',
      'gettyimages-919352240-1024x1024.jpg': 'gettyimages-919352240-1024x1024.jpg',
      'main-qimg-e61354cfbf095d6f10f71dae9d578369.jpg': 'main-qimg-e61354cfbf095d6f10f71dae9d578369.jpg',
      'springbrook national park, australia-2.jpg': 'springbrook national park, australia-2.jpg',
      'svaneti-georgia-min.jpg': 'svaneti-georgia-min.jpg',
      'Thor-Peak-The-Greatest-Vertical-Drop-on-Earth.jpg': 'Thor-Peak-The-Greatest-Vertical-Drop-on-Earth.jpg',
      'vinicunza peru.jpg': 'vinicunza peru.jpg',
      '20211106_151003.jpg': '20211106_151003.jpg',
      '20211101_151335.jpg': '20211101_151335.jpg',
      '20211110_125044.jpg': '20211110_125044.jpg',
      '20211110_125818_HDR.jpg': '20211110_125818_HDR.jpg',
    }
  }).on('change', (e) => {
    console.log(`🚀 ~ file: sketch-05.js ~ line 58 ~ createTweakpane ~ e`, e)
    manager.loadAndRun(sketch)
  })
}

// const updateImage = (src) => {
//   console.log(`🚀 ~ file: sketch-05.js ~ line 79 ~ updateImage ~ src`, src)
//   image = await load({ url: `assets/${src}`})
// }

const sketch = async ({ context, width, height, update }) => {

  console.log(`🚀 ~ file: sketch-05.js ~ line 20 ~ sketch ~ width, height`, width, height)
  const cell = settings.cellSize
  const cols = Math.floor(width / cell)
  const rows = Math.floor(height / cell)
  const numCells = cols * rows
  typeCanvas.width = cols
  typeCanvas.height = rows

  image = await load({ url: `assets/${params.image}` })
  let w = image.width
  let h = image.height
  let dimensionsFactor = 1
  let max = Math.max(w, h)
  console.log(`🚀 ~ file: sketch-05.js ~ line 116 ~ sketch ~ max`, max)
  w, h
  console.log(`🚀 ~ file: sketch-05.js ~ line 115 ~ sketch ~ w, h `, w, h)
  if (max > 6000) dimensionsFactor = .25
  if (max > 4000) dimensionsFactor = .5
  if (max > 3000) dimensionsFactor = .75
  if (max < 1000) dimensionsFactor = 1.25
  console.log(`🚀 ~ file: sketch-05.js ~ line 123 ~ sketch ~ dimensionsFactor`, dimensionsFactor)

  update({
    // dimensions: [image.width * 1.5, image.height * 1.5]
    // dimensions: [image.width, image.height]
    dimensions: [w * dimensionsFactor - (w * dimensionsFactor % params.cellSize), h * dimensionsFactor  - (h * dimensionsFactor % params.cellSize)]
    // dimensions: [image.width *.5, image.height * .5]
    // dimensions: [image.width * .25, image.height * .25]
  })

  return ({ context, width, height }) => {
    // updateImage(params.image)
    console.log(`🚀 ~ file: sketch-05.js ~ line 35 ~ return ~ width, height`, width, height)
    const cell = params.cellSize
    const imageCols = Math.floor(width / cell)
    const imageRows = Math.floor(height / cell)
    const imageCells = imageCols * imageRows
    imageCanvas.width = width * cell
    imageCanvas.height = height * cell
    typeCanvas.width = cols
    typeCanvas.height = rows

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height)
    console.log(`🚀 ~ file: sketch-05.js ~ line 51 ~ return ~ imageCols,imageRows`, imageCols, imageRows)

    // typeContext.fillStyle = 'black';
    // typeContext.fillRect(0, 0, cols, rows);
    // console.log(`🚀 ~ file: sketch-05.js ~ line 40 ~ return ~ cols, rows`, cols, rows)

    const pen = context
    fontSize = cols

    typeContext.fillStyle = 'white'
    // imageContext.fillStyle = 'red'
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
    // imageContext.save()
    // imageContext.translate(tx, ty)
    typeContext.beginPath()

    typeContext.stroke()
    typeContext.fillText(text, 0, 0)
    // typeContext.fillStyle = 'white'
    typeContext.restore()
    // imageContext.drawImage(image, 0, 0, imageCols * cell, imageRows * cell)
    imageContext.drawImage(image, 0, 0, width / cell, height / cell)

    // let typeData = typeContext.getImageData(0, 0, cols, rows).data
    // let imageData = imageContext.getImageData(0, 0, imageCols, imageRows).data
    let imageData = imageContext.getImageData(0, 0, imageCols, imageRows).data
    // console.log(`🚀 ~ file: sketch-05.js ~ line 81 ~ return ~ imageData`, imageData)
    // console.log(`🚀 ~ file: sketch-05.js ~ line 53 ~ return ~ typeData`, typeData)

    // let radGrd = pen.createRadialGradient(width * .5, height * .5, 0, width * .5 + 100, height * .5 + 100, height)
    // radGrd.addColorStop(0, randomRGBA())
    // radGrd.addColorStop(0.25, randomRangedRGBA(0, 50, 50, 100, 150, 255, 55, 105))
    // radGrd.addColorStop(0.5, randomRangedRGBA(50, 100, 0, 50, 50, 205, 55, 105))
    // radGrd.addColorStop(0.75, randomRangedRGBA(50, 150, 50, 100, 150, 255, 55, 105))
    // radGrd.addColorStop(1, randomRangedRGBA(150, 255, 25, 50, 150, 205, 55, 105))
    // pen.fillStyle = radGrd
    // imageContext.fill()
    // pen.fill()

    pen.textBaseline = 'middle'
    pen.textAlign = 'center'

    // pen.drawImage(typeCanvas, 0, 180, 180, 180)
    // pen.drawImage(image, 0, 0, 180, 180)

    for (let i = 0; i < imageCells; i++) {
      const col = i % imageCols
      const row = Math.floor(i / imageCols)
      const x = col * cell
      const y = row * cell


      const r = imageData[i * 4 + 0]
      const g = imageData[i * 4 + 1]
      const b = imageData[i * 4 + 2]
      const a = imageData[i * 4 + 3]


      // pen.fillStyle = randomRGBA()
      pen.fillStyle = `rgba(${r},${g},${b},${a})`
      // console.log(`🚀 ~ file: sketch-05.js ~ line 114 ~ return ~ rgba(${r},${g},${b},${a})`, `rgba(${r},${g},${b},${a})`)
      // pen.fillStyle = glyph
      let glyph = getGlyph(r)
      pen.font = `${cell * 2}px ${fontFamily}`
      // pen.fillStyle = 'white'

      pen.save()
      pen.translate(x, y)
      pen.translate(cell * .25, cell * .25)
      // pen.fillText(glyph, 0, 0)
      // pen.beginPath()
      let gradientAngle1 = random.range(0, 2)
      let gradientAngle2 = random.range(0, 1)
      let linGrd = pen.createLinearGradient(cell * gradientAngle1, 0, cell * gradientAngle2, cell)
      let colorRangeR = random.range(0, 1)
      let colorRangeG = random.range(0, 1)
      let colorRangeB = random.range(0, 1)
      let colorRangeA = random.range(0, .5)
      linGrd.addColorStop(0, `rgba(${r * colorRangeR},${g * colorRangeG},${b * colorRangeB},${a * colorRangeA})`)
      linGrd.addColorStop(1, `rgba(${r},${g},${b},${a})`)
      pen.fillStyle = `rgba(${r},${g},${b},${.75})`
      pen.shadowBlur =
        pen.shadowColor = `rgba(${r},${g},${b},${a})`
      // pen.fillRect(0, 0, cell, cell)
      // pen.fillRect(0, 0, cell * .9, cell * .9)
      // pen.fillRect(0, 0, cell * .75, cell * .75)
      pen.fillRect(0, 0, cell * .5, cell * .5)
      // pen.fillRect(0,0, 1, 1)
      // pen.arc(0, 0, cell / 2, 0, Math.PI * 2)
      pen.fill()
      pen.restore()
    }

    // pen.drawImage(image, 0, 0, 180, 180)

    // for (let i = 0; i < numCells; i++) {
    //   const col = i % cols
    //   const row = Math.floor(i / cols)
    //   const x = col * cell
    //   const y = row * cell

    //   const r = typeData[i * 4 + 0]
    //   const g = typeData[i * 4 + 1]
    //   const b = typeData[i * 4 + 2]
    //   const a = typeData[i * 4 + 3]

    //   let glyph = getGlyph(r)
    //   // glyph = loadImage()
    //   pen.font = `${cell * 2}px ${fontFamily}`
    //   if (Math.random() < 0.1) pen.font = `${cell * 6}px ${fontFamily}`
    //   // pen.fillStyle = randomRGBA()
    //   // pen.fillStyle = `rgba(${r},${g},${b},${a})`
    //   // pen.fillStyle = glyph
    //   pen.save()
    //   pen.translate(x, y)
    //   pen.translate(cell * .5, cell * .5)

    //   // pen.fillRect(0,0, cell, cell)
    //   // pen.beginPath()
    //   // pen.arc(0,0, cell / 2, 0, Math.PI * 2)
    //   pen.fillText(glyph, 0, 0)
    //   pen.fillStyle = 'white'
    //   pen.fill()
    //   pen.restore()
    // }



  };
};

const onKeyUp = (e) => {
  console.log(`🚀 ~ file: sketch-05.js ~ line 50 ~ onKeyUp ~ e`, e)
  text = ""
  text = e.key.toUpperCase()
  manager.render()
}
// document.addEventListener('keyup', onKeyUp)

// const start = async () => {
//   manager = await canvasSketch(sketch, settings);
// }
const start = async () => {
  manager = await canvasSketch(sketch, settings, params);
  // manager = await canvasSketch(sketch, settings);
  // manager.loadAndRun(sketch, settings)
  // const img = await loadImage(url)
  // console.log(`🚀 ~ file: sketch-05.js ~ line 67 ~ loadImage ~ img`, img)
  // console.log(`This line`)
}
start()
createTweakpane()


const randomRGBA = (r = random.range(0, 255), g = random.range(0, 255), b = random.range(0, 255), a = random.range(0.5, .5)) => {
  let color = `rgba(${r},${g}%,${b}%,${a})`
  return color
}
const randomRangedRGBA = (
  r1 = 0,
  r2 = 255,
  g1 = 0,
  g2 = 255,
  b1 = 0,
  b2 = 255,
  a1 = 0,
  a2 = 255
) => {
  let color = `rgba(${random.range(r1, r2)},${random.range(g1, g2)}%,${random.range(b1, b2)}%,${random.range(a1, a2)})`
  return color
}

const getGlyph = (v) => {
  if (v < 50) { return '' }
  if (v < 100) { return '.' }
  if (v < 150) { return '/' }
  if (v < 200) { return '@' }
  const glyphs = '_= /'.split('')
  let g = random.pick(glyphs)
  return g
}



const url = 'https://picsum.photos/200'
// const url = 'C:/webdev/kitplate/static/1024px-Martin,_John_-_The_Seventh_Plague_-_1823.jpg'
const loadImage = (url = 'https://picsum.photos/200') => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
}


// const start = () => {
//   loadImage(url).then(img => {
//   console.log(`🚀 ~ file: sketch-05.js ~ line 67 ~ loadImage ~ img`, img)
//   })
//   console.log(`This line`)
// }

// start()
