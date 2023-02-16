'use strict'

function onGalleryInit() {
  renderGallery()
}

function renderGallery() {
  const imgs = getImgs()
  const gallery = document.querySelector('.gallery')
  imgs.forEach(img => {
    let strHTML = `<img data-id="${img.id}" class="img-gallery" src="${img.url}" onclick="onImgSelect(this)" />`
    gallery.innerHTML += strHTML
  })
}

function onImgSelect(elImg) {
  clearMeme()
  const imgId = +elImg.dataset.id
  setImg(imgId)
  showEditor()
  onInit()
  onAddLine()
}

function showEditor() {
  document.querySelector('.editor').classList.add('show')
  document.querySelector('.gallery').classList.remove('show')
}

