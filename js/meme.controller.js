'use strict'

let gElCanvas
let gCtx
let gIsDragging = false
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
     gElCanvas = document.querySelector('#my-canvas')
     gCtx = gElCanvas.getContext('2d')
     addListeners()
     resizeCanvas()
}

function renderMeme(isDownload = false, callback = null) {
     const meme = getMeme()
     const img = new Image()
     img.src = getImgById(meme.selectedImgId)
     img.onload = () => {
          gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
          drawText()
          if (!isDownload) MarkSelectedLine()
          else callback()
     }
}

function drawText() {
     getMeme().lines.forEach(line => {
          gCtx.lineWidth = 2
          gCtx.strokeStyle = line.strokeColor
          gCtx.fillStyle = line.color
          gCtx.font = `${line.size}px ${line.font}`
          gCtx.textAlign = 'center'
          gCtx.textBaseline = 'middle'
          gCtx.fillText(line.txt, line.pos.x, line.pos.y)
          gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
          line.txtWidth = gCtx.measureText(line.txt).width
     })
}

function onSetLine(txt) {
     if (!getLinesCount()) return
     setLineTxt(txt)
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
     renderMeme()
     MarkSelectedLine()
     document.querySelector('.txt-input').value = getSelectedLine().txt
}

function onDeleteLine() {
     if (!getLinesCount()) return
     deleteLine()
     renderMeme()
     MarkSelectedLine()
     if (!getLinesCount()) return
     document.querySelector('.txt-input').value = getSelectedLine().txt
}

function onSwitchLines() {
     switchLines()
     renderMeme()
     document.querySelector('.txt-input').value = getSelectedLine().txt
}

function onChangeFontSize(elBtn) {
     if (!getLinesCount()) return
     const operator = elBtn.dataset.operator
     changeFontSize(operator)
     renderMeme()
}

function onChangeColor(color) {
     if (!getLinesCount()) return
     changeColor(color)
     renderMeme()
}

function onChangeStrokeColor(color) {
     if (!getLinesCount()) return
     changeStrokeColor(color)
     renderMeme()
}

function onChangeTextAlignment(elBtn) {
     if (!getLinesCount()) return
     changeTextAlign(elBtn.dataset.align)
     renderMeme()
}

function onChangeFont(font) {
     if (!getLinesCount()) return
     const meme = getMeme()
     meme.lines[meme.selectedLineIdx].font = font
     renderMeme()
}

function MarkSelectedLine() {
     const line = getSelectedLine()
     if (!line) return
     const pos = {
          x: line.pos.x - (line.txtWidth / 2 + 5),
          y: line.pos.y - (line.size / 2 + 5),
     }
     gCtx.beginPath();
     gCtx.fillStyle = 'rgba(250,250,250,0.3)'
     gCtx.strokeStyle = 'white'
     gCtx.lineWidth = 1
     gCtx.fillRect(pos.x, pos.y, line.txtWidth + 10, line.size + 10);
     gCtx.strokeRect(pos.x, pos.y, line.txtWidth + 10, line.size + 10);
     gCtx.closePath()
}

function showGallery() {
     document.querySelector('.gallery').classList.add('show')
     document.querySelector('.saved-memes').classList.remove('show')
     document.querySelector('.editor').classList.remove('show')
}

function clearCanvas() {
     gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function downloadImg(elLink) {
     onSaveMeme()
     renderMeme(true, function () {
          const imgContent = gElCanvas.toDataURL('image/jpeg')
          elLink.href = imgContent
     })
}

// ********* HANDLE TEXT DRAGGING ************* //

function addListeners() {
     addMouseListeners()
     addTouchListeners()
     window.addEventListener('resize', resizeCanvas)
}

function addMouseListeners() {
     gElCanvas.addEventListener('mousedown', onDown)
     gElCanvas.addEventListener('mousemove', onMove)
     gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
     gElCanvas.addEventListener('touchstart', onDown)
     gElCanvas.addEventListener('touchmove', onMove)
     gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
     gStartPos = getEvPos(ev)
     if (!isLineClicked(gStartPos)) return
     gIsDragging = true
}

function onMove(ev) {
     if (!gIsDragging) return

     const pos = getEvPos(ev)
     // Calc the delta , the diff we moved
     const dx = pos.x - gStartPos.x
     const dy = pos.y - gStartPos.y
     moveLine(dx, dy)
     gStartPos = pos
     renderMeme()
}

function onUp() {
     gIsDragging = false
}

function resizeCanvas() {
     const elContainer = document.querySelector('.canvas-container')
     let proportion = elContainer.offsetWidth / gElCanvas.width
     gElCanvas.width = elContainer.offsetWidth
     gElCanvas.height = elContainer.offsetWidth
     adjustTextPos(proportion)
     renderMeme()
}

function getEvPos(ev) {
     let pos = {
          x: ev.offsetX,
          y: ev.offsetY,
     }
     if (TOUCH_EVS.includes(ev.type)) {
          ev.preventDefault()
          ev = ev.changedTouches[0]
          pos = {
               x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
               y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
          }
     }
     return pos
}