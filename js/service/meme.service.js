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

function setImg(imgId) {
     gMeme.selectedImgId = imgId
}

function getMeme() {
     return gMeme
}

function getImgById(id) {
     const img = gImgs.find(img => img.id === id)
     return img.url
}

function setLineTxt(txt) {
     const lineIndx = gMeme.selectedLineIdx
     gMeme.lines[lineIndx].txt = txt
}

function getImgs() {
     return gImgs
}

function getLinesCount() {
     return gMeme.lines.length
}

function switchLines() {
     gMeme.selectedLineIdx = (gMeme.selectedLineIdx === getLinesCount() - 1) ? 0 : gMeme.selectedLineIdx + 1
}

function addLine(x, y) {
     const newLine = _createLine(x, y)
     gMeme.lines.push(newLine)
     gMeme.selectedLineIdx++
}

function clearMeme() {
     gMeme.selectedLineIdx = -1
     gMeme.lines = []
}

function _createLine(x, y) {
     return {
          txt: 'Add your text here',
          size: 40,
          align: 'center',
          color: 'white',
          x,
          y
     }
}

// function createLines() {
//      gArr = loadFromStorage(ARRS_KEY)
//      if (!gArr || !gArr.length) {
//           gArr = []
//           let arrs = ['Harry Potter', 'Narnia', 'Lord of the Rings']
//           let imgCounter = 0
//           arrs.forEach(item => {
//                gArr.push(createArr(item, undefined, undefined, `img/img${imgCounter}.jpg`))
//                imgCounter++
//           })
//           for (let i = 0; i < 98; i++) {
//                gArr.push(createArr(makeLorem(1)))
//           }
//           gArr = _addNextPrev()
//           _saveArrs()
//      } else gArr.forEach(item => {
//           if (gDisplayId < item.displayId) gDisplayId = item.displayId + 1
//      })
// }

// function createArr(name, price = getRandomInt(20, 100), rate = 0, img = 'img/default.jpg') {
//      return {
//           displayId: gDisplayId++,
//           id: makeId(6),
//           name: name,
//           price: price,
//           rate: rate,
//           imgUrl: img,
//           text: makeLorem(),
//           prev: null,
//           next: null,
//      }
// }

// function deleteArr(arrId) {
//      gArr.splice(getArrIdxById(arrId), 1)
//      _saveArrs()
// }

// function addArr(arrName, arrPrice, imgURL) {
//      gArr.unshift(createArr(arrName, arrPrice, 0, imgURL))
//      _saveArrs()
// }

// function updateArr(arrId, arrPrice) {
//      getArrById(arrId).price = arrPrice
//      _saveArrs()
// }

// function getCurrRate(arrId) {
//      return getArrById(arrId).rate
// }

// function changeRate(changeRate, arrId) {
//      const currArr = getArrById(arrId)
//      currArr.rate += changeRate
//      _saveArrs()
//      return currArr.rate
// }

// function getFilteredArr() {
//      return gArr.filter(item => item.price > gFilter.min &&
//           item.price < gFilter.max &&
//           item.name.toLowerCase().includes(gFilter.name.toLowerCase()))
// }

// function getArrs() {
//      let currArr = getFilteredArr()
//      currArr = _addNextPrev(currArr)
//      const startIdx = gPageIdx * PAGE_SIZE
//      const arrs = currArr.slice(startIdx, startIdx + PAGE_SIZE)
//      return arrs
// }

// function getArrIdxById(arrId) {
//      return gArr.findIndex(arr => arr.id === arrId)
// }

// function getArrById(arrId) {
//      return gArr.find(arr => arr.id === arrId)
// }

// function _saveArrs() {
//      saveToStorage(ARRS_KEY, gArr)
// }

// function _addNextPrev(arrs = gArr) {
//      arrs.forEach((arr, idx) => {
//           arr.prev = (idx === 0) ? gArr[gArr.length - 1].id : gArr[idx - 1].id
//           arr.next = (idx === gArr.length - 1) ? gArr[0].id : gArr[idx + 1].id
//      })
//      return arrs
// }

// function getFilter() {
//      return gFilter
// }

// function changeArrFilter(filterType, filterBy) {
//      if (filterBy !== undefined && filterBy !== '') gFilter[filterType] = filterBy
//      else resetFilter(filterType)
// }

// function setArrFilter(filterVars) {
//      gFilter = filterVars
// }

// function resetFilter(filterType) {
//      switch (filterType) {
//           case 'min':
//                gFilter.min = -Infinity
//                break
//           case 'max':
//                gFilter.max = Infinity
//                break
//           case 'name':
//                gFilter.name = ''
//                break
//      }
// }

// function prevPage() {
//      gPageIdx--
//      return gPageIdx
// }

// function nextPage() {
//      gPageIdx++
//      return gPageIdx
// }

// function saveCurrArr(currArr) {
//      saveToStorage(CURR_ARR_KEY, currArr)
// }

// function getCurrArr() {
//      return loadFromStorage(CURR_ARR_KEY) || null
// }

// function checkarrId(currarrId) {
//      const arr = gArr.find(arr => {
//           return arr.id === currarrId
//      })
//      return arr
// }