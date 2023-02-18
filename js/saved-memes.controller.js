'use strict'

const STORAGE_KEY = 'memesDB'
let gSavedImages = []

function onInitSavedMemes() {
  gSavedImages = (!loadFromStorage(STORAGE_KEY)) ? [] : loadFromStorage(STORAGE_KEY)
  renderSavedMemes()
  showSavedMemes()
}

function renderSavedMemes() {
  const savedMemesGallery = document.querySelector('.gallery-saved-memes')
  savedMemesGallery.innerHTML = ''
  if (gSavedImages.length) {
    gSavedImages.forEach((image) => {
      const img = new Image()
      img.src = image
      img.onclick = onSavedImgSelect
      console.log(img)
      savedMemesGallery.appendChild(img)
      document.querySelector('.empty-title').style.display = 'none'
    })
    document.querySelector('.empty-title').hidden = false
  }
}

function onSavedImgSelect(elImg) {
  clearMeme()
  const imgId = +elImg.dataset.id
  setImg(imgId)
  showEditor()
  onInit()
  onAddLine()
}

function onSaveMeme() {
  const imgContent = gElCanvas.toDataURL()
  gSavedImages.push(imgContent)
  saveToStorage(STORAGE_KEY, gSavedImages)
}


function showSavedMemes() {
  document.querySelector('.saved-memes').classList.add('show')
  document.querySelector('.gallery').classList.remove('show')
  document.querySelector('.editor').classList.remove('show')
}