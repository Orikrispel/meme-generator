'use strict'

var gCurrArrId = null
var gIsModalOpen = false
var gModal = null
var gElCanvas
var gCtx

function onInit() {
     //touch
     const modal = document.querySelector('.modal')
     gModal = new Hammer(modal)
     onSwipe()
     //CRUDL
     renderFilterByQueryStringParams()
     renderLangByQueryStringParams()
     renderTable()
     //canvas
     //TODO: add listeners with hammer
     resizeCanvas()
     window.addEventListener('resize', resizeCanvas)
}

function renderTable() {
     let strHTML = []
     let arr = getArr()
     strHTML.push(`<tr>
    <th class="header" data-trans="id">ID</th>
    <th class="header" data-trans="title">Title</th>
    <th class="header" data-trans="img">Image</th>
    <th class="header" data-trans="price">Price</th>
    <th class="header" data-trans="actions">Actions</th>
    </tr>`)
     strHTML.push(arr.map(item => {
          const { id, name, price, img } = item
          return `
        <tr>
        <td class="cell">${id}</td>
        <td class="cell">${name}</td>
        <td class="cell"><img src="${img}"></td>
        <td class="cell">${formatCurrency(price)}</td>
        <td class="cell"><button class="btn" data-trans="read" onclick="onReadItem('${id}')">Read</button></td>
        <td class="cell"><button class="btn" data-trans="update" onclick="onUpdateItem('${id}')">Update</button></td>
        <td class="cell"><button class="btn" data-trans="delete" onclick="onDeleteItem('${id}')">Delete</button></td>
        </tr>
        `
     }))
     const elTable = document.querySelector('.table-container')
     elTable.innerHTML = strHTML.join('')
     doTrans()
}

function onSwipe() {
     gModal.on('swipeleft swiperight', (ev) => {
          const currArr = getCurrArr()
          if (ev.type === 'swiperight') {
               onReadArr(currArr.prev)
          } else {
               onReadArr(currArr.next)
          }
     })
}

function onDeleteArr(arrId) {
     deleteArr(arrId)
     renderTable()
}

function onAddArr() {
     const form = document.querySelector('.new-arr')
     form.hidden = false
}

function onConfirmArr(ev) {
     ev.preventDefault()
     const elNewName = document.querySelector('input[name="new-arr-name"]')
     const elNewPrice = document.querySelector('input[name="new-arr-price"]')
     const imageURL = getImageURL()
     if (imageURL) addArr(elNewName.value, elNewPrice.value, imageURL)
     else addArr(elNewName.value, elNewPrice.value)
     renderTable()
     const form = document.querySelector('.new-arr')
     form.hidden = true
}

function onUpdateArr(arrId) {
     const arrPrice = +prompt('Price?')
     updateArr(arrId, arrPrice)
     renderTable()
}

function onReadArr(arrId) {
     var currArr = getArrById(arrId)
     gCurrArrId = arrId
     saveCurrArr(currArr)
     openModal(currArr)
}

function openModal(currArr) {
     const modal = document.querySelector('.modal')
     modal.classList.remove('hide')
     const modalSpan = document.querySelector('.modal-body span')
     modalSpan.innerText = currArr.text
     const modalTitle = document.querySelector('.modal-title')
     modalTitle.innerText = currArr.name
     const modalRate = document.querySelector('.modal-footer div')
     const currRate = currArr.rate
     modalRate.innerText = currRate
     disableEnableModalBtns(currRate)
     gIsModalOpen = true
     setQueryStringParams()
}

function onChangeRate(ratingChange) {
     const newRate = changeRate(ratingChange, gCurrArrId)
     const modalRate = document.querySelector('.modal-footer div')
     modalRate.innerText = newRate
     disableEnableModalBtns(newRate)
}

function disableEnableModalBtns(rate) {
     const modalMinus = document.querySelector('.modal-minus')
     const modalPlus = document.querySelector('.modal-plus')
     if (rate <= 0) modalMinus.disabled = true //minus
     else if (rate >= 1) modalMinus.disabled = false
     if (rate >= 10) modalPlus.disabled = true //plus
     else if (rate <= 9) modalPlus.disabled = false
}

function onCloseModal() {
     const modal = document.querySelector('.modal')
     modal.classList.add('hide')
     gIsModalOpen = false
     setQueryStringParams()
}

function onSetFilterBy(filterType, filterBy) {
     changeArrFilter(filterType, filterBy)
     renderTable()
     setQueryStringParams()
}

function renderFilterByQueryStringParams() {
     const queryStringParams = new URLSearchParams(window.location.search)
     if (queryStringParams.get('modal') === 'true') {
          let arrId = queryStringParams.get('arrId')
          if (!checkArrId(arrId)) {
               const arr = getCurrArr()
               if (arr) {
                    arrId = arr.id
                    onReadArr(arrId)
               }
          } else onReadArr(arrId)
     }
     const filterVars = {
          min: +queryStringParams.get('min') || -Infinity,
          max: +queryStringParams.get('max') || Infinity,
          name: queryStringParams.get('name') || '',
     }
     // const {min, max, name} = filterVars
     if (!filterVars.min && !filterVars.max && (!filterVars.name || filterVars.name === '')) return

     document.querySelector('.filter-min').value = (filterVars.min === -Infinity) ? '' : filterVars.min
     document.querySelector('.filter-max').value = (filterVars.max === Infinity) ? '' : filterVars.max
     document.querySelector('.filter-name').value = filterVars.name
     setArrFilter(filterVars)
}

function onPrevPage() {
     var currPage = prevPage()
     disableEnablePageBtns(currPage)
     renderTable()
}

function onNextPage() {
     var currPage = nextPage()
     disableEnablePageBtns(currPage)
     renderTable()
}

function disableEnablePageBtns(currPage) {
     if (currPage >= getFilteredArr().length / PAGE_SIZE - 1) document.querySelector('.next').disabled = true
     else document.querySelector('.next').disabled = false
     if (currPage <= 0) document.querySelector('.previous').disabled = true
     else document.querySelector('.previous').disabled = false

}

function onSetLang(lang) {
     if (lang === 'choose') return
     setLang(lang)
     renderTable()
     setBodyRTL(lang)
     setQueryStringParams()
}

function setBodyRTL(lang) {
     if (lang === 'he') document.body.classList.add('rtl')
     else document.body.classList.remove('rtl')
}

function renderLangByQueryStringParams() {
     const queryStringParams = new URLSearchParams(window.location.search)
     if (queryStringParams.get('lang') === 'he') {
          setLang('he')
          setBodyRTL('he')
     }
}

function resizeCanvas() { //deletes content on move
     const elContainer = document.querySelector('.canvas-container')
     // Note: changing the canvas dimension this way clears the canvas
     gElCanvas.width = elContainer.offsetWidth
     // Unless needed, better keep height fixed.
     gElCanvas.height = elContainer.offsetHeight //might need to remove
}

function getEvPos(ev) {
     // Gets the offset pos , the default pos
     let pos = {
          x: ev.offsetX,
          y: ev.offsetY,
     }
     // Check if its a touch ev
     if (TOUCH_EVS.includes(ev.type)) {
          //soo we will not trigger the mouse ev
          ev.preventDefault()
          //Gets the first touch point
          ev = ev.changedTouches[0]
          //Calc the right pos according to the touch screen
          pos = {
               x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
               y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
          }
     }
     return pos
}