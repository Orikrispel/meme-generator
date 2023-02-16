'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'trump'] },
{ id: 2, url: 'img/2.jpg', keywords: ['puppies', 'dogs'] },
{ id: 3, url: 'img/3.jpg', keywords: ['puppies', 'dogs'] },
{ id: 4, url: 'img/4.jpg', keywords: ['baby', 'babies', 'dogs'] },
{ id: 5, url: 'img/5.jpg', keywords: ['baby', 'babies'] },
{ id: 6, url: 'img/6.jpg', keywords: ['funny', 'famous'] },
{ id: 7, url: 'img/7.jpg', keywords: ['baby', 'babies'] },
{ id: 8, url: 'img/8.jpg', keywords: ['funny', 'famous'] },
{ id: 9, url: 'img/9.jpg', keywords: ['funny', 'famous'] },
{ id: 10, url: 'img/10.jpg', keywords: ['funny', 'famous'] },
{ id: 11, url: 'img/11.jpg', keywords: ['funny', 'famous'] },
{ id: 12, url: 'img/12.jpg', keywords: ['funny', 'famous'] }];
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

function getImgs() {
     return gImgs
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

function setLineTxt(txt) {
     const line = gMeme.lines[gMeme.selectedLineIdx]
     line.txt = txt
}

function changeFontSize(operator) {
     const line = gMeme.lines[gMeme.selectedLineIdx]
     line.size += (operator === '+') ? 5 : -5
}

function changeColor(color) {
     gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeStrokeColor(color) {
     gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function switchLines() {
     gMeme.selectedLineIdx = (gMeme.selectedLineIdx === getLinesCount() - 1) ? 0 : gMeme.selectedLineIdx + 1
}

function addLine(x, y) {
     const newLine = _createLine(x, y)
     gMeme.lines.push(newLine)
     gMeme.selectedLineIdx++
}

function deleteLine() {
     const lineIdx = gMeme.selectedLineIdx
     gMeme.lines.splice(lineIdx, 1)
     const length = getLinesCount()
     gMeme.selectedLineIdx = length - 1
}

function changeTextAlign(str) {
     const lineIdx = gMeme.selectedLineIdx
     gMeme.lines[lineIdx].align = str
}

function isLineClicked(clickedPos) {
     const lines = gMeme.lines
     let isLineClicked = false
     // debugger
     lines.forEach((line, index) => {
          const pos = {
               x: line.pos.x - line.txtWidth / 2,
               y: line.pos.y - line.size / 2,
          }
          if (clickedPos.x >= pos.x && clickedPos.x <= pos.x + line.txtWidth &&
               clickedPos.y >= pos.y && clickedPos.y <= pos.y + line.size) {
               isLineClicked = true
               gMeme.selectedLineIdx = index
          } else {
               console.log('sorry, not in boundery')
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
     gMeme.lines.forEach(line => {
          line.pos.x *= proportion
          line.pos.y *= proportion
     })
}

function clearMeme() {
     gMeme.selectedLineIdx = -1
     gMeme.lines = []
}

function _createLine(x, y) {
     return {
          txt: 'Add your text here',
          font: 'impact',
          size: 30,
          align: 'center',
          color: 'white',
          strokeColor: 'black',
          pos: {
               x,
               y
          }
     }
}