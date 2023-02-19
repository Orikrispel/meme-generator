'use strict'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gFilterKeyword
const gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'trump'] },
{ id: 2, url: 'img/2.jpg', keywords: ['puppies', 'dogs'] },
{ id: 3, url: 'img/3.jpg', keywords: ['puppies', 'dogs'] },
{ id: 4, url: 'img/4.jpg', keywords: ['baby', 'babies', 'dogs'] },
{ id: 5, url: 'img/5.jpg', keywords: ['baby', 'babies'] },
{ id: 6, url: 'img/6.jpg', keywords: ['funny', 'famous'] },
{ id: 7, url: 'img/7.jpg', keywords: ['baby', 'babies'] },
{ id: 8, url: 'img/8.jpg', keywords: ['funny', 'famous'] },
{ id: 9, url: 'img/9.jpg', keywords: ['funny', 'famous'] },
{ id: 10, url: 'img/10.jpg', keywords: ['funny', 'famous', 'obama'] },
{ id: 11, url: 'img/11.jpg', keywords: ['fight', 'funny', 'famous'] },
{ id: 12, url: 'img/12.jpg', keywords: ['israel', 'funny', 'famous'] },
{ id: 13, url: 'img/13.jpg', keywords: ['famous', 'drink'] },
{ id: 14, url: 'img/14.jpg', keywords: ['matrix', 'famous'] },
{ id: 15, url: 'img/15.jpg', keywords: ['funny', 'famous'] },
{ id: 16, url: 'img/16.jpg', keywords: ['laugh', 'famous'] },
{ id: 17, url: 'img/17.jpg', keywords: ['putin', 'famous'] },
{ id: 18, url: 'img/18.jpg', keywords: ['disney', 'famous'] },
];

function onGalleryInit() {
  renderGallery()
  renderFilters()
}

function getImgs() {
  if (!gFilterKeyword) return gImgs
  const imgs = gImgs.filter(img => img.keywords.includes(gFilterKeyword.toLowerCase()))
  console.log(imgs)
  return imgs
}

function renderGallery() {
  const imgs = getImgs()
  const memesGallery = document.querySelector('.memes-gallery')
  let strHTMLs = ''
  if (imgs.length === 0) {
    memesGallery.innerHTML = '<h2>No images found.</h2>'
    return
  }
  strHTMLs = imgs.forEach(img => {
    strHTMLs += `<img data-id="${img.id}" class="img-gallery" src="${img.url}" onclick="onImgSelect(this)" />`
    memesGallery.innerHTML = strHTMLs
  })
}

function renderFilters() {

  const filters = document.querySelector('.filters')
  let strHTMLs = ''
  for (const key in gKeywordSearchCountMap) {
    strHTMLs += `<a onclick="onSearch(ev, this.value)" 
    style="font-size: ${2 * gKeywordSearchCountMap[key]}px>
    ${key}</a>`
  }
  console.log(strHTMLs)
  filters.innerHTML = strHTMLs
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
  document.querySelector('.saved-memes').classList.remove('show')
}

function onSearch(ev, val) {
  gFilterKeyword = val
  renderGallery()
}

