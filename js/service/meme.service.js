'use strict'

var gMeme = {
     selectedImgId: 1,
     selectedLineIdx: -1,
     lines: []
}

function getMeme() {
     return gMeme
}

function getImgById(id) {
     const img = gImgs.find(img => img.id === id)
     return img.url
}

function getLinesCount() {
     return gMeme.lines.length
}

function getSelectedLine() {
     return gMeme.lines[gMeme.selectedLineIdx]
}

function setImg(imgId) {
     gMeme.selectedImgId = imgId
}

function loadMeme(meme) {
     gMeme = meme
}

function setLineTxt(txt) {
     const line = getSelectedLine()
     line.txt = txt
}

function changeFontSize(operator) {
     const line = gMeme.lines[gMeme.selectedLineIdx]
     line.size += (operator === '+') ? 5 : -5
}

function changeColor(color) {
     const line = getSelectedLine()
     line.color = color
}

function changeStrokeColor(color) {
     const line = getSelectedLine()
     line.strokeColor = color
}

function switchLines() {
     gMeme.selectedLineIdx = (gMeme.selectedLineIdx === getLinesCount() - 1) ? 0 : gMeme.selectedLineIdx + 1
}

function addLine(x, y) {
     const newLine = _createLine(x, y)
     gMeme.lines.push(newLine)
     gMeme.selectedLineIdx++
}
function addSticker(x, y, sticker) {
     const newSticker = _createLine(x, y, sticker, 50)
     gMeme.lines.push(newSticker)
     gMeme.selectedLineIdx++
}

function deleteLine() {
     const lineIdx = gMeme.selectedLineIdx
     gMeme.lines.splice(lineIdx, 1)
     const length = getLinesCount()
     gMeme.selectedLineIdx = length - 1
}

function changeTextAlign(align) {
     const line = getSelectedLine()
     let dx = line.pos.x - line.txtWidth / 2
     let x
     if (align === 'center') x = gElCanvas.width / 2
     else if (align === 'right') x = gElCanvas.width - (line.txtWidth / 2 + 20)
     else x = 20 + line.txtWidth / 2
     line.pos.x = x
}

function isLineClicked(clickedPos) {
     const lines = gMeme.lines
     let isLineClicked = false
     lines.forEach((line, index) => {
          const pos = {
               x: line.pos.x - line.txtWidth / 2,
               y: line.pos.y - line.size / 2,
          }
          if (clickedPos.x >= pos.x && clickedPos.x <= pos.x + line.txtWidth &&
               clickedPos.y >= pos.y && clickedPos.y <= pos.y + line.size) {
               isLineClicked = true
               gMeme.selectedLineIdx = index
          }
     });
     return (isLineClicked)
}

function moveLine(dx, dy) {
     const line = gMeme.lines[gMeme.selectedLineIdx]
     line.pos.x += dx;
     line.pos.y += dy;
}

function adjustTextPos(proportion) {
     if (proportion === Infinity) return
     gMeme.lines.forEach(line => {
          line.pos.x *= proportion
          line.pos.y *= proportion
     })
}

function clearMeme() {
     gMeme.selectedLineIdx = -1
     gMeme.lines = []
}

function _createLine(x, y, txt = 'Add your text here', size = 35) {
     return {
          txt,
          font: 'impact',
          size,
          align: 'center',
          color: 'white',
          strokeColor: 'black',
          pos: {
               x,
               y
          }
     }
}