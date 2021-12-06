const canvasSketch = require('canvas-sketch');

let width = height = 1080
const settings = {
  dimensions: [width, height]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    const pen = context

    pen.fillStyle = 'white'
    pen.font = '1200px serif'
    pen.textBaseline = 'top'
    // pen.textAlign = 'center'
    let text = "e"
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

canvasSketch(sketch, settings);
