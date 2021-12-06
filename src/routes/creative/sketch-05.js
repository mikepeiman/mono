const canvasSketch = require('canvas-sketch');

let manager
let fontFamily = "Century"
let width = height = 1080
const settings = {
  dimensions: [width, height]
};

let text = "m"
let fontSize = 1200

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    const pen = context

    pen.fillStyle = 'white'
    pen.font = `${fontSize}px ${fontFamily}`
    pen.textBaseline = 'top'
    // pen.textAlign = 'center'
    // text = "M"
    let metrics = pen.measureText(text)
    console.log(`🚀 ~ file: sketch-05.js ~ line 20 ~ return ~ metrics `, metrics)
    let mx = metrics.actualBoundingBoxLeft * -1
    let my = metrics.actualBoundingBoxAscent * -1
    let mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    let mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    let x = (width - mw) * .5 - mx
    let y = (height - mh) * .5 - my

    pen.save()
    pen.translate(x, y)
    pen.beginPath()
    pen.rect(mx, my, mw, mh)
    pen.strokeStyle = "#aabbff"
    pen.stroke()
    pen.fillText(text, 0, 0)
    pen.restore()



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