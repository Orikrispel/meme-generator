'use strict'

let gElCanvas
let gCtx

function onInit() {
     gElCanvas = document.querySelector('#my-canvas')
     gCtx = gElCanvas.getContext('2d')
     // resizeCanvas()
     // window.addEventListener('resize', resizeCanvas)
}

function onSetLine(txt) {
     setLineTxt(txt)
     renderMeme()
}

function renderMeme() {
     drawImg()
     setTimeout(() => {
          drawText()
     }, 20);
}

function drawImg() {
     const meme = getMeme()
     const img = new Image()
     img.src = getImgById(meme.selectedImgId)
     img.onload = () => {
          gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
     }
}

function drawText() {
     // debugger
     getMeme().lines.forEach(line => {
          gCtx.lineWidth = 2
          gCtx.strokeStyle = 'black'
          gCtx.fillStyle = line.color
          gCtx.font = `${line.size}px impact`
          gCtx.textAlign = line.align
          gCtx.textBaseline = 'middle'
          gCtx.fillText(line.txt, line.x, line.y)
          gCtx.strokeText(line.txt, line.x, line.y)
     })
}

function onChangeFontSize(elBtn) {
     const operator = elBtn.dataset.operator
     const meme = getMeme()
     meme.lines[meme.selectedLineIdx].size += (operator === '+') ? 5 : -5
     renderMeme()
}

function onChangeColor(color) {
     const meme = getMeme()
     meme.lines[meme.selectedLineIdx].color = color
     renderMeme()
}

function onAddLine() {
     const linesCount = getLinesCount()
     let x = gElCanvas.width / 2
     let y
     if (linesCount === 0) y = 50
     else if (linesCount === 1) y = gElCanvas.height - 50
     else y = gElCanvas.height / 2
     addLine(x, y)
     drawText()
}

function onSwitchLines() {
     switchLines()
}


function showGallery() {
     document.querySelector('.gallery').classList.add('show')
     document.querySelector('.editor').classList.remove('show')
}

function clearCanvas() {
     gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

// function resizeCanvas() {
//      const elContainer = document.querySelector('.canvas-container')
//      gElCanvas.width = elContainer.offsetWidth
//      gElCanvas.height = elContainer.offsetWidth
//      renderMeme()
//      // Unless needed, better keep height fixed.
// }