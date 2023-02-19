'use strict'

const STORAGE_KEY = 'memesDB'
let gSavedMemes = []
let gTimeOut

function onInitSavedMemes() {
  gSavedMemes = (!loadFromStorage(STORAGE_KEY)) ? [] : loadFromStorage(STORAGE_KEY)
  renderSavedMemes()
  showSavedMemes()
}

function renderSavedMemes() {
  const savedMemesGallery = document.querySelector('.gallery-saved-memes')
  savedMemesGallery.innerHTML = ''
  if (gSavedMemes.length) {
    gSavedMemes.forEach((meme) => {
      const img = new Image()
      img.src = meme.previewImg
      img.dataset.id = meme.selectedImgId
      img.setAttribute('onclick', `onSavedMemeSelect(this)`)
      savedMemesGallery.appendChild(img)
      document.querySelector('.empty-title').style.display = 'none'
    })
    document.querySelector('.empty-title').hidden = false
  }
}

function onSavedMemeSelect(elImg) {
  const imgId = +elImg.dataset.id
  const meme = gSavedMemes.find(meme => meme.selectedImgId === imgId)
  // clearMeme()
  loadMeme(meme)
  showEditor()
  onInit()
  renderMeme()
}

function onSaveMeme() {
  const meme = getMeme()
  const imgContent = gElCanvas.toDataURL()
  meme.previewImg = imgContent
  gSavedMemes.push(meme)
  saveToStorage(STORAGE_KEY, gSavedMemes)
  flashMsg(`Meme saved!`)
}


function showSavedMemes() {
  document.querySelector('.saved-memes').classList.add('show')
  document.querySelector('.gallery').classList.remove('show')
  document.querySelector('.editor').classList.remove('show')
}

function flashMsg(msg) {
  const el = document.querySelector('.user-msg')
  el.innerText = msg
  el.classList.add('open')
  clearTimeout(gTimeOut)
  gTimeOut = setTimeout(() => {
    el.classList.remove('open')
  }, 3000)
}
